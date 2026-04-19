import React, {useState} from 'react';
import Title from "antd/lib/typography/Title";
import {Divider, Input, Select} from "antd";
import {useMediaQuery} from "@material-ui/core";
import {
    Container,
    FormContainer,
    ItemDiv,
    ParagraphDiv,
    RateDiv,
    RequiredSpan,
    SubmitButton,
    TitleDiv
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

const EscapeRoomRegistration = () => {
    const isMobile = useMediaQuery('(max-width:1200px)');
    const [selectedCompany, setSelectedCompany] = useState(null);
    const isDisabled = !selectedCompany;

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

    return (
        <Container>
            <Title level={3}>테마 등록</Title>
            <Divider/>
            <FormContainer
                initialValues={{
                    company: companyData.name,
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
                <ParagraphDiv>
                    <TitleDiv level={4}><RequiredSpan>*</RequiredSpan>업체 선택</TitleDiv>
                    <ItemDiv placeholder="업체를 선택해주세요" width={'390px'}>
                        <Select placeholder="업체를 선택해주세요"
                                onChange={(value) => setSelectedCompany(companyData[value])}
                                options={companyData.map((data, index) => ({
                                    label: `${data.companyName}-${data.branchName}`,
                                    value: index
                                }))}
                                value={selectedCompany ? `${selectedCompany.companyName}-${selectedCompany.branchName}` : undefined}
                                style={{width: '100%'}}
                        />
                    </ItemDiv>
                </ParagraphDiv>
                <ParagraphDiv>
                    <TitleDiv level={4}><RequiredSpan>*</RequiredSpan>테마 이름</TitleDiv>
                    <ItemDiv
                        name={'themename'}
                        rules={[
                            {
                                required: true,
                                message: '이름을 입력해주세요.',
                            },
                            {
                                validator: (rule, value) => {
                                    if (value.startsWith(" ")) {
                                        return Promise.reject('공백으로 시작할 수 없습니다.')
                                    } else {
                                        return Promise.resolve()
                                    }
                                }
                            }
                            // {
                            //     max: 20,
                            //     message: '20자 이내로 입력해주세요',
                            // }
                        ]}
                        width={'390px'}>
                        <Input placeholder="유효성"
                               disabled={isDisabled} />
                    </ItemDiv>
                </ParagraphDiv>
                <ParagraphDiv>
                    <TitleDiv width={'130px'} level={4}><RequiredSpan>*</RequiredSpan>테마 이미지</TitleDiv>
                    <ItemDiv
                        name={'themeimage'}
                        rules={[
                            {
                                required: true,
                                message: '이미지를 등록해주세요.',
                            }
                        ]}
                        width={'130px'}>
                        <PosterImage disabled={isDisabled} />
                    </ItemDiv>
                </ParagraphDiv>
                <ParagraphDiv>
                    <TitleDiv level={4}><RequiredSpan>*</RequiredSpan>테마 소개</TitleDiv>
                    <ItemDiv
                        name={'themeintro'}
                        rules={[
                            {
                                required: true,
                                message: '소개를 입력해주세요.',
                            }
                        ]}
                        width={'455px'}>
                        <Input.TextArea
                            count={{
                                show: true,
                                max: 500,
                            }}
                            maxLength={500}
                            rows={6} placeholder="스토리..." style={{ resize: 'none' }}
                            disabled={isDisabled}
                        />
                    </ItemDiv>
                </ParagraphDiv>
                <ParagraphDiv>
                    <TitleDiv level={4}><RequiredSpan>*</RequiredSpan>장르</TitleDiv>
                    <ItemDiv
                        name={'genre'}
                        rules={[
                            {
                                required: true,
                                message: '장르를 선택해주세요.',
                            }
                        ]}
                        width={'520px'}>
                        <TagSelector
                            help={'해당되는 장르를 선택해주세요. (중복 가능)'}
                            tags={genres}
                            disabled={isDisabled} />
                    </ItemDiv>
                </ParagraphDiv>
                <ParagraphDiv>
                    <TitleDiv level={4}><RequiredSpan>*</RequiredSpan>적정 인원</TitleDiv>
                    <ItemDiv
                        name={'people'}
                        rules={[
                            {
                                required: true,
                                message: '인원을 선택해주세요.',
                            },
                        ]}
                        width={'300px'}>
                        <RangeSelector disable={isDisabled} />
                    </ItemDiv>
                </ParagraphDiv>
                <ParagraphDiv>
                    <TitleDiv level={4}><RequiredSpan>*</RequiredSpan>난이도</TitleDiv>
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
                </ParagraphDiv>
                <ParagraphDiv>
                    <TitleDiv level={4}>공포도</TitleDiv>
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
                </ParagraphDiv>
                <ParagraphDiv>
                    <TitleDiv level={4}>활동성</TitleDiv>
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
                </ParagraphDiv>
                <ParagraphDiv>
                    <TitleDiv level={4}>제한 시간</TitleDiv>
                    <ItemDiv
                        name={'time'}
                        width={'200px'}>
                        <MinuteSelector disabled={isDisabled} />
                    </ItemDiv>
                </ParagraphDiv>
                <ParagraphDiv>
                    <ItemDiv
                        width={'780px'} style={{textAlign: isMobile ? 'center' : 'end'}}>
                        <SubmitButton htmlType={"submit"} type={'primary'} disabled={isDisabled}>등록</SubmitButton>
                    </ItemDiv>
                </ParagraphDiv>
            </FormContainer>
        </Container>
    );
};

export default EscapeRoomRegistration;