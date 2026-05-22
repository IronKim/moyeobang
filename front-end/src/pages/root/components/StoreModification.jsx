import React, {useEffect, useMemo, useState} from 'react';
import Swal from 'sweetalert2';
import {Divider, Form, Modal} from "antd";
import DaumPostcode from 'react-daum-postcode';
import {useMediaQuery} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useRecoilState} from "recoil";
import '../../../css/theme-colors.css';
import MapPreview from './MapPreview';
import {
    AddressSearchInput,
    ContactActionButton,
    ContactListWrap,
    ContactRow,
    Container,
    DeleteButton,
    FieldColumn,
    FieldHint,
    FormActionRow,
    FormContainer,
    FormInput,
    FormLabelTitle,
    FormRow,
    FormStack,
    FormTextArea,
    GradientSubmitButton,
    GuideCard,
    GuideDot,
    GuideItem,
    GuideList,
    GuideText,
    GuideTitle,
    HeroBadge,
    HeroCard,
    HeroDescription,
    HeroTitle,
    ItemDiv,
    LayoutGrid,
    PageShell,
    RequiredSpan,
    SectionBlock,
    SectionDescription,
    SectionHeader,
    SectionTitle,
    StickySidebar,
    SurfaceCard,
} from "./OwnerHomeComponents";
import {business, koreaPhone} from "../../../utils/formatters";
import {selectedStoreState} from "../../../atoms/selectedStoreState";
import {useMyStores} from "../../../hooks/useMyStores";
import {deleteStore, getStoreDetail, updateStore} from "../../../api/StoreApiService";
import ProgressToast from "../../../components/ProgressToast";

const {kakao} = window;
const STORE_DELETE_API_ENABLED = false;

const StoreModification = () => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:1200px)');
    const geocoder = new kakao.maps.services.Geocoder();
    const [selectedStoreId, setSelectedStoreId] = useRecoilState(selectedStoreState);
    const [mapPosition, setMapPosition] = useState({lat: null, lng: null});
    const {data: myStores = [], isLoading: isMyStoresLoading} = useMyStores();

    const selectedStoreName = useMemo(() => {
        const store = myStores.find((item) => item.storeId === selectedStoreId);
        return `${store?.businessName || ''}${store?.branchName ? ` ${store.branchName}` : ''}`.trim();
    }, [myStores, selectedStoreId]);

    const {data: selectedStoreDetail, isLoading: isStoreDetailLoading, refetch: refetchStoreDetail} = useQuery(
        ['storeDetail', selectedStoreId],
        async () => {
            const response = await getStoreDetail(selectedStoreId);
            return response?.data?.result;
        },
        {
            enabled: !!selectedStoreId,
            retry: false,
        }
    );

    const updateStoreMutation = useMutation(
        async (payload) => {
            return updateStore(selectedStoreId, payload);
        }
    );

    const deleteStoreMutation = useMutation(
        async () => {
            return deleteStore(selectedStoreId);
        }
    );

    useEffect(() => {
        if (!myStores.length) {
            return;
        }

        const hasSelectedStore = myStores.some((store) => store.storeId === selectedStoreId);
        if (!hasSelectedStore) {
            setSelectedStoreId(myStores[0].storeId);
        }
    }, [myStores, selectedStoreId, setSelectedStoreId]);

    useEffect(() => {
        if (!selectedStoreDetail) {
            return;
        }

        const mappedContacts = (selectedStoreDetail.storeNumberList || []).map((item) => ({
            id: item?.id,
            value: koreaPhone.normalize(item?.storeNumber || ''),
        }));

        form.setFieldsValue({
            name: selectedStoreDetail.businessName,
            branchName: selectedStoreDetail.branchName,
            businessNumber: selectedStoreDetail.businessNumber,
            address: selectedStoreDetail.address,
            addressDetail: selectedStoreDetail.addressDetail,
            contacts: mappedContacts.length ? mappedContacts : [{value: ''}],
            description: selectedStoreDetail.storeDescription || '',
        });

        if (selectedStoreDetail.latitude && selectedStoreDetail.longitude) {
            setMapPosition({
                lat: Number(selectedStoreDetail.latitude),
                lng: Number(selectedStoreDetail.longitude),
            });
        }
    }, [form, selectedStoreDetail]);

    const validateNoLeadingSpace = (_, value) => {
        if (!value || !value.startsWith(' ')) return Promise.resolve();
        return Promise.reject('공백으로 시작할 수 없습니다.');
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const getAddressCoords = (address) => {
        return new Promise((resolve, reject) => {
            geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    resolve({lat: Number(result[0].y), lng: Number(result[0].x)});
                } else {
                    reject(status);
                }
            });
        });
    };

    const handleComplete = async (data) => {
        form.setFieldsValue({
            address: data.address,
        });

        try {
            const coords = await getAddressCoords(data.roadAddress || data.jibunAddress || data.address);
            setMapPosition(coords);
        } catch (e) {
            // Keep previous map position when geocoding fails.
        }

        setIsModalOpen(false);
    };

    const onDelete = async () => {
        if (!selectedStoreId) {
            await Swal.fire({
                icon: 'warning',
                title: '선택된 업체 없음',
                text: '삭제할 업체를 먼저 선택해 주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        const label = selectedStoreName || '선택된 업체';

        if (!STORE_DELETE_API_ENABLED) {
            await Swal.fire({
                icon: 'warning',
                title: '업체 삭제',
                html: `"${label}" 삭제는 현재 서버 API가 제공되지 않아 앱에서 처리할 수 없습니다.<br>관리자에게 삭제 기능 추가를 요청해 주세요.`,
                confirmButtonText: '확인',
                confirmButtonColor: '#ef4444',
            });
            return;
        }

        const result = await Swal.fire({
            icon: 'warning',
            title: '업체 삭제',
            html: `"${label}"을(를) 삭제하시겠습니까?<br>이 작업은 되돌릴 수 없습니다.`,
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            confirmButtonColor: '#ef4444'
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await deleteStoreMutation.mutateAsync();
            await queryClient.invalidateQueries(['myStores']);
            await queryClient.invalidateQueries(['storeDetail']);

            await Swal.fire({
                icon: 'success',
                title: '업체 삭제 완료',
                text: '업체가 삭제되었습니다.',
                confirmButtonText: '확인',
            });
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: '업체 삭제 실패',
                text: error?.response?.data?.result?.message || '잠시 후 다시 시도해주세요.',
                confirmButtonText: '확인',
            });
        }
    };

    const handleSubmit = async (values) => {
        if (!selectedStoreId) {
            await Swal.fire({
                icon: 'warning',
                title: '선택된 업체 없음',
                text: '수정할 업체를 먼저 선택해 주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        if (!mapPosition.lat || !mapPosition.lng) {
            await Swal.fire({
                icon: 'warning',
                title: '주소 확인 필요',
                text: '주소를 다시 선택해 주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        const label = selectedStoreName || '선택된 업체';

        const result = await Swal.fire({
            icon: 'question',
            title: '업체 정보를 수정할까요?',
            html: `"${label}"의 정보를 입력한 내용으로 수정합니다.`,
            showCancelButton: true,
            confirmButtonText: '수정',
            cancelButtonText: '취소'
        });

        if (!result.isConfirmed) {
            return;
        }

        const payload = {
            businessName: values.name,
            branchName: values.branchName,
            address: values.address,
            addressDetail: values.addressDetail,
            description: values.description,
            storeNumberList: (values.contacts || []).map((item) => ({
                ...(item?.id && {id: item.id}),
                storeNumber: item?.value || '',
            })),
            latitude: mapPosition?.lat,
            longitude: mapPosition?.lng,
        };

        try {
            await updateStoreMutation.mutateAsync(payload);
            await queryClient.invalidateQueries(['myStores']);
            const refreshed = await refetchStoreDetail();
            const refreshedStoreDetail = refreshed?.data;

            if (refreshedStoreDetail) {
                const refreshedContacts = (refreshedStoreDetail.storeNumberList || []).map((item) => ({
                    id: item?.id,
                    value: koreaPhone.normalize(item?.storeNumber || ''),
                }));

                form.setFieldsValue({
                    name: refreshedStoreDetail.businessName,
                    branchName: refreshedStoreDetail.branchName,
                    businessNumber: refreshedStoreDetail.businessNumber,
                    address: refreshedStoreDetail.address,
                    addressDetail: refreshedStoreDetail.addressDetail,
                    contacts: refreshedContacts.length ? refreshedContacts : [{value: ''}],
                    description: refreshedStoreDetail.storeDescription || '',
                });
            }

            await Swal.fire({
                icon: 'success',
                title: '업체 수정 완료',
                text: '변경사항이 저장되었습니다.',
                confirmButtonText: '확인',
            });
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: '업체 수정 실패',
                text: error?.response?.data?.result?.message || '잠시 후 다시 시도해주세요.',
                confirmButtonText: '확인',
            });
        }
    };

    return (
        <Container>
            <ProgressToast
                open={updateStoreMutation.isLoading || deleteStoreMutation.isLoading}
                text={deleteStoreMutation.isLoading ? '업체 삭제 처리 중입니다...' : '업체 수정 처리 중입니다...'}
            />
            <PageShell>
                <HeroCard>
                    <HeroBadge>Seller Studio</HeroBadge>
                    <HeroTitle>업체 수정 및 삭제</HeroTitle>
                    <HeroDescription>
                        {selectedStoreName
                            ? `현재 선택된 업체(${selectedStoreName}) 정보를 등록 화면과 동일한 항목으로 수정합니다.`
                            : '현재 선택된 업체 정보를 등록 화면과 동일한 항목으로 수정합니다.'}
                    </HeroDescription>
                </HeroCard>

                <LayoutGrid>
                    <SurfaceCard>
                        <FormContainer
                            form={form}
                            scrollToFirstError={true}
                            onFinish={handleSubmit}
                            initialValues={{
                                name: '',
                                branchName: '',
                                businessNumber: '',
                                address: '',
                                addressDetail: '',
                                contacts: [{value: ''}],
                                description: '',
                            }}
                        >
                            <SectionBlock>
                                <SectionHeader column marginBottom={'8px'}>
                                    <SectionTitle>기본 정보</SectionTitle>
                                    <SectionDescription>
                                        현재 선택된 업체 정보를 수정합니다. 수정 대상 선택은 자동 처리됩니다.
                                    </SectionDescription>
                                </SectionHeader>

                                <FormStack>
                                    <FormRow>
                                        <FormLabelTitle level={4}><RequiredSpan>*</RequiredSpan>업체명</FormLabelTitle>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'name'}
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '업체명을 입력해주세요.'},
                                                    {validator: validateNoLeadingSpace},
                                                ]}
                                            >
                                                <FormInput placeholder="브랜드명 또는 업체명을 입력해주세요" />
                                            </ItemDiv>
                                            <FieldHint>검색성과 신뢰도를 위해 공식 표기명을 사용하는 편이 좋습니다.</FieldHint>
                                        </FieldColumn>
                                    </FormRow>

                                    <FormRow>
                                        <FormLabelTitle level={4}><RequiredSpan>&nbsp;</RequiredSpan>지점</FormLabelTitle>
                                        <FieldColumn>
                                            <ItemDiv name={'branchName'} width={'100%'}>
                                                <FormInput placeholder="예: 강남점, 성수 플래그십" />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </FormRow>

                                    <FormRow>
                                        <FormLabelTitle level={4}><RequiredSpan>*</RequiredSpan>사업자번호</FormLabelTitle>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'businessNumber'}
                                                width={'100%'}
                                                getValueFromEvent={(e) => business.normalize(e?.target?.value || '')}
                                                getValueProps={(value) => ({value: business.format(value || '')})}
                                                rules={[
                                                    {required: true, message: '사업자번호를 입력해주세요.'},
                                                    {pattern: /^[0-9]{10}$/, message: '사업자번호 10자리를 입력해주세요.'},
                                                ]}
                                            >
                                                <FormInput placeholder="숫자만 입력해주세요" maxLength={12} inputMode="numeric" disabled />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </FormRow>

                                    <FormRow>
                                        <FormLabelTitle level={4}><RequiredSpan>*</RequiredSpan>주소</FormLabelTitle>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'address'}
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '주소를 입력해주세요.'},
                                                ]}
                                            >
                                                <AddressSearchInput placeholder="클릭해서 주소를 검색하세요" onClick={showModal} readOnly />
                                            </ItemDiv>
                                            <ItemDiv
                                                name={'addressDetail'}
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '상세주소를 입력해주세요.'},
                                                    {validator: validateNoLeadingSpace},
                                                ]}
                                            >
                                                <FormInput placeholder="상세주소를 입력해주세요" />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </FormRow>

                                    <FormRow>
                                        <FormLabelTitle level={4}><RequiredSpan>*</RequiredSpan>연락처</FormLabelTitle>
                                        <FieldColumn>
                                            <Form.List
                                                name={'contacts'}
                                                rules={[
                                                    {
                                                        validator: async (_, value) => {
                                                            if (!value || value.length === 0) {
                                                                throw new Error('연락처를 1개 이상 입력해주세요.');
                                                            }
                                                        },
                                                    },
                                                ]}
                                            >
                                                {(fields, { add, remove }, { errors }) => (
                                                    <ContactListWrap>
                                                        {fields.map((field) => (
                                                            <ContactRow key={field.key}>
                                                                <ItemDiv
                                                                    name={[field.name, 'value']}
                                                                    width={'100%'}
                                                                    getValueFromEvent={(e) => koreaPhone.normalize(e?.target?.value || '')}
                                                                    getValueProps={(value) => ({value: koreaPhone.format(value || '')})}
                                                                    rules={[
                                                                        {required: true, message: '연락처를 입력해주세요.'},
                                                                        {
                                                                            validator: (_, value) => {
                                                                                if (!value || koreaPhone.isValid(value)) {
                                                                                    return Promise.resolve();
                                                                                }
                                                                                return Promise.reject('올바른 전화번호를 입력해주세요.');
                                                                            },
                                                                        },
                                                                    ]}
                                                                >
                                                                    <FormInput placeholder="전화번호 숫자만 입력해주세요" maxLength={13} inputMode="numeric" />
                                                                </ItemDiv>

                                                                <ContactActionButton
                                                                    type={'default'}
                                                                    onClick={() => remove(field.name)}
                                                                    disabled={fields.length === 1}
                                                                >
                                                                    삭제
                                                                </ContactActionButton>
                                                            </ContactRow>
                                                        ))}

                                                        <ContactActionButton
                                                            type={'dashed'}
                                                            onClick={() => add({value: ''})}
                                                        >
                                                            연락처 추가
                                                        </ContactActionButton>

                                                        <Form.ErrorList errors={errors} />
                                                    </ContactListWrap>
                                                )}
                                            </Form.List>
                                        </FieldColumn>
                                    </FormRow>

                                    <FormRow>
                                        <FormLabelTitle level={4}><RequiredSpan>&nbsp;</RequiredSpan>업체 소개</FormLabelTitle>
                                        <FieldColumn>
                                            <ItemDiv name={'description'} width={'100%'}>
                                                <FormTextArea
                                                    placeholder="고객에게 보여줄 업체 소개를 입력해주세요"
                                                    rows={4}
                                                    maxLength={500}
                                                    showCount
                                                />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </FormRow>

                                </FormStack>

                                <FormActionRow justifyContent={'space-between'} paddingTop={'8px'}>
                                    <DeleteButton type={'default'} onClick={onDelete}>삭제</DeleteButton>
                                    <GradientSubmitButton
                                        htmlType={'submit'}
                                        type={'primary'}
                                        disabled={
                                            isMyStoresLoading
                                            || isStoreDetailLoading
                                            || updateStoreMutation.isLoading
                                            || deleteStoreMutation.isLoading
                                            || !selectedStoreId
                                        }
                                        $buttonMinWidth={'112px'}
                                        $buttonHeight={'46px'}
                                    >
                                        {updateStoreMutation.isLoading ? '수정 중...' : '수정'}
                                    </GradientSubmitButton>
                                </FormActionRow>
                            </SectionBlock>
                        </FormContainer>
                    </SurfaceCard>

                    {isMobile && <Divider style={{margin: 0}} />}

                    <StickySidebar>
                        <GuideCard>
                            <GuideTitle>수정 가이드</GuideTitle>
                            <GuideText lineHeight={'1.7'}>
                                변경 후에는 실제 고객 노출 정보를 꼭 한 번 더 확인해 주세요.
                            </GuideText>
                            <GuideList>
                                <GuideItem><GuideDot />선택된 업체가 자동 로드되며 정보 항목만 수정</GuideItem>
                                <GuideItem><GuideDot />주소 변경 시 도로명/상세주소를 함께 확인</GuideItem>
                                <GuideItem><GuideDot />사업자번호와 연락처 형식을 올바르게 입력</GuideItem>
                            </GuideList>
                        </GuideCard>

                        <MapPreview latitude={mapPosition?.lat} longitude={mapPosition?.lng} />
                    </StickySidebar>
                </LayoutGrid>
            </PageShell>

            <Modal
                title="주소 검색"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
                width={760}
                cancelButtonProps={{style: {display: 'none'}}}
                okButtonProps={{style: {display: 'none'}}}
                destroyOnClose
            >
                <DaumPostcode onComplete={handleComplete} style={{height: isMobile ? '460px' : '800px'}} />
            </Modal>
        </Container>
    );
};

export default StoreModification;