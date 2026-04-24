import React, {useState} from 'react';
import {Divider, Form, Modal} from "antd";
import DaumPostcode from 'react-daum-postcode';
import styled from "styled-components";
import {useMediaQuery} from "@mui/material";
import '../../../css/theme-colors.css';
import CostFields from './CostFields';
import CostPreview from './CostPreview';
import MapPreview from './MapPreview';
import {
    Container,
    FieldHint,
    FormInput,
    GradientSubmitButton,
    FormLabelTitle,
    FormStack,
    FormRow,
    FormContainer,
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
    FormTextArea,
    PageShell,
    RequiredSpan,
    SectionHeader,
    SectionDescription,
    StickySidebar,
    SurfaceCard,
    SectionTitle,
} from "./SellerHomeComponents";
import {phone} from "../../../utils/formatters";

const {kakao} = window;

const RegistrationPageShell = PageShell;

const ContentGrid = LayoutGrid;

const FormSurface = SurfaceCard;

const PreviewSection = StickySidebar;

const SectionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const FormGrid = FormStack;

const ModernParagraph = FormRow;

const ModernTitleDiv = FormLabelTitle;

const FieldColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const HintText = FieldHint;

const ModernInput = FormInput;

const AddressSearchInput = styled(ModernInput)`
    cursor: pointer;
`;

const SubmitArea = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 8px;
`;

const SubmitButton = GradientSubmitButton;

const CompanyRegistration = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companyData, setCompanyData] = useState({
        companyName: "",
        branchName: "",
        address: "",
        addressDetail: "",
        latitude: "",
        longitude: "",
        contact: "",
    });

    const watchedCost = Form.useWatch('cost', form) || [];
    const watchedCostInfo = Form.useWatch('costInfo', form) || '';

    const isMobile = useMediaQuery('(max-width:1200px)');
    const geocoder = new kakao.maps.services.Geocoder();

    const getAddressCoords = (address) => {
        return new Promise((resolve, reject) => {
            geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    resolve(coords);
                } else {
                    reject(status);
                }
            });
        });
    };

    const onToggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleComplete = async (data) => {
        const coords = await getAddressCoords(data.roadAddress || data.jibunAddress);
        const lat = coords.getLat();
        const lng = coords.getLng();
        setCompanyData({
            ...companyData,
            address: data.address,
            latitude: lat,
            longitude: lng
        })
        form.setFieldsValue({ address: data.address });
        setIsModalOpen(false);
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
                    <HeroTitle>업체 등록</HeroTitle>
                    <HeroDescription maxWidth={'820px'} fontSize={'15px'}>
                        지점 정보, 주소, 가격 정책을 한 번에 정리해서 등록할 수 있습니다.
                    </HeroDescription>
                </HeroCard>

                <ContentGrid columns={'minmax(0, 1.1fr) 420px'} gridGap={'28px'}>
                    <FormSurface
                        cardRadius={'28px'}
                        cardPadding={'28px'}
                        cardMobilePadding={'20px 16px'}
                        cardMobileRadius={'22px'}
                    >
                        <SectionBlock>
                            <SectionHeader>
                                <div>
                                    <SectionTitle>기본 정보</SectionTitle>
                                    <SectionDescription hintMarginTop={'6px'}>
                                        고객이 처음 보게 되는 핵심 정보입니다. 업체명과 주소는 명확하게 입력해 주세요.
                                    </SectionDescription>
                                </div>
                            </SectionHeader>

                            <FormContainer
                                form={form}
                                scrollToFirstError={true}
                                onFinish={(values) => console.log(values)}
                                initialValues={{
                                    cost: [{count: '', cost: ''}],
                                    costInfo: '',
                                }}
                            >
                                <FormGrid stackGap={'18px'} paddingRight={'24px'}>
                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>업체명</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'name'}
                                                width={'100%'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '업체명을 입력해주세요.'
                                                    },
                                                    {
                                                        validator: (rule, value) => {
                                                            if (!value) {
                                                                return Promise.resolve()
                                                            }

                                                            if (value.startsWith(" ")) {
                                                                return Promise.reject('공백으로 시작할 수 없습니다.')
                                                            } else {
                                                                return Promise.resolve()
                                                            }
                                                        }
                                                    }
                                                ]}
                                            >
                                                <ModernInput placeholder="브랜드명 또는 업체명을 입력해주세요" />
                                            </ItemDiv>
                                            <HintText>검색성과 신뢰도를 위해 공식 표기명을 사용하는 편이 좋습니다.</HintText>
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
                                                    {
                                                        required: true,
                                                        message: '주소를 입력해주세요.'
                                                    },
                                                ]}
                                            >
                                                <AddressSearchInput placeholder="클릭해서 주소를 검색하세요" onClick={onToggleModal} readOnly />
                                            </ItemDiv>
                                            <ItemDiv
                                                name={'addressDetail'}
                                                width={'100%'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '상세주소를 입력해주세요.'
                                                    },
                                                    {
                                                        validator: (rule, value) => {
                                                            if (!value) {
                                                                return Promise.resolve()
                                                            }

                                                            if (value.startsWith(" ")) {
                                                                return Promise.reject('공백으로 시작할 수 없습니다.')
                                                            } else {
                                                                return Promise.resolve()
                                                            }
                                                        }
                                                    }
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
                                                    {
                                                        required: true,
                                                        message: '연락처를 입력해주세요.'
                                                    },
                                                    {
                                                        pattern: /^[0-9]*$/,
                                                        message: '숫자만 입력해주세요.'
                                                    },
                                                    {
                                                        max: 11,
                                                        message: '연락처는 11자리 이하로 입력해주세요.'
                                                    }
                                                ]}
                                            >
                                                <ModernInput placeholder="전화번호 숫자만 입력해주세요" maxLength={13} inputMode="numeric" />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>
                                </FormGrid>
                            <Divider style={{margin: '28px 0'}} />

                            <SectionBlock>
                                <SectionHeader>
                                    <div>
                                        <SectionTitle>가격 정보</SectionTitle>
                                        <SectionDescription>
                                            이용 인원별 가격을 등록하면 오른쪽 카드에서 바로 확인할 수 있습니다.
                                        </SectionDescription>
                                    </div>
                                </SectionHeader>

                                <CostFields />

                                <SubmitArea>
                                    <SubmitButton
                                        htmlType={'submit'}
                                        type="primary"
                                        $buttonMinWidth={'150px'}
                                        $buttonHeight={'50px'}
                                        $buttonShadow={'0 14px 28px var(--color-rgba-submit-shadow)'}
                                    >
                                        등록하기
                                    </SubmitButton>
                                </SubmitArea>
                            </SectionBlock>
                            </FormContainer>
                        </SectionBlock>
                    </FormSurface>

                    {isMobile && <Divider />}

                    <PreviewSection sidebarGap={'20px'}>
                        <GuideCard cardPadding={'18px 18px 16px'}>
                            <GuideTitle>등록 가이드</GuideTitle>
                            <GuideText lineHeight={'1.7'}>
                                기본 정보와 가격 구성을 먼저 잡아두면 이후 수정 작업이 훨씬 쉬워집니다.
                            </GuideText>
                            <GuideList as={'div'} listMargin={'14px 0 0'} listPaddingLeft={'0'} listGap={'10px'}>
                                <GuideItem><GuideDot />업체명은 검색에 보이는 기준 이름으로 입력</GuideItem>
                                <GuideItem><GuideDot />주소를 선택하면 지도 위치가 함께 반영</GuideItem>
                                <GuideItem><GuideDot />가격 항목은 인원 단위로 나누면 비교가 쉬움</GuideItem>
                            </GuideList>
                        </GuideCard>

                        <MapPreview latitude={companyData.latitude} longitude={companyData.longitude} />

                        <CostPreview cost={watchedCost} costInfo={watchedCostInfo} />
                    </PreviewSection>
                </ContentGrid>
            </RegistrationPageShell>

            <Modal title="주소 검색" open={isModalOpen} onOk={onToggleModal} onCancel={onToggleModal} maskClosable={false}
                   width={760} cancelButtonProps={{style: {display: 'none'}}} okButtonProps={{style: {display: 'none'}}}
                   destroyOnClose>
                <DaumPostcode onComplete={handleComplete} style={{height: isMobile ? '460px' : '800px'}}/>
            </Modal>
        </Container>
    );
};

export default CompanyRegistration;