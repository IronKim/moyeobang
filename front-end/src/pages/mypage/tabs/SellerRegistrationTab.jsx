import React from 'react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import { business, phone } from '../../../utils/formatters';
import { SectionTitle } from './TabCommonStyles';

const SellerFormHint = styled.p`
    color: #6b7784;
    font-size: 13px;
    margin: 2px 0 12px 0;
`;

const SellerForm = styled(Form)`
    width: 100%;
`;

const SellerFormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`;

const SellerFormItem = styled(Form.Item)`
    margin-bottom: 10px;

    .ant-form-item-label > label {
        color: #365067;
        font-weight: 600;
    }
`;

const FullWidthFormItem = styled(SellerFormItem)`
    grid-column: 1 / -1;
`;

const SellerInput = styled(Input)`
    && {
        border-radius: 10px;
        min-height: 42px;
    }
`;

const SellerTextArea = styled(Input.TextArea)`
    && {
        border-radius: 10px;
    }
`;

const SellerSubmitButton = styled(Button)`
    && {
        height: 44px;
        border-radius: 10px;
        background: #0e74b7;
        border-color: #0e74b7;
        font-weight: 700;
        padding: 0 20px;
    }
`;

const SellerRegistrationTab = () => {
    const [sellerForm] = Form.useForm();

    const handleSellerSubmit = (values) => {
        console.log('seller registration submit', values);
    };

    return (
        <>
            <SectionTitle>업체 등록</SectionTitle>
            <SellerFormHint>기본 정보만 먼저 입력해도 저장할 수 있도록 구성했습니다.</SellerFormHint>
            <SellerForm
                form={sellerForm}
                layout={'vertical'}
                onFinish={handleSellerSubmit}
                initialValues={{
                    companyName: '',
                    branchName: '',
                    businessNumber: '',
                    contact: '',
                    address: '',
                    addressDetail: '',
                    companyDescription: '',
                }}
            >
                <SellerFormGrid>
                    <SellerFormItem
                        name={'companyName'}
                        label={'업체명'}
                        rules={[{ required: true, message: '업체명을 입력해주세요.' }]}
                    >
                        <SellerInput placeholder={'업체명을 입력해주세요'} maxLength={30} />
                    </SellerFormItem>

                    <SellerFormItem
                        name={'branchName'}
                        label={'지점명'}
                    >
                        <SellerInput placeholder={'예: 강남점'} maxLength={30} />
                    </SellerFormItem>

                    <SellerFormItem
                        name={'businessNumber'}
                        label={'사업자번호'}
                        getValueFromEvent={(e) => business.normalize(e?.target?.value || '')}
                        getValueProps={(value) => ({ value: business.format(value || '') })}
                        rules={[
                            { required: true, message: '사업자번호를 입력해주세요.' },
                            { pattern: /^[0-9]{10}$/, message: '사업자번호 10자리를 입력해주세요.' },
                        ]}
                    >
                        <SellerInput placeholder={'숫자만 입력해주세요'} maxLength={12} inputMode={'numeric'} />
                    </SellerFormItem>

                    <SellerFormItem
                        name={'contact'}
                        label={'연락처'}
                        getValueFromEvent={(e) => phone.normalize(e?.target?.value || '')}
                        getValueProps={(value) => ({ value: phone.format(value || '') })}
                        rules={[
                            { required: true, message: '연락처를 입력해주세요.' },
                            { pattern: /^(010\d{8}|01[16789]\d{7,8})$/, message: '올바른 연락처를 입력해주세요.' },
                        ]}
                    >
                        <SellerInput placeholder={'전화번호 숫자만 입력해주세요'} maxLength={13} inputMode={'numeric'} />
                    </SellerFormItem>

                    <FullWidthFormItem
                        name={'address'}
                        label={'주소'}
                        rules={[{ required: true, message: '주소를 입력해주세요.' }]}
                    >
                        <SellerInput placeholder={'도로명 주소를 입력해주세요'} maxLength={80} />
                    </FullWidthFormItem>

                    <FullWidthFormItem
                        name={'addressDetail'}
                        label={'상세주소'}
                        rules={[{ required: true, message: '상세주소를 입력해주세요.' }]}
                    >
                        <SellerInput placeholder={'상세주소를 입력해주세요'} maxLength={80} />
                    </FullWidthFormItem>

                    <FullWidthFormItem
                        name={'companyDescription'}
                        label={'업체 소개'}
                    >
                        <SellerTextArea placeholder={'고객에게 보여줄 업체 소개를 입력해주세요'} rows={4} maxLength={500} showCount />
                    </FullWidthFormItem>

                    <FullWidthFormItem style={{ marginTop: 4, marginBottom: 0 }}>
                        <SellerSubmitButton type={'primary'} htmlType={'submit'}>
                            업체 등록하기
                        </SellerSubmitButton>
                    </FullWidthFormItem>
                </SellerFormGrid>
            </SellerForm>
        </>
    );
};

export default SellerRegistrationTab;
