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
    FormActionRow,
    FormContainer,
    FormInput,
    FormLabelTitle,
    FormRow,
    FormStack,
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
    SectionDescription,
    SectionHeader,
    SectionTitle,
    StickySidebar,
    SurfaceCard,
} from "./SellerHomeComponents";
import {phone} from "../../../utils/formatters";

const {kakao} = window;

const RegistrationPageShell = PageShell;
const ContentGrid = LayoutGrid;
const FormSurface = SurfaceCard;
const PreviewSection = StickySidebar;
const FormGrid = FormStack;
const ModernParagraph = FormRow;
const ModernTitleDiv = FormLabelTitle;
const HintText = FieldHint;
const ModernInput = FormInput;
const ActionRow = FormActionRow;
const SubmitButton = GradientSubmitButton;

const SectionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const FieldColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const AddressSearchInput = styled(ModernInput)`
    cursor: pointer;
`;

const CompanyRegistration = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companyData, setCompanyData] = useState({
        latitude: '',
        longitude: '',
    });

    const watchedCost = Form.useWatch('cost', form) || [];
    const watchedCostInfo = Form.useWatch('costInfo', form) || '';

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
            setCompanyData(coords);
        } catch (e) {
            // keep previous coords
        }
        setIsModalOpen(false);
    };

    return (
        <Container>
            <RegistrationPageShell>
                <HeroCard>
                    <HeroBadge>Seller Studio</HeroBadge>
                    <HeroTitle>업체 등록</HeroTitle>
                    <HeroDescription>
                        지점 정보, 주소, 가격 정책을 한 번에 정리해서 등록할 수 있습니다.
                    </HeroDescription>
                </HeroCard>

                <ContentGrid>
                    <FormSurface>
                        <FormContainer
                            form={form}
                            scrollToFirstError={true}
                            onFinish={(values) => console.log(values)}
                            initialValues={{
                                cost: [{count: '', cost: ''}],
                                costInfo: '',
                            }}
                        >
                            <SectionBlock>
                                <SectionHeader column marginBottom={'8px'}>
                                    <SectionTitle>기본 정보</SectionTitle>
                                    <SectionDescription>
                                        고객이 처음 보게 되는 핵심 정보입니다. 업체명과 주소는 명확하게 입력해 주세요.
                                    </SectionDescription>
                                </SectionHeader>

                                <FormGrid>
                                    <ModernParagraph>
                                        <ModernTitleDiv level={4}><RequiredSpan>*</RequiredSpan>업체명</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'name'}
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '업체명을 입력해주세요.'},
                                                    {validator: validateNoLeadingSpace},
                                                ]}
                                            >
                                                <ModernInput placeholder="브랜드명 또는 업체명을 입력해주세요" />
                                            </ItemDiv>
                                            <HintText>검색성과 신뢰도를 위해 공식 표기명을 사용하는 편이 좋습니다.</HintText>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv level={4}><RequiredSpan>&nbsp;</RequiredSpan>지점</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv name={'branchName'} width={'100%'}>
                                                <ModernInput placeholder="예: 강남점, 성수 플래그십" />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv level={4}><RequiredSpan>*</RequiredSpan>주소</ModernTitleDiv>
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
                                                <ModernInput placeholder="상세주소를 입력해주세요" />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv level={4}><RequiredSpan>*</RequiredSpan>연락처</ModernTitleDiv>
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
                                <SectionHeader column marginBottom={'8px'}>
                                    <SectionTitle>가격 정보</SectionTitle>
                                    <SectionDescription>
                                        이용 인원별 가격을 등록하면 오른쪽 카드에서 바로 확인할 수 있습니다.
                                    </SectionDescription>
                                </SectionHeader>

                                <CostFields />

                                <ActionRow justifyContent={'center'} paddingTop={'8px'}>
                                    <SubmitButton
                                        htmlType={'submit'}
                                        type="primary"
                                        $buttonMinWidth={'150px'}
                                        $buttonHeight={'50px'}
                                        $buttonShadow={'0 14px 28px var(--color-rgba-submit-shadow)'}
                                    >
                                        등록하기
                                    </SubmitButton>
                                </ActionRow>
                            </SectionBlock>
                        </FormContainer>
                    </FormSurface>

                    {isMobile && <Divider style={{margin: 0}} />}

                    <PreviewSection>
                        <GuideCard>
                            <GuideTitle>등록 가이드</GuideTitle>
                            <GuideText lineHeight={'1.7'}>
                                기본 정보와 가격 구성을 먼저 잡아두면 이후 수정 작업이 훨씬 쉬워집니다.
                            </GuideText>
                            <GuideList>
                                <GuideItem><GuideDot />업체명은 검색에 보이는 기준 이름으로 입력</GuideItem>
                                <GuideItem><GuideDot />주소를 선택하면 지도 위치가 함께 반영</GuideItem>
                                <GuideItem><GuideDot />가격 항목은 인원 단위로 나누면 비교가 쉬움</GuideItem>
                            </GuideList>
                        </GuideCard>

                        <MapPreview latitude={companyData.lat} longitude={companyData.lng} />

                        <CostPreview cost={watchedCost} costInfo={watchedCostInfo} />
                    </PreviewSection>
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

export default CompanyRegistration;