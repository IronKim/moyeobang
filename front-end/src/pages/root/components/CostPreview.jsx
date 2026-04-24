import React from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Typography} from 'antd';
import styled from 'styled-components';
import {InfoCard, PreviewLabel} from './SellerHomeComponents';

const PreviewTitle = styled.h4`
    margin: 0 0 12px;
    color: var(--color-gray-900);
    font-size: 20px;
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

const CostPreview = ({cost = [], costInfo = ''}) => {
    return (
        <InfoCard
            cardRadius={'24px'}
            cardPadding={'20px'}
            cardShadow={'0 16px 32px var(--color-rgba-card-shadow)'}
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
                            cost.some((c) => c?.count || c?.cost) ? (
                                cost.map((c, index) => (
                                    <motion.div
                                        key={index}
                                        layout
                                        initial={{x: -24, opacity: 0}}
                                        animate={{x: 0, opacity: 1}}
                                        exit={{x: 24, opacity: 0}}
                                        transition={{duration: 0.24, ease: 'easeOut'}}
                                    >
                                        <Typography.Paragraph style={{fontSize: '16px', marginBottom: 0, textAlign: 'center'}}>
                                            {c.count} {c.cost}
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
                    {costInfo ? costInfo.split('\n').map((line, index) => (
                        <NoticeLine key={index}>{line}</NoticeLine>
                    )) : null}
                </PricePreviewFooter>
            </PricePreviewCard>
        </InfoCard>
    );
};

export default CostPreview;
