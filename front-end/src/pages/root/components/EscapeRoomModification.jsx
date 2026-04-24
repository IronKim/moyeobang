import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import {Button, Divider, Form} from "antd";
import {useMediaQuery} from "@mui/material";
import {TbGhost2Filled, TbMoodHappyFilled} from "react-icons/tb";
import {GoHeartFill} from "react-icons/go";
import {FaRunning} from "react-icons/fa";
import {PiMaskHappyFill} from "react-icons/pi";
import {RiKnifeBloodFill, RiMagicFill, RiPhoneFindFill} from "react-icons/ri";
import {GiCrimeSceneTape, GiFootprint, GiWaterDrop} from "react-icons/gi";
import {FaRedhat, FaSquarePlus} from "react-icons/fa6";
import {SiMicrogenetics} from "react-icons/si";
import styled from "styled-components";
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
    RateDiv,
    RequiredSpan,
    SectionDescription,
    SectionHeader,
    SectionTitle,
    StickySidebar,
    SurfaceCard,
} from "./SellerHomeComponents";
import PosterImage from "./PosterImage";
import RangeSelector from "./RangeSelector";
import MinuteSelector from "./MinuteSelector";
import TagSelector from "./TagSelector";
import "../../../css/theme-colors.css";

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
    gap: 10px;
`;

const SectionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
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

const EscapeRoomModification = () => {
    const [form] = Form.useForm();
    const isMobile = useMediaQuery('(max-width:1200px)');

    const companyData = [
        {
            companyName: "업체명",
            branchName: "지점",
            address: "주소",
            addressDetail: "상세주소",
            contact: "02-1234-5678",
            cost: [
                {count: "2인", cost: "30,000원"},
                {count: "3인", cost: "40,000원"},
            ],
        },
        {
            companyName: "업체명2",
            branchName: "지점2",
            address: "주소2",
            addressDetail: "상세주소2",
            contact: "02-1234-56782",
            cost: [
                {count: "3인", cost: "40,000원"},
            ],
        },
    ];

    const themeData = [
        {
            companyIndex: 0,
            themeName: "테마명1",
            themeImage: '',
            themeIntro: "스토리 소개...",
            genre: ['공포'],
            people: [2, 4],
            difficulty: 3,
            horror: 4,
            activity: 2,
            time: 60,
        },
        {
            companyIndex: 0,
            themeName: "테마명2",
            themeImage: '',
            themeIntro: "스토리 소개 2...",
            genre: ['로맨스'],
            people: [2, 3],
            difficulty: 2,
            horror: 1,
            activity: 3,
            time: 70,
        },
        {
            companyIndex: 1,
            themeName: "테마명3",
            themeImage: '',
            themeIntro: "스토리 소개 3...",
            genre: ['액션'],
            people: [3, 5],
            difficulty: 4,
            horror: 2,
            activity: 5,
            time: 80,
        },
    ];

    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);
    const [selectedThemeIndex, setSelectedThemeIndex] = useState(null);

    const filteredThemes = themeData
        .map((theme, index) => ({...theme, index}))
        .filter((theme) => theme.companyIndex === selectedCompanyIndex);

    const selectedCompany = selectedCompanyIndex !== null ? companyData[selectedCompanyIndex] : null;
    const isDisabled = selectedThemeIndex === null;

    useEffect(() => {
        if (selectedThemeIndex === null) return;
        const theme = themeData[selectedThemeIndex];
        if (!theme) return;
        form.setFieldsValue({
            themeName: theme.themeName,
            themeImage: theme.themeImage,
            themeIntro: theme.themeIntro,
            genre: theme.genre,
            people: theme.people,
            difficulty: theme.difficulty,
            horror: theme.horror,
            activity: theme.activity,
            time: theme.time,
        });
    }, [form, selectedThemeIndex]);

    const genres = [
        {icon: <TbGhost2Filled />, label: '공포'},
        {icon: <GoHeartFill />, label: '로맨스'},
        {icon: <FaRunning />, label: '액션'},
        {icon: <TbMoodHappyFilled />, label: '코미디'},
        {icon: <PiMaskHappyFill />, label: '드라마'},
        {icon: <RiMagicFill />, label: '판타지'},
        {icon: <RiKnifeBloodFill />, label: '스릴러'},
        {icon: <RiPhoneFindFill />, label: '미스터리'},
        {icon: <GiCrimeSceneTape />, label: '범죄'},
        {icon: <FaRedhat />, label: '모험'},
        {icon: <SiMicrogenetics />, label: 'SF'},
        {icon: <FaSquarePlus />, label: '기타'},
    ];

    const validateNoLeadingSpace = (value) => {
        if (!value) return Promise.resolve();
        if (value.startsWith(' ')) return Promise.reject('공백으로 시작할 수 없습니다.');
        return Promise.resolve();
    };

    const onDelete = () => {
        if (selectedThemeIndex === null) return;
        const theme = themeData[selectedThemeIndex];
        Swal.fire({
            icon: 'warning',
            title: '테마 삭제',
            html: `"${theme?.themeName}"을(를) 삭제하시겠습니까?<br>이 작업은 되돌릴 수 없습니다.`,
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            confirmButtonColor: '#ef4444',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('delete theme', theme?.themeName);
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
                    <HeroTitle>방탈출 테마 수정 및 삭제</HeroTitle>
                    <HeroDescription maxWidth={'820px'} fontSize={'15px'}>
                        기존 등록 테마를 선택해 정보를 수정하거나 삭제할 수 있습니다.
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
                            onFinish={(values) => console.log('update theme', values)}
                            initialValues={{
                                genre: [],
                                people: [],
                                difficulty: 0,
                                horror: 0,
                                activity: 0,
                                time: 60,
                            }}
                        >
                            <SectionBlock>
                                <SectionHeader>
                                    <div>
                                        <SectionTitle>업체 및 테마 선택</SectionTitle>
                                        <SectionDescription>
                                            수정할 업체와 테마를 순서대로 선택해 주세요.
                                        </SectionDescription>
                                    </div>
                                </SectionHeader>

                                <FormGrid stackGap={'18px'} paddingRight={'24px'}>
                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>업체 선택</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv width={'100%'}>
                                                <ModernSelect
                                                    placeholder="업체를 선택해주세요"
                                                    onChange={(value) => {
                                                        setSelectedCompanyIndex(value);
                                                        setSelectedThemeIndex(null);
                                                        form.resetFields([
                                                            'themeName', 'themeImage', 'themeIntro',
                                                            'genre', 'people', 'difficulty', 'horror', 'activity', 'time',
                                                        ]);
                                                        form.setFieldsValue({
                                                            genre: [],
                                                            people: [],
                                                            difficulty: 0,
                                                            horror: 0,
                                                            activity: 0,
                                                            time: 60,
                                                        });
                                                    }}
                                                    options={companyData.map((data, index) => ({
                                                        label: `${data.companyName} ${data.branchName}`,
                                                        value: index,
                                                    }))}
                                                    value={selectedCompanyIndex}
                                                    style={{width: '100%'}}
                                                />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>테마 선택</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv width={'100%'}>
                                                <ModernSelect
                                                    placeholder="테마를 선택해주세요"
                                                    disabled={selectedCompanyIndex === null}
                                                    onChange={(value) => setSelectedThemeIndex(value)}
                                                    options={filteredThemes.map((theme) => ({
                                                        label: theme.themeName,
                                                        value: theme.index,
                                                    }))}
                                                    value={selectedThemeIndex}
                                                    style={{width: '100%'}}
                                                    notFoundContent={'등록된 테마가 없습니다.'}
                                                />
                                            </ItemDiv>
                                            <HintText hintMarginTop={'6px'}>선택한 테마의 현재 정보가 아래 입력창에 자동으로 채워집니다.</HintText>
                                        </FieldColumn>
                                    </ModernParagraph>
                                </FormGrid>
                            </SectionBlock>

                            <Divider style={{margin: '28px 0'}} />

                            <SectionBlock>
                                <SectionHeader>
                                    <div>
                                        <SectionTitle>테마 정보 수정</SectionTitle>
                                        <SectionDescription>
                                            테마 이름, 이미지, 소개 및 플레이 조건을 수정할 수 있습니다.
                                        </SectionDescription>
                                    </div>
                                </SectionHeader>

                                <FormGrid stackGap={'18px'} paddingRight={'24px'}>
                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>테마 이름</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'themeName'}
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '이름을 입력해주세요.'},
                                                    {validator: (_, value) => validateNoLeadingSpace(value)},
                                                ]}
                                            >
                                                <ModernInput placeholder="테마 이름을 입력해주세요" disabled={isDisabled} />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'130px'} level={4}><RequiredSpan>*</RequiredSpan>테마 이미지</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'themeImage'}
                                                width={'150px'}
                                                rules={[
                                                    {required: true, message: '이미지를 등록해주세요.'},
                                                ]}
                                            >
                                                <PosterImage disabled={isDisabled} />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>테마 소개</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'themeIntro'}
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '소개를 입력해주세요.'},
                                                ]}
                                            >
                                                <ModernTextArea
                                                    count={{show: true, max: 500}}
                                                    maxLength={500}
                                                    rows={6}
                                                    placeholder="스토리..."
                                                    style={{resize: 'none'}}
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
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '장르를 선택해주세요.'},
                                                ]}
                                            >
                                                <TagSelector
                                                    help={'해당되는 장르를 선택해주세요. (중복 가능)'}
                                                    tags={genres}
                                                    disabled={isDisabled}
                                                />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>*</RequiredSpan>적정 인원</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv
                                                name={'people'}
                                                width={'100%'}
                                                rules={[
                                                    {required: true, message: '인원을 선택해주세요.'},
                                                ]}
                                            >
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
                                                    {type: 'number', min: 0.5, message: '난이도를 선택해주세요.'},
                                                ]}
                                            >
                                                <RateDiv allowHalf disabled={isDisabled} />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>

                                    <ModernParagraph>
                                        <ModernTitleDiv labelWidth={'120px'} level={4}><RequiredSpan>&nbsp;</RequiredSpan>공포도</ModernTitleDiv>
                                        <FieldColumn>
                                            <ItemDiv name={'horror'}>
                                                <RateDiv
                                                    character={<GiWaterDrop />}
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
                                            <ItemDiv name={'activity'}>
                                                <RateDiv
                                                    character={<GiFootprint />}
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
                                            <ItemDiv name={'time'} width={'260px'}>
                                                <MinuteSelector disabled={isDisabled} />
                                            </ItemDiv>
                                        </FieldColumn>
                                    </ModernParagraph>
                                </FormGrid>

                                <Divider style={{margin: '8px 0 0'}} />

                                <ActionRow justifyContent={'space-between'} paddingTop={'8px'}>
                                    <DeleteButton type={'default'} onClick={onDelete} disabled={isDisabled}>삭제</DeleteButton>
                                    <SaveButton
                                        htmlType={'submit'}
                                        type={'primary'}
                                        disabled={isDisabled}
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
                                <GuideItem><GuideDot />업체 선택 후 테마를 선택하면 정보가 자동으로 채워짐</GuideItem>
                                <GuideItem><GuideDot />난이도/공포도/활동성은 체감에 맞게 조정</GuideItem>
                                <GuideItem><GuideDot />테마 선택 후 수정/삭제 버튼이 활성화됩니다</GuideItem>
                            </GuideList>
                        </GuideCard>

                        <SideCard
                            cardRadius={'24px'}
                            cardPadding={'20px'}
                            cardShadow={'0 16px 32px var(--color-rgba-card-shadow)'}
                        >
                            <PreviewLabel>Selected Company</PreviewLabel>
                            <PreviewTitle>
                                {selectedCompany
                                    ? `${selectedCompany.companyName} ${selectedCompany.branchName}`
                                    : '업체를 선택해주세요'}
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

export default EscapeRoomModification;
