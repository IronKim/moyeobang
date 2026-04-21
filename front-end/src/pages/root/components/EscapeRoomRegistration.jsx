import React, {useState} from 'react';
import {Divider} from "antd";
import {useMediaQuery} from "@mui/material";
import {
    Container,
    FieldHint,
    FormActionRow,
    GradientSubmitButton,
    FormLabelTitle,
    FormInput,
    FormSelect,
    FormStack,
    FormRow,
    FormContainer,
    GuideCard,
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
    FormTextArea,
    PageShell,
    PreviewLabel,
    RateDiv,
    RequiredSpan,
    SectionHeader,
    SectionDescription,
    SectionTitle,
    StickySidebar,
    SurfaceCard,
} from "./SellerHomeComponents";
import {TbGhost2Filled, TbMoodHappyFilled} from "react-icons/tb";
import {GoHeartFill} from "react-icons/go";
import {FaRunning} from "react-icons/fa";
import {PiMaskHappyFill} from "react-icons/pi";
import {RiKnifeBloodFill, RiMagicFill, RiPhoneFindFill} from "react-icons/ri";
import {GiCrimeSceneTape, GiFootprint, GiWaterDrop} from "react-icons/gi";
import {FaRedhat, FaSquarePlus} from "react-icons/fa6";
import {SiMicrogenetics} from "react-icons/si";
import PosterImage from "./PosterImage";
import RangeSelector from "./RangeSelector";
import MinuteSelector from "./MinuteSelector";
import TagSelector from "./TagSelector";
import styled from "styled-components";
import "../../../css/theme-colors.css";

const RegistrationPageShell = PageShell;

const ContentGrid = LayoutGrid;

const FormSurface = SurfaceCard;

const Sidebar = StickySidebar;

const SideCard = InfoCard;

const FormGrid = FormStack;

const ModernParagraph = FormRow;

const ModernTitleDiv = FormLabelTitle;

const FieldColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const HintText = FieldHint;

const ModernInput = FormInput;

const ModernSelect = FormSelect;

const ModernTextArea = FormTextArea;

const ActionRow = FormActionRow;

const ModernSubmitButton = GradientSubmitButton;

const PreviewTitle = styled.h4`
    margin: 0 0 8px;
    color: var(--color-gray-900);
    font-size: 20px;
`;

const PreviewText = styled.p`
    margin: 0;
    color: var(--color-gray-600);
    line-height: 1.6;
    font-size: 13px;
`;

const PreviewCostList = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const PreviewCostRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: 8px 10px;
    background: var(--color-blue-060);
    color: var(--color-gray-900);
    font-size: 13px;
`;

const EscapeRoomRegistration = () => {
    const isMobile = useMediaQuery('(max-width:1200px)');
    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);

    const companyData = [
        {
            companyName: "업체명",
            branchName: "지점",
            address: "주소",
            addressDetail: "상세주소",
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

    const selectedCompany = selectedCompanyIndex !== null ? companyData[selectedCompanyIndex] : null;
    const isDisabled = selectedCompanyIndex === null;

    const genres = [
        { icon: <TbGhost2Filled />, label: '공포' },
        { icon: <GoHeartFill />, label: '로맨스' },
        { icon: <FaRunning />, label: '액션' },
        { icon: <TbMoodHappyFilled />, label: '코미디' },
        { icon: <PiMaskHappyFill />, label: '드라마' },
        { icon: <RiMagicFill />, label: '판타지' },
        { icon: <RiKnifeBloodFill />, label: '스릴러' },
        { icon: <RiPhoneFindFill />, label: '미스터리' },
        { icon: <GiCrimeSceneTape />, label: '범죄' },
        { icon: <FaRedhat />, label: '모험' },
        { icon: <SiMicrogenetics />, label: 'SF' },
        { icon: <FaSquarePlus />, label: '기타' },
    ];

    const validateNoLeadingSpace = (value) => {
        if (!value) {
            return Promise.resolve();
        }

        if (value.startsWith(" ")) {
            return Promise.reject('공백으로 시작할 수 없습니다.');
        }

        return Promise.resolve();
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
                    <HeroTitle>방탈출 테마 등록</HeroTitle>
                    <HeroDescription maxWidth={'820px'} fontSize={'15px'}>
                        테마 정보, 장르, 난이도와 플레이 조건을 한 번에 정리해 등록하세요.
                    </HeroDescription>
                </HeroCard>

                <ContentGrid columns={'minmax(0, 1.1fr) 420px'} gridGap={'28px'}>
                    <FormSurface
                        cardRadius={'28px'}
                        cardPadding={'28px'}
                        cardMobilePadding={'20px 16px'}
                        cardMobileRadius={'22px'}
                    >
                        <SectionHeader column marginBottom={'8px'}>
                            <SectionTitle>테마 기본 정보</SectionTitle>
                            <SectionDescription>
                                고객이 리스트에서 가장 먼저 보는 정보입니다. 이름, 소개, 이미지와 장르를 정확히 입력해 주세요.
                            </SectionDescription>
                        </SectionHeader>

                        <FormContainer
                            marginLeft={'0'}
                initialValues={{
                    company: undefined,
                    themename: '',
                    themeimage: '',
                    themeintro: '',
                    genre: [],
                    people: [],
                    difficulty: 0,
                    horror: 0,
                    activity: 0,
                    time: 60
                }}
                scrollToFirstError={true}
                onFinish={(values) => console.log(values)}
            >
                                <FormGrid stackGap={'18px'} paddingRight={'24px'}>
                <ModernParagraph>
                            <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>업체 선택</ModernTitleDiv>
                    <FieldColumn>
                    <ItemDiv name={'company'} placeholder="업체를 선택해주세요" width={'100%'}
                        rules={[{required: true, message: '업체를 선택해주세요.'}]}
                    >
                        <ModernSelect placeholder="업체를 선택해주세요"
                                onChange={(value) => setSelectedCompanyIndex(value)}
                                options={companyData.map((data, index) => ({
                                    label: `${data.companyName}-${data.branchName}`,
                                    value: index
                                }))}
                                value={selectedCompanyIndex}
                                style={{width: '100%'}}
                        />
                    </ItemDiv>
                        <HintText hintMarginTop={'6px'}>등록할 지점을 먼저 선택해야 나머지 입력이 활성화됩니다.</HintText>
                    </FieldColumn>
                </ModernParagraph>
                <ModernParagraph>
                    <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>테마 이름</ModernTitleDiv>
                    <FieldColumn>
                    <ItemDiv
                        name={'themename'}
                        rules={[
                            {
                                required: true,
                                message: '이름을 입력해주세요.',
                            },
                            {
                                validator: (rule, value) => {
                                    return validateNoLeadingSpace(value);
                                }
                            }
                        ]}
                        width={'100%'}>
                        <ModernInput placeholder="테마 이름을 입력해주세요"
                               disabled={isDisabled} />
                    </ItemDiv>
                    </FieldColumn>
                </ModernParagraph>
                <ModernParagraph>
                    <ModernTitleDiv labelWidth={'130px'} level={4}><RequiredSpan>*</RequiredSpan>테마 이미지</ModernTitleDiv>
                    <FieldColumn>
                    <ItemDiv
                        name={'themeimage'}
                        rules={[
                            {
                                required: true,
                                message: '이미지를 등록해주세요.',
                            }
                        ]}
                        width={'150px'}>
                        <PosterImage disabled={isDisabled} />
                    </ItemDiv>
                    </FieldColumn>
                </ModernParagraph>
                <ModernParagraph>
                    <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>테마 소개</ModernTitleDiv>
                    <FieldColumn>
                    <ItemDiv
                        name={'themeintro'}
                        rules={[
                            {
                                required: true,
                                message: '소개를 입력해주세요.',
                            }
                        ]}
                        width={'100%'}>
                        <ModernTextArea
                            count={{
                                show: true,
                                max: 500,
                            }}
                            maxLength={500}
                            rows={6} placeholder="스토리..." style={{ resize: 'none' }}
                            disabled={isDisabled}
                        />
                    </ItemDiv>
                    </FieldColumn>
                </ModernParagraph>
                <ModernParagraph>
                    <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>장르</ModernTitleDiv>
                    <FieldColumn>
                    <ItemDiv
                        name={'genre'}
                        rules={[
                            {
                                required: true,
                                message: '장르를 선택해주세요.',
                            }
                        ]}
                        width={'100%'}>
                        <TagSelector
                            help={'해당되는 장르를 선택해주세요. (중복 가능)'}
                            tags={genres}
                            disabled={isDisabled} />
                    </ItemDiv>
                    </FieldColumn>
                </ModernParagraph>
                <ModernParagraph>
                    <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>적정 인원</ModernTitleDiv>
                    <FieldColumn>
                    <ItemDiv
                        name={'people'}
                        rules={[
                            {
                                required: true,
                                message: '인원을 선택해주세요.',
                            },
                        ]}
                        width={'100%'}>
                        <RangeSelector disable={isDisabled} />
                    </ItemDiv>
                    </FieldColumn>
                </ModernParagraph>
                <ModernParagraph>
                    <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>난이도</ModernTitleDiv>
                    <FieldColumn>
                    <ItemDiv
                        name={'difficulty'}
                        rules={[
                            {
                                type: 'number',
                                min: 0.5,
                                message: '난이도를 선택해주세요.',
                            },
                        ]}
                    >
                        <RateDiv
                            allowHalf
                            disabled={isDisabled}
                        />
                    </ItemDiv>
                    </FieldColumn>
                </ModernParagraph>
                <ModernParagraph>
                    <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>&nbsp;</RequiredSpan>공포도</ModernTitleDiv>
                    <FieldColumn>
                    <ItemDiv
                        name={'horror'}
                    >
                        <RateDiv
                            character={<GiWaterDrop   />}
                            color={'red'}
                            allowHalf
                            disabled={isDisabled}
                        />
                    </ItemDiv>
                    </FieldColumn>
                </ModernParagraph>
                <ModernParagraph>
                    <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>&nbsp;</RequiredSpan>활동성</ModernTitleDiv>
                    <FieldColumn>
                    <ItemDiv
                        name={'activity'}
                    >
                        <RateDiv
                            character={<GiFootprint   />}
                            color={'sienna'}
                            allowHalf
                            disabled={isDisabled}
                        />
                    </ItemDiv>
                    </FieldColumn>
                </ModernParagraph>
                <ModernParagraph>
                    <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>&nbsp;</RequiredSpan>제한 시간</ModernTitleDiv>
                    <FieldColumn>
                    <ItemDiv
                        name={'time'}
                        width={'260px'}>
                        <MinuteSelector disabled={isDisabled} />
                    </ItemDiv>
                    </FieldColumn>
                </ModernParagraph>

                <Divider style={{margin: '8px 0 0'}} />

                <ActionRow justifyContent={isMobile ? 'center' : 'flex-end'}>
                    <ItemDiv width={'100%'} style={{textAlign: isMobile ? 'center' : 'end'}}>
                        <ModernSubmitButton
                            htmlType={"submit"}
                            type={'primary'}
                            disabled={isDisabled}
                            $buttonMinWidth={'120px'}
                            $buttonHeight={'44px'}
                        >
                            등록
                        </ModernSubmitButton>
                    </ItemDiv>
                </ActionRow>
                            </FormGrid>
            </FormContainer>
                    </FormSurface>

                    {isMobile && <Divider style={{margin: 0}} />}

                    <Sidebar sidebarGap={'20px'}>
                        <GuideCard cardPadding={'18px 18px 16px'}>
                            <GuideTitle>등록 가이드</GuideTitle>
                            <GuideText>입력 완성도를 높이면 검색 노출과 예약 전환에 도움이 됩니다.</GuideText>
                            <GuideList>
                                <li>스토리는 2~3문장으로 핵심 분위기를 전달</li>
                                <li>난이도/공포도/활동성은 체감에 맞게 입력</li>
                                <li>업체 선택 후 등록 버튼이 활성화됩니다</li>
                            </GuideList>
                        </GuideCard>

                        <SideCard
                            cardRadius={'24px'}
                            cardPadding={'20px'}
                            cardShadow={'0 16px 32px var(--color-rgba-card-shadow)'}
                        >
                            <PreviewLabel>Selected Company</PreviewLabel>
                            <PreviewTitle>
                                {selectedCompany ? `${selectedCompany.companyName} ${selectedCompany.branchName}` : '업체를 선택해주세요'}
                            </PreviewTitle>
                            <PreviewText>
                                {selectedCompany
                                    ? `${selectedCompany.address} ${selectedCompany.addressDetail}`
                                    : '업체를 선택하면 주소/연락처/가격 정보가 여기에 표시됩니다.'}
                            </PreviewText>
                            {selectedCompany && (
                                <>
                                    <PreviewText style={{marginTop: '8px'}}>{selectedCompany.contact}</PreviewText>
                                    <PreviewCostList>
                                        {selectedCompany.cost.map((item, idx) => (
                                            <PreviewCostRow key={idx}>
                                                <span>{item.count}</span>
                                                <span>{item.cost}</span>
                                            </PreviewCostRow>
                                        ))}
                                    </PreviewCostList>
                                </>
                            )}
                        </SideCard>
                    </Sidebar>
                </ContentGrid>
            </RegistrationPageShell>
        </Container>
    );
};

export default EscapeRoomRegistration;