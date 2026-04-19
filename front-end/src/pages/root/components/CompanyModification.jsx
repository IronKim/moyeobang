import React, {useState} from 'react';
import Title from "antd/lib/typography/Title";
import {Button, Divider, Form, Input, Modal, Select, Space} from "antd";
import DaumPostcode from 'react-daum-postcode';
import {TbSquareMinusFilled} from "react-icons/tb";
import TextArea from "antd/lib/input/TextArea";
import styled from "styled-components";
import {useMediaQuery} from "@material-ui/core";

const InputGroup = styled.div`
    display: flex;
    width: 40%;
    justify-content: space-between;
    
    @media (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
    }
`
const TitleDiv = styled(Title)`
    width: 20%;
    margin: 0 auto;
    
    @media (max-width: 1200px) {
        width: 100%;
        text-align: center;
    }
`

const CompanyModification = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:1200px)');

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

    const [selectedCompany, setSelectedCompany] = useState(companyData[0]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleComplete = (data) => {
        console.log(data)
        setIsModalOpen(false);
    };

    const example = "ex) 1인은 2인 금액으로 책정됩니다.\n 5인 이상은 별도 문의 바랍니다."

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div>
            <Title level={3}>업체 수정 및 삭제</Title>
            <Divider/>
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginLeft: isMobile ? '0px' : '20px', width: '100%'}}>
                <InputGroup>
                    <TitleDiv level={4} >업체명</TitleDiv>
                    <Select
                        showSearch
                        placeholder="업체를 선택해주세요"
                        onChange={(value) => setSelectedCompany(companyData[value])}
                        optionFilterProp="children"
                        filterOption={filterOption}
                        notFoundContent={"업체가 없습니다."}
                        options={
                            companyData.map((data, index) => ({label: data.companyName, value: index}))
                        }
                        value={selectedCompany.companyName}
                        style={{width: isMobile ? '100%' : '80%', margin: '0 auto', height: isMobile ? '32px' : '38px'}}
                    />
                </InputGroup>
                <InputGroup>
                    <TitleDiv level={4}>지점</TitleDiv>
                    <Input size="middle" placeholder="ex) 강남점" style={{width: isMobile ? '100%' : '80%', margin: '0 auto'}} value={selectedCompany.branchName}/>
                </InputGroup>
                <InputGroup>
                    <TitleDiv level={4}>주소</TitleDiv>
                    <div style={{width: isMobile ? '100%' : '80%', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <Input size="middle" placeholder="주소 검색" onClick={showModal} value={selectedCompany.address}/>
                        <Input size="middle" placeholder="상세주소" value={selectedCompany.addressDetail}/>
                    </div>
                </InputGroup>
                <InputGroup>
                    <TitleDiv level={4}>연락처</TitleDiv>
                    <Input size="middle" placeholder="숫자만 입력" style={{width: isMobile ? '100%' : '80%', margin: '0 auto'}} value={selectedCompany.contact}/>
                </InputGroup>
                <InputGroup>
                    <TitleDiv level={4}>이용료</TitleDiv>
                    <div style={{width: isMobile ? '100%' : '80%',}}>
                        <Form initialValues={{cost: selectedCompany.cost}}>
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
                                                >
                                                    <Input placeholder="인원 수 ex) 2인"/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'cost']}
                                                >
                                                    <Input placeholder="가격 ex) 30,000원"/>
                                                </Form.Item>
                                                <TbSquareMinusFilled onClick={() => remove(name)}/>
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<div/>}>
                                                추가하기
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Form>
                    </div>
                </InputGroup>
                <InputGroup>
                    <TitleDiv level={4} style={{width: '50%', margin: '0 auto'}}>이용료 안내 사항</TitleDiv>
                    <TextArea rows={4} placeholder={example} autoSize={true} value={selectedCompany.costInfo} />
                </InputGroup>
                <InputGroup>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                        <Button type={"primary"} danger
                                style={{margin: '0 auto', display: 'block', width: '100px'}}>삭제</Button>
                        <Button type="primary" style={{margin: '0 auto', display: 'block', width: '100px'}}>수정</Button>
                    </div>
                </InputGroup>
            </div>


            <Modal title="주소 검색" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} maskClosable={false}
                   cancelButtonProps={{style: {display: 'none'}}} okButtonProps={{style: {display: 'none'}}}
                   destroyOnClose>
                <DaumPostcode onComplete={handleComplete}/>
            </Modal>
        </div>
    );
};

export default CompanyModification;