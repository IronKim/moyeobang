import React, { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
import { Button, Form, Input, Modal } from 'antd';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { business, phone } from '../../../utils/formatters';
import { registerStore } from '../../../api/StoreApiService';
import { useSetupUserDataByToken } from '../../../hooks/useUser';
import { ROLETYPE } from '../../../constants/ROLETYPE';
import { SectionTitle } from './TabCommonStyles';

const { kakao } = window;

const OwnerFormHint = styled.p`
    color: #6b7784;
    font-size: 13px;
    margin: 2px 0 12px 0;
`;

const OwnerForm = styled(Form)`
    width: 100%;
`;

const OwnerFormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`;

const OwnerFormItem = styled(Form.Item)`
    margin-bottom: 10px;

    .ant-form-item-label > label {
        color: #365067;
        font-weight: 600;
    }
`;

const FullWidthFormItem = styled(OwnerFormItem)`
    grid-column: 1 / -1;
`;

const OwnerInput = styled(Input)`
    && {
        border-radius: 10px;
        min-height: 42px;
    }
`;

const AddressSearchInput = styled(OwnerInput)`
    && {
        cursor: pointer;
    }
`;

const OwnerTextArea = styled(Input.TextArea)`
    && {
        border-radius: 10px;
    }
`;

const ContactListWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ContactRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ContactInputItem = styled(Form.Item)`
    flex: 1;
    margin-bottom: 0;
`;

const ContactActionButton = styled(Button)`
    && {
        min-width: 56px;
        height: 42px;
        border-radius: 10px;
    }
`;

const OwnerSubmitButton = styled(Button)`
    && {
        height: 44px;
        border-radius: 10px;
        background: #0e74b7;
        border-color: #0e74b7;
        font-weight: 700;
        padding: 0 20px;
    }
`;

const OwnerRegistrationTab = () => {
    const [ownerForm] = Form.useForm();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [storeCoords, setStoreCoords] = useState({ latitude: null, longitude: null });
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:1200px)');
    const setupUserDataByToken = useSetupUserDataByToken();
    const geocoder = kakao?.maps?.services ? new kakao.maps.services.Geocoder() : null;

    const getAddressCoords = (address) => {
        if (!geocoder) {
            return Promise.reject(new Error('geocoder-not-ready'));
        }

        return new Promise((resolve, reject) => {
            geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    resolve({
                        latitude: Number(result[0].y),
                        longitude: Number(result[0].x),
                    });
                } else {
                    reject(new Error('geocoder-failed'));
                }
            });
        });
    };

    const handleAddressComplete = async (data) => {
        const selectedAddress = data.roadAddress || data.jibunAddress || data.address;

        ownerForm.setFieldsValue({
            address: selectedAddress,
        });

        try {
            const coords = await getAddressCoords(selectedAddress);
            setStoreCoords(coords);
        } catch (error) {
            setStoreCoords({ latitude: null, longitude: null });
        }

        setIsAddressModalOpen(false);
    };

    const handleOwnerSubmit = async (values) => {
        if (!storeCoords.latitude || !storeCoords.longitude) {
            await Swal.fire({
                icon: 'warning',
                title: '주소 확인 필요',
                text: '주소를 다시 선택해 주세요.',
                confirmButtonText: '확인',
            });
            return;
        }

        const payload = {
            businessName: values.businessName,
            branchName: values.branchName,
            businessNumber: values.businessNumber,
            address: values.address,
            addressDetail: values.addressDetail,
            description: values.description,
            storeNumberList: values.storeNumberList,
            latitude: storeCoords.latitude,
            longitude: storeCoords.longitude,
        };

        const confirmResult = await Swal.fire({
            icon: 'question',
            title: '업체를 등록할까요?',
            text: '입력한 정보로 업체를 등록하고 사업자 화면으로 이동합니다.',
            showCancelButton: true,
            confirmButtonText: '등록',
            cancelButtonText: '취소',
            reverseButtons: true,
        });

        if (!confirmResult.isConfirmed) {
            return;
        }

        try {
            const response = await registerStore(payload);
            const issuedToken = response?.data?.result?.token;

            if (issuedToken) {
                localStorage.setItem('moyeobangToken', issuedToken);
            }

            localStorage.setItem('moyeobangPreferredRoleType', ROLETYPE.OWNER);
            setupUserDataByToken();

            await Swal.fire({
                icon: 'success',
                title: '업체 등록 완료',
                text: '업체가 정상적으로 등록되었습니다.',
                confirmButtonText: '확인',
            });

            ownerForm.resetFields();
            ownerForm.setFieldsValue({ storeNumberList: [{ storeNumber: '' }] });
            setStoreCoords({ latitude: null, longitude: null });
            navigate('/');
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: '업체 등록 실패',
                text: error?.response?.data?.result?.message || '잠시 후 다시 시도해주세요.',
                confirmButtonText: '확인',
            });
        }
    };

    return (
        <>
            <SectionTitle>업체 등록</SectionTitle>
            <OwnerFormHint>기본 정보만 먼저 입력해도 저장할 수 있도록 구성했습니다.</OwnerFormHint>
            <OwnerForm
                form={ownerForm}
                layout={'vertical'}
                onFinish={handleOwnerSubmit}
                initialValues={{
                    businessName: '',
                    branchName: '',
                    businessNumber: '',
                    storeNumberList: [{ storeNumber: '' }],
                    address: '',
                    addressDetail: '',
                    description: '',
                }}
            >
                <OwnerFormGrid>
                    <OwnerFormItem
                        name={'businessName'}
                        label={'업체명'}
                        rules={[{ required: true, message: '업체명을 입력해주세요.' }]}
                    >
                        <OwnerInput placeholder={'업체명을 입력해주세요'} maxLength={30} />
                    </OwnerFormItem>

                    <OwnerFormItem
                        name={'branchName'}
                        label={'지점명'}
                    >
                        <OwnerInput placeholder={'예: 강남점'} maxLength={30} />
                    </OwnerFormItem>

                    <OwnerFormItem
                        name={'businessNumber'}
                        label={'사업자번호'}
                        getValueFromEvent={(e) => business.normalize(e?.target?.value || '')}
                        getValueProps={(value) => ({ value: business.format(value || '') })}
                        rules={[
                            { required: true, message: '사업자번호를 입력해주세요.' },
                            { pattern: /^[0-9]{10}$/, message: '사업자번호 10자리를 입력해주세요.' },
                        ]}
                    >
                        <OwnerInput placeholder={'숫자만 입력해주세요'} maxLength={12} inputMode={'numeric'} />
                    </OwnerFormItem>

                    <FullWidthFormItem label={'연락처'} required>
                        <Form.List
                            name={'storeNumberList'}
                            rules={[
                                {
                                    validator: async (_, value) => {
                                        if (!value || value.length === 0) {
                                            throw new Error('연락처를 1개 이상 입력해주세요.');
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <ContactListWrap>
                                    {fields.map((field) => (
                                        <ContactRow key={field.key}>
                                            <ContactInputItem
                                                name={[field.name, 'storeNumber']}
                                                getValueFromEvent={(e) => phone.normalize(e?.target?.value || '')}
                                                getValueProps={(value) => ({ value: phone.format(value || '') })}
                                                rules={[
                                                    { required: true, message: '연락처를 입력해주세요.' },
                                                    {
                                                        pattern: /^(010\d{8}|01[16789]\d{7,8})$/,
                                                        message: '올바른 연락처를 입력해주세요.',
                                                    },
                                                ]}
                                            >
                                                <OwnerInput
                                                    placeholder={'전화번호 숫자만 입력해주세요'}
                                                    maxLength={13}
                                                    inputMode={'numeric'}
                                                />
                                            </ContactInputItem>

                                            <ContactActionButton
                                                type={'default'}
                                                onClick={() => remove(field.name)}
                                                disabled={fields.length === 1}
                                            >
                                                삭제
                                            </ContactActionButton>
                                        </ContactRow>
                                    ))}

                                    <ContactActionButton
                                        type={'dashed'}
                                        onClick={() => add({ storeNumber: '' })}
                                    >
                                        연락처 추가
                                    </ContactActionButton>

                                    <Form.ErrorList errors={errors} />
                                </ContactListWrap>
                            )}
                        </Form.List>
                    </FullWidthFormItem>

                    <FullWidthFormItem
                        name={'address'}
                        label={'주소'}
                        rules={[{ required: true, message: '주소를 입력해주세요.' }]}
                    >
                        <AddressSearchInput
                            placeholder={'클릭해서 주소를 검색하세요'}
                            onClick={() => setIsAddressModalOpen(true)}
                            readOnly
                        />
                    </FullWidthFormItem>

                    <FullWidthFormItem
                        name={'addressDetail'}
                        label={'상세주소'}
                        rules={[{ required: true, message: '상세주소를 입력해주세요.' }]}
                    >
                        <OwnerInput placeholder={'상세주소를 입력해주세요'} maxLength={80} />
                    </FullWidthFormItem>

                    <FullWidthFormItem
                        name={'description'}
                        label={'업체 소개'}
                    >
                        <OwnerTextArea placeholder={'고객에게 보여줄 업체 소개를 입력해주세요'} rows={4} maxLength={500} showCount />
                    </FullWidthFormItem>

                    <FullWidthFormItem style={{ marginTop: 4, marginBottom: 0 }}>
                        <OwnerSubmitButton type={'primary'} htmlType={'submit'}>
                            업체 등록하기
                        </OwnerSubmitButton>
                    </FullWidthFormItem>
                </OwnerFormGrid>
            </OwnerForm>

            <Modal
                title={'주소 검색'}
                open={isAddressModalOpen}
                onOk={() => setIsAddressModalOpen(false)}
                onCancel={() => setIsAddressModalOpen(false)}
                maskClosable={false}
                width={760}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                destroyOnClose
            >
                <DaumPostcode onComplete={handleAddressComplete} style={{ height: isMobile ? '460px' : '800px' }} />
            </Modal>
        </>
    );
};

export default OwnerRegistrationTab;
