import React, {useState} from 'react';
import {Divider, Form, Modal} from "antd";
import DaumPostcode from 'react-daum-postcode';
import {useMediaQuery} from "@mui/material";
import {useMutation, useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import Swal from "sweetalert2";
import '../../../css/theme-colors.css';
import MapPreview from './MapPreview';
import {
    AddressSearchInput,
    ContactActionButton,
    ContactListWrap,
    ContactRow,
    Container,
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
import {registerStore} from "../../../api/StoreApiService";
import {useSetupUserDataByToken} from "../../../hooks/useUser";
import {ROLETYPE} from "../../../constants/ROLETYPE";
import ProgressToast from "../../../components/ProgressToast";
import {selectedStoreState} from "../../../atoms/selectedStoreState";

const {kakao} = window;

const StoreRegistration = () => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const setSelectedStoreId = useSetRecoilState(selectedStoreState);
    const setupUserDataByToken = useSetupUserDataByToken();
    const [storeData, setStoreData] = useState({
        lat: null,
        lng: null,
    });
    const registerStoreMutation = useMutation(
        async (payload) => {
            const response = await registerStore(payload);
            return response;
        }
    );

    const isMobile = useMediaQuery('(max-width:1200px)');
    const geocoder = new kakao.maps.services.Geocoder();

    const validateNoLeadingSpace = (_, value) => {
        if (!value || !value.startsWith(' ')) return Promise.resolve();
        return Promise.reject('공백으로 시작할 수 없습니다.');
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
        form.setFieldsValue({address: data.address});
        try {
            const coords = await getAddressCoords(data.roadAddress || data.jibunAddress || data.address);
            setStoreData(coords);
        } catch (e) {
            // keep previous coords
        }
        setIsModalOpen(false);
    };

    const handleSubmit = async (values) => {
        if (!storeData.lat || !storeData.lng) {
            await Swal.fire({
                icon: 'warning',
                title: '주소 확인 필요',
                text: '주소를 다시 선택해 주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        const payload = {
            businessName: values.name,
            branchName: values.branchName,
            businessNumber: values.businessNumber,
            address: values.address,
            addressDetail: values.addressDetail,
            description: values.description,
            storeNumberList: (values.contacts || []).map((item) => ({ storeNumber: item?.value || '' })),
            latitude: storeData.lat,
            longitude: storeData.lng,
        };

        const confirmResult = await Swal.fire({
            icon: 'question',
            title: '업체를 등록할까요?',
            text: '입력한 정보로 업체를 등록하고 해당 업체 화면으로 이동합니다.',
            showCancelButton: true,
            confirmButtonText: '등록',
            cancelButtonText: '취소',
        });

        if (!confirmResult.isConfirmed) {
            return;
        }

        try {
            const response = await registerStoreMutation.mutateAsync(payload);
            const issuedToken = response?.data?.result?.token;
            const registeredStoreId = response?.data?.result?.storeId;

            if (issuedToken) {
                localStorage.setItem('moyeobangToken', issuedToken);
            }

            if (registeredStoreId) {
                setSelectedStoreId(registeredStoreId);
            }

            await queryClient.invalidateQueries(['myStores']);

            localStorage.setItem('moyeobangPreferredRoleType', ROLETYPE.OWNER);
            setupUserDataByToken();

            await Swal.fire({
                icon: 'success',
                title: '업체 등록 완료',
                text: '업체가 정상적으로 등록되었습니다.',
                confirmButtonText: '확인',
            });

            form.resetFields();
            form.setFieldsValue({ contacts: [{ value: '' }], description: '', businessNumber: '' });
            setStoreData({ lat: null, lng: null });
            navigate('/');
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: '업체 등록 실패',
                text: error?.response?.data?.result?.message || '잠시 후 다시 시도해주세요.',
                confirmButtonText: '확인',
            });
        }
    };

    return (
        <Container>
            <ProgressToast open={registerStoreMutation.isLoading} text={'업체 등록 처리 중입니다...'} />
            <PageShell>
                <HeroCard>
                    <HeroBadge>Seller Studio</HeroBadge>
                    <HeroTitle>업체 등록</HeroTitle>
                    <HeroDescription>
                        지점 정보와 주소를 입력해 업체 기본 정보를 등록할 수 있습니다.
                    </HeroDescription>
                </HeroCard>

                <LayoutGrid>
                    <SurfaceCard>
                        <FormContainer
                            form={form}
                            scrollToFirstError={true}
                            onFinish={handleSubmit}
                            initialValues={{
                                businessNumber: '',
                                contacts: [{value: ''}],
                                description: '',
                            }}
                        >
                            <SectionBlock>
                                <SectionHeader column marginBottom={'8px'}>
                                    <SectionTitle>기본 정보</SectionTitle>
                                    <SectionDescription>
                                        고객이 처음 보게 되는 핵심 정보입니다. 업체명과 주소는 명확하게 입력해 주세요.
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
                                                <FormInput placeholder="숫자만 입력해주세요" maxLength={12} inputMode="numeric" />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </FormRow>

                                    <FormRow>
                                        <FormLabelTitle level={4}><RequiredSpan>*</RequiredSpan>주소</FormLabelTitle>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'address'}
                                                width={'100%'}
                                                rules={[{required: true, message: '주소를 입력해주세요.'}]}
                                            >
                                                <AddressSearchInput placeholder="클릭해서 주소를 검색하세요" onClick={() => setIsModalOpen(true)} readOnly />
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
                                                            onClick={() => add({ value: '' })}
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

                                    <FormActionRow justifyContent={'center'} paddingTop={'8px'}>
                                        <GradientSubmitButton
                                            htmlType={'submit'}
                                            type="primary"
                                            disabled={registerStoreMutation.isLoading}
                                            $buttonMinWidth={'150px'}
                                            $buttonHeight={'50px'}
                                            $buttonShadow={'0 14px 28px var(--color-rgba-submit-shadow)'}
                                        >
                                            {registerStoreMutation.isLoading ? '업체 등록 중...' : '등록하기'}
                                        </GradientSubmitButton>
                                    </FormActionRow>
                                </FormStack>
                            </SectionBlock>
                        </FormContainer>
                    </SurfaceCard>

                    {isMobile && <Divider style={{margin: 0}} />}

                    <StickySidebar>
                        <GuideCard>
                            <GuideTitle>등록 가이드</GuideTitle>
                            <GuideText lineHeight={'1.7'}>
                                기본 정보를 정확히 등록해두면 이후 수정 작업이 훨씬 쉬워집니다.
                            </GuideText>
                            <GuideList>
                                <GuideItem><GuideDot />업체명은 검색에 보이는 기준 이름으로 입력</GuideItem>
                                <GuideItem><GuideDot />주소를 선택하면 지도 위치가 함께 반영</GuideItem>
                                <GuideItem><GuideDot />지점/연락처까지 함께 입력하면 운영 관리가 수월</GuideItem>
                            </GuideList>
                        </GuideCard>

                        <MapPreview latitude={storeData.lat} longitude={storeData.lng} />
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

export default StoreRegistration;