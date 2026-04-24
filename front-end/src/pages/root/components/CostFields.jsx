import React from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Button, Form} from 'antd';
import {TbSquareMinusFilled} from 'react-icons/tb';
import styled from 'styled-components';
import {FormInput, FormLabelTitle, FormRow, FormTextArea, ItemDiv, RequiredSpan} from './SellerHomeComponents';

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

const FieldColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const COST_INFO_PLACEHOLDER = 'ex) 1인은 2인 금액으로 책정됩니다.\n 5인 이상은 별도 문의 바랍니다.';

const CostFields = ({disabled = false, labelWidth = '120px'}) => {
    return (
        <>
            <Form.List name="cost">
                {(fields, {add, remove}) => (
                    <CostListWrap>
                        <AnimatePresence initial={false}>
                            {fields.map(({key, name, ...restField}) => (
                                <CostRow
                                    key={key}
                                    initial={{x: -40, opacity: 0}}
                                    animate={{x: 0, opacity: 1}}
                                    exit={{x: 40, opacity: 0}}
                                    transition={{duration: 0.28, ease: 'easeOut'}}
                                >
                                    <CostRowInner>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'count']}
                                            style={{margin: 0}}
                                        >
                                            <FormInput placeholder="예: 2인, 3인, 4인" disabled={disabled} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'cost']}
                                            style={{margin: 0}}
                                        >
                                            <FormInput placeholder="예: 30,000원" disabled={disabled} />
                                        </Form.Item>
                                        <RemoveButton onClick={() => remove(name)} />
                                    </CostRowInner>
                                </CostRow>
                            ))}
                        </AnimatePresence>
                        <Form.Item style={{margin: 0}}>
                            <AddRowButton
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<div />}
                                disabled={disabled}
                            >
                                가격 행 추가하기
                            </AddRowButton>
                        </Form.Item>
                    </CostListWrap>
                )}
            </Form.List>

            <FormRow>
                <FormLabelTitle labelWidth={labelWidth} level={4}>
                    <RequiredSpan>&nbsp;</RequiredSpan>안내 사항
                </FormLabelTitle>
                <FieldColumn>
                    <ItemDiv name="costInfo" width="100%">
                        <FormTextArea
                            rows={4}
                            placeholder={COST_INFO_PLACEHOLDER}
                            autoSize={true}
                            disabled={disabled}
                        />
                    </ItemDiv>
                </FieldColumn>
            </FormRow>
        </>
    );
};

export default CostFields;
