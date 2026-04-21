import React, {useEffect, useState} from 'react';
import Title from "antd/lib/typography/Title";
import {Button, Divider, Form, Input, Modal, Space, Typography} from "antd";
import DaumPostcode from 'react-daum-postcode';
import {TbSquareMinusFilled} from "react-icons/tb";
import TextArea from "antd/lib/input/TextArea";
import styled from "styled-components";
import {useMediaQuery} from "@mui/material";
import {AnimatePresence, motion} from "motion/react";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import addressImage from "../../../assets/images/Address.png";
import "../../../css/theme-colors.css";
import {Container, FormContainer, ItemDiv, ParagraphDiv, RequiredSpan, TitleDiv} from "./SellerHomeComponents";
import {phone} from "../../../utils/formatters";

const {kakao} = window;

const PageShell = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 28px;
    padding: 8px 4px 32px;
`;

const HeroCard = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    padding: 28px 32px;
    background:
        radial-gradient(circle at top right, var(--color-rgba-brand-radial), transparent 32%),
        linear-gradient(135deg, var(--color-blue-100) 0%, var(--color-blue-070) 48%, var(--color-blue-100) 100%);
    border: 1px solid var(--color-rgba-brand-border);
    box-shadow: 0 18px 40px var(--color-rgba-brand-shadow);

    @media (max-width: 1200px) {
        padding: 24px 20px;
        border-radius: 22px;
    }
`;

const HeroBadge = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 999px;
    background: var(--color-rgba-badge-bg);
    color: var(--color-blue-800);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

const HeroTitle = styled.h2`
    margin: 14px 0 8px;
    font-size: 34px;
    line-height: 1.15;
    color: var(--color-gray-900);

    @media (max-width: 1200px) {
        font-size: 28px;
    }
`;

const HeroDescription = styled.p`
    max-width: 820px;
    margin: 0;
    color: var(--color-gray-700);
    font-size: 15px;
    line-height: 1.7;
`;

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) 420px;
    gap: 28px;
    align-items: start;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`;

const FormSurface = styled(motion.div)`
    border-radius: 28px;
    padding: 28px;
    background: var(--color-white);
    border: 1px solid var(--color-rgba-card-border);
    box-shadow: 0 18px 40px var(--color-rgba-card-shadow);

    @media (max-width: 1200px) {
        padding: 20px 16px;
        border-radius: 22px;
    }
`;

const PreviewSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 24px;

    @media (max-width: 1200px) {
        position: static;
    }
`;

const PreviewCard = styled(motion.div)`
    border-radius: 24px;
    padding: 20px;
    background: var(--color-white);
    border: 1px solid var(--color-rgba-card-border);
    box-shadow: 0 16px 32px var(--color-rgba-card-shadow);
`;

const PreviewLabel = styled.div`
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--color-gray-650);
    text-transform: uppercase;
    margin-bottom: 8px;
`;

const PreviewTitle = styled.h3`
    margin: 0 0 16px;
    color: var(--color-gray-900);
    font-size: 26px;
    line-height: 1.2;
`;

const SectionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--color-rgba-card-shadow);

    @media (max-width: 1200px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const SectionTitle = styled.h3`
    margin: 0;
    color: var(--color-gray-900);
    font-size: 22px;
`;

const SectionDescription = styled.p`
    margin: 0;
    color: var(--color-gray-600);
    font-size: 14px;
    line-height: 1.6;
`;

const FormGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-right: 24px;

    @media (max-width: 1200px) {
        padding-right: 0;
    }
`;

const ModernParagraph = styled(ParagraphDiv)`
    align-items: flex-start;
    gap: 12px;

    @media (max-width: 1200px) {
        gap: 8px;
    }
`;

const ModernTitleDiv = styled(TitleDiv)`
    width: 120px;
    margin: 0;
    padding-top: 10px;
    flex-shrink: 0;
    font-size: 17px;

    @media (max-width: 1200px) {
        width: 100%;
        padding-top: 0;
        text-align: left;
    }
`;

const FieldColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const HintText = styled.div`
    font-size: 12px;
    color: var(--color-gray-500);
    line-height: 1.5;
`;

const ModernInput = styled(Input)`
    height: 46px;
    border-radius: 14px;
    border-color: var(--color-border-input);
    background: var(--color-blue-060);

    &:hover,
    &:focus,
    &.ant-input-focused {
        border-color: var(--color-blue-450);
        box-shadow: 0 0 0 4px var(--color-rgba-focus-ring);
        background: var(--color-white);
    }
`;

const ModernTextArea = styled(TextArea)`
    border-radius: 16px;
    border-color: var(--color-border-input);
    background: var(--color-blue-060);

    &:hover,
    &:focus,
    &.ant-input-focused {
        border-color: var(--color-blue-450);
        box-shadow: 0 0 0 4px var(--color-rgba-focus-ring);
        background: var(--color-white);
    }
`;

const AddressSearchInput = styled(ModernInput)`
    cursor: pointer;
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

const SubmitArea = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 8px;
`;

const SubmitButton = styled(Button)`
    && {
        min-width: 150px;
        height: 50px;
        border-radius: 999px;
        font-weight: 700;
        background: linear-gradient(135deg, var(--color-blue-650) 0%, var(--color-blue-500) 100%);
        box-shadow: 0 14px 28px var(--color-rgba-submit-shadow);
        border: none;
        color: var(--color-white);
    }

    &&:hover,
    &&:focus {
        background: linear-gradient(135deg, var(--color-blue-900) 0%, var(--color-blue-600) 100%) !important;
        border: none;
        color: var(--color-white);
    }
`;

const HelperCard = styled.div`
    border-radius: 20px;
    padding: 18px 18px 16px;
    background: linear-gradient(135deg, var(--color-blue-900) 0%, var(--color-blue-700) 100%);
    color: var(--color-white);
`;

const HelperTitle = styled.div`
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 8px;
`;

const HelperText = styled.p`
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    color: var(--color-rgba-helper-text);
`;

const HelperList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 14px;
`;

const HelperItem = styled.div`
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 13px;
    line-height: 1.5;
`;

const HelperDot = styled.div`
    width: 8px;
    height: 8px;
    margin-top: 6px;
    border-radius: 50%;
    background: var(--color-white);
    flex-shrink: 0;
`;

const MapFrame = styled.div`
    overflow: hidden;
    border-radius: 18px;
    background: var(--color-blue-100);
    box-shadow: inset 0 0 0 1px var(--color-rgba-card-border);
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
        cost: [
            {
                count: "",
                cost: ""
            }
        ],
        costInfo: "1인은 2인 금액으로 책정됩니다.\n 5인 이상은 별도 문의 바랍니다."
    });

    const onInput = (e) => {
        if(e.target.id.startsWith("cost")){

            const index = e.target.id.split("_")[1]
            const value = e.target.value;
            const key = e.target.id.split("_")[2]
            console.log(key)


            companyData.cost[index][key] = value
            setCompanyData({
                ...companyData,
                cost: companyData.cost
            })
            return
        }
        setCompanyData({
            ...companyData,
            [e.target.name]: e.target.value
        });
    }

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

    const example = "ex) 1인은 2인 금액으로 책정됩니다.\n 5인 이상은 별도 문의 바랍니다."

    return (
        <Container>
            <PageShell>
                <HeroCard>
                    <HeroBadge>Seller Studio</HeroBadge>
                    <HeroTitle>업체 등록</HeroTitle>
                    <HeroDescription>
                        지점 정보, 주소, 가격 정책을 한 번에 정리해서 등록할 수 있습니다. 오른쪽 미리보기 패널을 보면서
                        지도와 이용료 구성을 바로 확인해보세요.
                    </HeroDescription>
                </HeroCard>

                <ContentGrid>
                    <FormSurface
                        initial={{opacity: 0, y: 18}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.35, ease: "easeOut"}}
                    >
                        <SectionBlock>
                            <SectionHeader>
                                <div>
                                    <SectionTitle>기본 정보</SectionTitle>
                                    <SectionDescription>
                                        고객이 처음 보게 되는 핵심 정보입니다. 업체명과 주소는 명확하게 입력해 주세요.
                                    </SectionDescription>
                                </div>
                            </SectionHeader>

                            <FormContainer form={form}>
                                <FormGrid>
                                    <ModernParagraph>
                                        <ModernTitleDiv level={4}><RequiredSpan>*</RequiredSpan>업체명</ModernTitleDiv>
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
                                        <ModernTitleDiv level={4}><RequiredSpan>*</RequiredSpan>연락처</ModernTitleDiv>
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
                            </FormContainer>
                        </SectionBlock>

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

                            <Form>
                                <Form.List name="cost" initialValue={companyData.cost}>
                                    {(fields, {add, remove}) => (
                                        <CostListWrap>
                                            <AnimatePresence initial={false}>
                                                {fields.map(({key, name, ...restField}) => (
                                                    <CostRow
                                                        key={key}
                                                        initial={{x: -40, opacity: 0}}
                                                        animate={{x: 0, opacity: 1}}
                                                        exit={{x: 40, opacity: 0}}
                                                        transition={{duration: 0.28, ease: "easeOut"}}
                                                    >
                                                        <CostRowInner>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'count']}
                                                                onChange={onInput}
                                                                style={{margin: 0}}
                                                            >
                                                                <ModernInput placeholder="예: 2인, 3인, 4인" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'cost']}
                                                                onChange={onInput}
                                                                style={{margin: 0}}
                                                            >
                                                                <ModernInput placeholder="예: 30,000원" />
                                                            </Form.Item>
                                                            <RemoveButton
                                                                onClick={() => {
                                                                    remove(name)
                                                                    companyData.cost.splice(name, 1)
                                                                    setCompanyData({
                                                                        ...companyData,
                                                                        cost: companyData.cost
                                                                    })
                                                                }}
                                                            />
                                                        </CostRowInner>
                                                    </CostRow>
                                                ))}
                                            </AnimatePresence>
                                            <Form.Item style={{margin: 0}}>
                                                <AddRowButton
                                                    type="dashed"
                                                    onClick={() => {
                                                        add()
                                                        companyData.cost.push({ count: "", cost: "" })
                                                        setCompanyData({
                                                            ...companyData,
                                                            cost: companyData.cost
                                                        })
                                                    }}
                                                    block
                                                    icon={<div />}
                                                >
                                                    가격 행 추가하기
                                                </AddRowButton>
                                            </Form.Item>
                                        </CostListWrap>
                                    )}
                                </Form.List>
                            </Form>

                            <ModernParagraph>
                                <ModernTitleDiv level={4}><RequiredSpan>&nbsp;</RequiredSpan>안내 사항</ModernTitleDiv>
                                <FieldColumn>
                                    <ModernTextArea
                                        name='costInfo'
                                        rows={4}
                                        placeholder={example}
                                        autoSize={true}
                                        value={companyData.costInfo}
                                        onChange={onInput}
                                    />
                                </FieldColumn>
                            </ModernParagraph>

                            <SubmitArea>
                                <SubmitButton type="primary">등록하기</SubmitButton>
                            </SubmitArea>
                        </SectionBlock>
                    </FormSurface>

                    {isMobile && <Divider />}

                    <PreviewSection>
                        <HelperCard>
                            <HelperTitle>등록 가이드</HelperTitle>
                            <HelperText>
                                기본 정보와 가격 구성을 먼저 잡아두면 이후 수정 작업이 훨씬 쉬워집니다.
                            </HelperText>
                            <HelperList>
                                <HelperItem><HelperDot />업체명은 검색에 보이는 기준 이름으로 입력</HelperItem>
                                <HelperItem><HelperDot />주소를 선택하면 지도 위치가 함께 반영</HelperItem>
                                <HelperItem><HelperDot />가격 항목은 인원 단위로 나누면 비교가 쉬움</HelperItem>
                            </HelperList>
                        </HelperCard>

                        <PreviewCard
                            initial={{opacity: 0, x: 16}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.35, delay: 0.05, ease: "easeOut"}}
                        >
                            <PreviewLabel>Live Preview</PreviewLabel>
                            <PreviewTitle>지도</PreviewTitle>
                            <MapFrame>
                                {
                                    companyData.latitude && companyData.longitude ? <Map
                                            center={{lat: companyData.latitude, lng: companyData.longitude}}
                                            style={{
                                                width: '100%',
                                                height: "360px"
                                            }}
                                            draggable={false}
                                        >
                                            {
                                                companyData.latitude && companyData.longitude &&
                                                <MapMarker position={{lat: companyData.latitude, lng: companyData.longitude}}>
                                                </MapMarker>
                                            }
                                        </Map> :
                                        <img src={addressImage} alt="address" style={{
                                            display: 'block',
                                            width: '100%',
                                            height: "360px",
                                            objectFit: 'cover'
                                        }}/>
                                }
                            </MapFrame>
                        </PreviewCard>

                        <PreviewCard
                            initial={{opacity: 0, x: 16}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.35, delay: 0.1, ease: "easeOut"}}
                        >
                            <PreviewLabel>Live Preview</PreviewLabel>
                            <PreviewTitle>이용료 안내</PreviewTitle>
                            <PricePreviewCard>
                                <PricePreviewHeader>
                                    <Typography.Title style={{margin: 0, textAlign: 'center'}} level={3}>이용료</Typography.Title>
                                </PricePreviewHeader>
                                <PricePreviewBody>
                                    <AnimatePresence initial={false} mode="popLayout">
                                        {
                                            companyData.cost.some((cost) => cost.count || cost.cost) ? (
                                                companyData.cost.map((cost, index) => (
                                                    <motion.div
                                                        key={index}
                                                        layout
                                                        initial={{x: -24, opacity: 0}}
                                                        animate={{x: 0, opacity: 1}}
                                                        exit={{x: 24, opacity: 0}}
                                                        transition={{duration: 0.24, ease: "easeOut"}}
                                                    >
                                                        <Typography.Paragraph style={{fontSize: '16px', marginBottom: 0, textAlign: 'center'}}>
                                                            {cost.count} {cost.cost}
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
                                    {
                                        companyData.costInfo.split('\n').map((line, index) => (
                                            <NoticeLine key={index}>{line}</NoticeLine>
                                        ))
                                    }
                                </PricePreviewFooter>
                            </PricePreviewCard>
                        </PreviewCard>
                    </PreviewSection>
                </ContentGrid>
            </PageShell>

            <Modal title="주소 검색" open={isModalOpen} onOk={onToggleModal} onCancel={onToggleModal} maskClosable={false}
                   width={760} cancelButtonProps={{style: {display: 'none'}}} okButtonProps={{style: {display: 'none'}}}
                   destroyOnClose>
                <DaumPostcode onComplete={handleComplete} style={{height: isMobile ? '460px' : '800px'}}/>
            </Modal>
        </Container>
    );
};

export default CompanyRegistration;