import React, {useEffect, useState} from 'react';
import Title from "antd/lib/typography/Title";
import {Button, Divider, Form, Input, Modal, Space, Typography} from "antd";
import DaumPostcode from 'react-daum-postcode';
import {TbSquareMinusFilled} from "react-icons/tb";
import TextArea from "antd/lib/input/TextArea";
import styled from "styled-components";
import {useMediaQuery} from "@mui/material";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import addressImage from "../../../assets/images/Address.png";
import {Container, FormContainer, ItemDiv, ParagraphDiv, RequiredSpan, TitleDiv} from "./SellerHomeComponents";

const {kakao} = window;

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
                    const coords = new kakao.maps.LatLng(result[0].x, result[0].y);
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

    useEffect(() => {
        console.log(companyData)
    }, [companyData]);

    const example = "ex) 1인은 2인 금액으로 책정됩니다.\n 5인 이상은 별도 문의 바랍니다."

    return (
        <Container>
            <Title level={3}>업체 등록</Title>
            <Divider/>
            <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row'}}>
                <FormContainer form={form}>
                    <ParagraphDiv>
                        <TitleDiv level={4}><RequiredSpan>*</RequiredSpan>업체명</TitleDiv>
                        <ItemDiv
                            name={'name'}
                            width={'390px'}
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
                        <Input placeholder="유효성" />
                        </ItemDiv>
                    </ParagraphDiv>
                    <ParagraphDiv>
                        <TitleDiv level={4}>지점</TitleDiv>
                        <ItemDiv
                            name={'branchName'}
                            width={'390px'}
                        >
                            <Input placeholder="ex) 강남점" />
                        </ItemDiv>
                    </ParagraphDiv>
                    <ParagraphDiv>
                        <TitleDiv level={4}><RequiredSpan>*</RequiredSpan>주소</TitleDiv>
                        <div style={{
                            width: isMobile ? '100%' : '80%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <ItemDiv
                                name={'address'}
                                width={'390px'}
                                rules={[
                                    {
                                        required: true,
                                        message: '주소를 입력해주세요.'
                                    },
                                ]}
                            >
                                <Input placeholder="주소 검색" onClick={onToggleModal} readOnly />
                            </ItemDiv>
                            <ItemDiv
                                name={'addressDetail'}
                                width={'390px'}
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
                                <Input placeholder="상세주소" />
                            </ItemDiv>
                        </div>
                    </ParagraphDiv>
                    <ParagraphDiv>
                        <TitleDiv level={4}><RequiredSpan>*</RequiredSpan>연락처</TitleDiv>
                        <ItemDiv
                            name={'contact'}
                            width={'390px'}
                            rules={[
                                {
                                    required: true,
                                    message: '연락처를 입력해주세요.'

                                },
                                {
                                    pattern: /^[0-9]*$/,
                                    message: '숫자만 입력해주세요.'
                                }
                            ]}
                        >
                            <Input placeholder="숫자만 입력" />
                        </ItemDiv>
                    </ParagraphDiv>
                    <ParagraphDiv>
                        <TitleDiv level={4}>이용료</TitleDiv>
                        <div style={{width: isMobile ? '100%' : '80%',}}>
                            <Form
                                initialValues={{cost: companyData.cost}}>
                                <Form.List name="cost">
                                    {(fields, {add, remove}) => (
                                        <>
                                            {fields.map(({key, name, ...restField}) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: isMobile ? 'center' : 'flex-start',
                                                        gap: '20px',
                                                    }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'count']}
                                                        onChange={onInput}
                                                    >
                                                        <Input placeholder="인원 수 ex) 2인"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'cost']}
                                                        onChange={onInput}
                                                    >
                                                        <Input placeholder="가격 ex) 30,000원"/>
                                                    </Form.Item>
                                                    <TbSquareMinusFilled onClick={() => {
                                                        remove(name)
                                                        companyData.cost.splice(name, 1)
                                                        setCompanyData({
                                                            ...companyData,
                                                            cost: companyData.cost
                                                        })
                                                    }}
                                                    style={{cursor: 'pointer'}}
                                                    />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={
                                                    () => {
                                                        add()
                                                        companyData.cost.push({ count: "", cost: "" })
                                                        setCompanyData({
                                                            ...companyData,
                                                            cost: companyData.cost
                                                        })
                                                    }

                                                } block icon={<div/>}>
                                                    추가하기
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form>
                        </div>
                    </ParagraphDiv>
                    <ParagraphDiv>
                        <TitleDiv level={4} style={{width: '50%', margin: '0 auto'}}>이용료 안내 사항</TitleDiv>
                        <TextArea name='costInfo' rows={4} placeholder={example} autoSize={true} value={companyData.costInfo} onChange={onInput}/>
                    </ParagraphDiv>
                    <ParagraphDiv>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <Button type="primary"
                                    style={{width: '100px', margin: '0 auto', display: 'block'}}>등록하기</Button>
                        </div>
                    </ParagraphDiv>
                </FormContainer>
                {
                    isMobile && <Divider/>
                }
                <div style={{textAlign: 'center'}}>
                    <div>
                        <Title level={3}>지도</Title>
                        {
                            companyData.latitude && companyData.longitude ? <Map
                                    center={{lat: companyData.longitude, lng: companyData.latitude}}
                                    style={{
                                        margin: '0 auto',
                                        width: isMobile ? '100%' : "360px",
                                        maxWidth: '360px',
                                        height: "360px",
                                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
                                    }}
                                    draggable={false}
                                >
                                    {
                                        companyData.latitude && companyData.longitude &&
                                        <MapMarker position={{lat: companyData.longitude, lng: companyData.latitude}}>
                                        </MapMarker>
                                    }
                                </Map> :
                                <img src={addressImage} alt="address" style={{
                                    margin: '0 auto',
                                    width: isMobile ? '100%' : "360px",
                                    maxWidth: '360px',
                                    height: isMobile ? '100%' : "360px",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
                                }}/>
                        }
                        <Divider/>
                        <Title level={3}>이용료 안내 미리보기</Title>
                        <div style={{
                            width: isMobile ? '100%' : "360px",
                            maxWidth: '360px',
                            height: '100%',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px',
                            margin: '0 auto'
                        }}>
                            <Typography.Title style={{paddingTop: '20px', textAlign: 'center'}}
                                              level={3}>이용료</Typography.Title>
                            <Divider/>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                                {
                                    companyData.cost.map((cost, index) => (
                                        <div key={index}>
                                            <Typography.Paragraph
                                                style={{fontSize: '16pt'}}>{cost.count} {cost.cost}</Typography.Paragraph>
                                        </div>
                                    ))
                                }
                            </div>
                            <div>
                                {
                                    companyData.costInfo.split('\n').map((line, index) => (
                                        <Typography.Paragraph key={index}
                                                              style={{
                                                                  fontSize: '8pt',
                                                                  textAlign: 'right',
                                                                  paddingRight: '5px'
                                                              }}>{line}</Typography.Paragraph>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Modal title="주소 검색" open={isModalOpen} onOk={onToggleModal} onCancel={onToggleModal} maskClosable={false}
                   cancelButtonProps={{style: {display: 'none'}}} okButtonProps={{style: {display: 'none'}}}
                   destroyOnClose>
                <DaumPostcode onComplete={handleComplete}/>
            </Modal>
        </Container>
    );
};

export default CompanyRegistration;