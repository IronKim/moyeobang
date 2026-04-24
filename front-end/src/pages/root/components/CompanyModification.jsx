import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import Swal from 'sweetalert2';
import {Button, Divider, Form, Modal, Typography} from "antd";
import DaumPostcode from 'react-daum-postcode';
import {TbSquareMinusFilled} from "react-icons/tb";
import styled from "styled-components";
import {useMediaQuery} from "@mui/material";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {
    Container,
    FieldHint,
    FormActionRow,
    FormContainer,
    FormInput,
    FormLabelTitle,
    FormRow,
    FormSelect,
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
    InfoCard,
    ItemDiv,
    LayoutGrid,
    PageShell,
    PreviewLabel,
    RequiredSpan,
    SectionDescription,
    SectionHeader,
    SectionTitle,
    StickySidebar,
    SurfaceCard,
} from "./SellerHomeComponents";
import {phone} from "../../../utils/formatters";
import "../../../css/theme-colors.css";
import addressImage from "../../../assets/images/Address.png";

const {kakao} = window;

const RegistrationPageShell = PageShell;

const ContentGrid = LayoutGrid;

const FormSurface = SurfaceCard;

const Sidebar = StickySidebar;

const SideCard = InfoCard;

const FormGrid = FormStack;

const ModernParagraph = FormRow;

const ModernTitleDiv = FormLabelTitle;

const HintText = FieldHint;

const ModernInput = FormInput;

const ModernSelect = FormSelect;

const ModernTextArea = FormTextArea;

const ActionRow = FormActionRow;

const SaveButton = GradientSubmitButton;

const FieldColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SectionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const CostListWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const CostRow = styled(motion.div)`
    width: 100%;
`;

const CostRowInner = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 24px;
    gap: 12px;
    align-items: center;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`;

const RemoveButton = styled(TbSquareMinusFilled)`
    font-size: 18px;
    color: var(--color-gray-550);
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
        color: var(--color-gray-800);
        transform: scale(1.08);
    }

    @media (max-width: 1200px) {
        justify-self: end;
    }
`;

const AddRowButton = styled(Button)`
    height: 46px;
    border-radius: 14px;
    border-style: dashed;
    border-color: var(--color-blue-200);
    color: var(--color-blue-750);
    background: linear-gradient(180deg, var(--color-blue-100) 0%, var(--color-blue-080) 100%);
    font-weight: 700;

    &:hover,
    &:focus {
        border-color: var(--color-blue-450);
        color: var(--color-blue-850);
        background: var(--color-blue-090);
    }
`;

const DeleteButton = styled(Button)`
    && {
        min-width: 112px;
        height: 46px;
        border-radius: 999px;
        font-weight: 700;
        border-color: #ef4444;
        color: #ef4444;
        background: #fff;
    }

    &&:hover,
    &&:focus {
        color: #dc2626 !important;
        border-color: #dc2626 !important;
        background: #fff !important;
    }
`;

const PreviewTitle = styled.h4`
    margin: 0 0 8px;
    color: var(--color-gray-900);
    font-size: 20px;
`;

const PricePreviewCard = styled.div`
    overflow: hidden;
    border-radius: 20px;
    background: linear-gradient(180deg, var(--color-white) 0%, var(--color-blue-100) 100%);
    box-shadow: inset 0 0 0 1px var(--color-rgba-card-border);
`;

const PricePreviewHeader = styled.div`
    padding: 20px 20px 16px;
    border-bottom: 1px solid var(--color-rgba-card-border);
`;

const PricePreviewBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 18px 20px 16px;
    min-height: 110px;
`;

const EmptyPriceText = styled.div`
    color: var(--color-gray-400);
    font-size: 13px;
    line-height: 1.6;
`;

const PricePreviewFooter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 0 20px 18px;
`;

const NoticeLine = styled(Typography.Paragraph)`
    && {
        margin-bottom: 0;
        font-size: 12px;
        line-height: 1.5;
        text-align: right;
        color: var(--color-gray-600);
    }
`;

const MapFrame = styled.div`
    overflow: hidden;
    border-radius: 18px;
    background: var(--color-blue-100);
    box-shadow: inset 0 0 0 1px var(--color-rgba-card-border);
`;

const CompanyModification = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:1200px)');
    const geocoder = new kakao.maps.services.Geocoder();

    const companyData = [
        {
            companyName: "업체명",
            branchName: "지점",
            address: "주소",
            addressDetail: "상세주소",
            latitude: 37.5665,
            longitude: 126.9780,
            contact: "02-1234-5678",
            cost: [
                {
                    count: "2인",
                    cost: "30,000원"
                },
                {
                    count: "3인",
                    cost: "40,000원"
                }
            ],
            costInfo: "ex) 1인은 2인 금액으로 책정됩니다.\n 5인 이상은 별도 문의 바랍니다."
        },
        {
            companyName: "업체명2",
            branchName: "지점2",
            address: "주소2",
            addressDetail: "상세주소2",
            latitude: 37.4979,
            longitude: 127.0276,
            contact: "02-1234-56782",
            cost: [
                {
                    count: "3인",
                    cost: "40,000원"
                }
            ],
            costInfo: "ex) 1인은 2인 금액으로 책정됩니다.\n 5인 이상은 별도 문의 바랍니다."
        },
    ]

    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(0);
    const [mapPosition, setMapPosition] = useState({lat: 37.5665, lng: 126.9780});

    useEffect(() => {
        const selected = companyData[selectedCompanyIndex];
        if (!selected) {
            return;
        }

        form.setFieldsValue({
            companyName: selected.companyName,
            branchName: selected.branchName,
            address: selected.address,
            addressDetail: selected.addressDetail,
            contact: phone.normalize(selected.contact),
            cost: selected.cost.map((row) => ({...row})),
            costInfo: selected.costInfo,
        });

        if (selected.latitude && selected.longitude) {
            setMapPosition({lat: selected.latitude, lng: selected.longitude});
        }
    }, [form, selectedCompanyIndex]);

    const watchedCost = Form.useWatch('cost', form) || [];
    const watchedCostInfo = Form.useWatch('costInfo', form);

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

    const example = "ex) 1인은 2인 금액으로 책정됩니다.\n 5인 이상은 별도 문의 바랍니다."

    const onDelete = () => {
        const selected = companyData[selectedCompanyIndex];
        const label = `${selected?.companyName}${selected?.branchName ? ` ${selected.branchName}` : ''}`;
        Swal.fire({
            icon: 'warning',
            title: '업체 삭제',
            html: `"${label}"을(를) 삭제하시겠습니까?<br>이 작업은 되돌릴 수 없습니다.`,
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            confirmButtonColor: '#ef4444',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('delete company', selected?.companyName);
            }
        });
    };

    return (
        <Container>
            <RegistrationPageShell shellGap={'28px'} shellPadding={'0 4px 32px'}>
                <HeroCard
                    heroPadding={'26px 30px'}
                    heroMobilePadding={'22px 18px'}
                    radialFade={'34%'}
                    gradientMiddle={'50%'}
                >
                    <HeroBadge badgePadding={'8px 12px'}>Seller Studio</HeroBadge>
                    <HeroTitle>업체 수정 및 삭제</HeroTitle>
                    <HeroDescription maxWidth={'820px'} fontSize={'15px'}>
                        기존 등록 업체를 선택해 정보와 가격 정책을 수정하거나 삭제할 수 있습니다.
                    </HeroDescription>
                </HeroCard>

                <ContentGrid columns={'minmax(0, 1.1fr) 420px'} gridGap={'28px'}>
                    <FormSurface
                        cardRadius={'28px'}
                        cardPadding={'28px'}
                        cardMobilePadding={'20px 16px'}
                        cardMobileRadius={'22px'}
                    >
                        <FormContainer
                            form={form}
                            scrollToFirstError={true}
                            onFinish={(values) => console.log('update company', values)}
                            initialValues={{
                                companyName: companyData[0].companyName,
                                branchName: companyData[0].branchName,
                                address: companyData[0].address,
                                addressDetail: companyData[0].addressDetail,
                                contact: phone.normalize(companyData[0].contact),
                                cost: companyData[0].cost,
                                costInfo: companyData[0].costInfo,
                            }}
                        >
                            <SectionBlock>
                                <SectionHeader>
                                    <div>
                                        <SectionTitle>업체 선택 및 기본 정보</SectionTitle>
                                        <SectionDescription>
                                            수정할 업체를 먼저 선택하고, 변경할 항목을 입력해 주세요.
                                        </SectionDescription>
                                    </div>
                                </SectionHeader>

                                <FormGrid stackGap={'18px'} paddingRight={'24px'}>
                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>수정 대상</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv width={'100%'}>
                                                <ModernSelect
                                                    showSearch
                                                    placeholder="업체를 선택해주세요"
                                                    onChange={(value) => setSelectedCompanyIndex(value)}
                                                    optionFilterProp={'label'}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    notFoundContent={'업체가 없습니다.'}
                                                    options={companyData.map((data, index) => ({
                                                        label: `${data.companyName} ${data.branchName}`,
                                                        value: index,
                                                    }))}
                                                    value={selectedCompanyIndex}
                                                    style={{width: '100%'}}
                                                />
                                            </ItemDiv>
                                            <HintText hintMarginTop={'6px'}>선택한 업체의 현재 정보가 아래 입력창에 자동으로 채워집니다.</HintText>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>업체명</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'companyName'}
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '업체명을 입력해주세요.'},
                                                ]}
                                            >
                                                <ModernInput placeholder="브랜드명 또는 업체명을 입력해주세요" />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>&nbsp;</RequiredSpan>지점</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv name={'branchName'} width={'100%'}>
                                                <ModernInput placeholder="예: 강남점, 성수 플래그십" />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>주소</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'address'}
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '주소를 입력해주세요.'},
                                                ]}
                                            >
                                                <ModernInput placeholder="클릭해서 주소를 검색하세요" onClick={showModal} readOnly />
                                            </ItemDiv>
                                            <ItemDiv
                                                name={'addressDetail'}
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '상세주소를 입력해주세요.'},
                                                ]}
                                            >
                                                <ModernInput placeholder="상세주소를 입력해주세요" />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>연락처</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'contact'}
                                                width={'100%'}
                                                getValueFromEvent={(e) => phone.normalize(e?.target?.value || '')}
                                                getValueProps={(value) => ({value: phone.format(value || '')})}
                                                rules={[
                                                    {required: true, message: '연락처를 입력해주세요.'},
                                                    {pattern: /^[0-9]*$/, message: '숫자만 입력해주세요.'},
                                                    {max: 11, message: '연락처는 11자리 이하로 입력해주세요.'},
                                                ]}
                                            >
                                                <ModernInput placeholder="전화번호 숫자만 입력해주세요" maxLength={13} inputMode="numeric" />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>
                                </FormGrid>
                            </SectionBlock>

                            <Divider style={{margin: '28px 0'}} />

                            <SectionBlock>
                                <SectionHeader>
                                    <div>
                                        <SectionTitle>가격 정보</SectionTitle>
                                        <SectionDescription>
                                            이용 인원별 가격과 안내문구를 수정할 수 있습니다.
                                        </SectionDescription>
                                    </div>
                                </SectionHeader>

                                <Form.List name="cost">
                                    {(fields, {add, remove}) => (
                                        <CostListWrap>
                                            <AnimatePresence initial={false}>
                                                {fields.map(({key, name, ...restField}) => (
                                                    <CostRow
                                                        key={key}
                                                        initial={{x: -40, opacity: 0}}
                                                        animate={{x: 0, opacity: 1}}
                                                        exit={{x: 40, opacity: 0}}
                                                        transition={{duration: 0.28, ease: 'easeOut'}}
                                                    >
                                                        <CostRowInner>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'count']}
                                                                style={{margin: 0}}
                                                            >
                                                                <ModernInput placeholder="예: 2인, 3인, 4인" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'cost']}
                                                                style={{margin: 0}}
                                                            >
                                                                <ModernInput placeholder="예: 30,000원" />
                                                            </Form.Item>
                                                            <RemoveButton onClick={() => remove(name)} />
                                                        </CostRowInner>
                                                    </CostRow>
                                                ))}
                                            </AnimatePresence>
                                            <Form.Item style={{margin: 0}}>
                                                <AddRowButton type="dashed" onClick={() => add()} block icon={<div />}>가격 행 추가하기</AddRowButton>
                                            </Form.Item>
                                        </CostListWrap>
                                    )}
                                </Form.List>

                                <ModernParagraph>
                                    <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>&nbsp;</RequiredSpan>안내 사항</ModernTitleDiv>
                                    <FieldColumn>
                                        <ItemDiv name={'costInfo'} width={'100%'}>
                                            <ModernTextArea rows={4} placeholder={example} autoSize={true} />
                                        </ItemDiv>
                                    </FieldColumn>
                                </ModernParagraph>

                                <ActionRow justifyContent={'space-between'} paddingTop={'8px'}>
                                    <DeleteButton type={'default'} onClick={onDelete}>삭제</DeleteButton>
                                    <SaveButton
                                        htmlType={'submit'}
                                        type={'primary'}
                                        $buttonMinWidth={'112px'}
                                        $buttonHeight={'46px'}
                                    >
                                        수정
                                    </SaveButton>
                                </ActionRow>
                            </SectionBlock>
                        </FormContainer>
                    </FormSurface>

                    {isMobile && <Divider style={{margin: 0}} />}

                    <Sidebar sidebarGap={'20px'}>
                        <GuideCard cardPadding={'18px 18px 16px'}>
                            <GuideTitle>수정 가이드</GuideTitle>
                            <GuideText lineHeight={'1.7'}>
                                변경 후에는 실제 고객 노출 정보를 꼭 한 번 더 확인해 주세요.
                            </GuideText>
                            <GuideList as={'div'} listMargin={'14px 0 0'} listPaddingLeft={'0'} listGap={'10px'}>
                                <GuideItem><GuideDot />업체 선택 후 각 필드를 필요한 값으로 수정</GuideItem>
                                <GuideItem><GuideDot />주소 변경 시 도로명/상세주소를 함께 확인</GuideItem>
                                <GuideItem><GuideDot />가격 항목은 인원 단위로 명확히 구분</GuideItem>
                            </GuideList>
                        </GuideCard>

                        <SideCard cardRadius={'24px'} cardPadding={'20px'} cardShadow={'0 16px 32px var(--color-rgba-card-shadow)'}>
                            <PreviewLabel>Live Preview</PreviewLabel>
                            <PreviewTitle>지도</PreviewTitle>
                            <MapFrame>
                                {mapPosition?.lat && mapPosition?.lng ? (
                                    <Map
                                        center={{lat: mapPosition.lat, lng: mapPosition.lng}}
                                        style={{
                                            width: '100%',
                                            height: '360px',
                                        }}
                                        draggable={false}
                                    >
                                        <MapMarker position={{lat: mapPosition.lat, lng: mapPosition.lng}} />
                                    </Map>
                                ) : (
                                    <img
                                        src={addressImage}
                                        alt="address"
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            height: '360px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                )}
                            </MapFrame>
                        </SideCard>

                        <SideCard cardRadius={'24px'} cardPadding={'20px'} cardShadow={'0 16px 32px var(--color-rgba-card-shadow)'}>
                            <PreviewLabel>Live Preview</PreviewLabel>
                            <PreviewTitle>이용료 안내</PreviewTitle>
                            <PricePreviewCard>
                                <PricePreviewHeader>
                                    <Typography.Title style={{margin: 0, textAlign: 'center'}} level={3}>이용료</Typography.Title>
                                </PricePreviewHeader>
                                <PricePreviewBody>
                                    <AnimatePresence initial={false} mode="popLayout">
                                        {
                                            watchedCost.some((cost) => cost?.count || cost?.cost) ? (
                                                watchedCost.map((cost, index) => (
                                                    <motion.div
                                                        key={index}
                                                        layout
                                                        initial={{x: -24, opacity: 0}}
                                                        animate={{x: 0, opacity: 1}}
                                                        exit={{x: 24, opacity: 0}}
                                                        transition={{duration: 0.24, ease: 'easeOut'}}
                                                    >
                                                        <Typography.Paragraph style={{fontSize: '16px', marginBottom: 0, textAlign: 'center'}}>
                                                            {cost?.count} {cost?.cost}
                                                        </Typography.Paragraph>
                                                    </motion.div>
                                                ))
                                            ) : (
                                                <EmptyPriceText>가격을 입력하면 이 영역에 즉시 반영됩니다.</EmptyPriceText>
                                            )
                                        }
                                    </AnimatePresence>
                                </PricePreviewBody>
                                <PricePreviewFooter>
                                    {(watchedCostInfo || example).split('\n').map((line, index) => (
                                        <NoticeLine key={index}>{line}</NoticeLine>
                                    ))}
                                </PricePreviewFooter>
                            </PricePreviewCard>
                        </SideCard>
                    </Sidebar>
                </ContentGrid>
            </RegistrationPageShell>

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

export default CompanyModification;