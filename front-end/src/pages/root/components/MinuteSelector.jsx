import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import "../../../css/theme-colors.css";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 12px;
    border-radius: 14px;
    background: linear-gradient(180deg, var(--color-white) 0%, var(--color-blue-060) 100%);
    border: 1px solid var(--color-border-input);
    box-shadow: 0 10px 18px var(--color-rgba-card-shadow);
    
    @media (max-width: 1200px) {
        padding: 10px;
    }

    ${props =>
            props.disabled &&
            css`
                filter: grayscale(0.2) brightness(0.92);
                background-color: var(--color-white);
                box-shadow: none;
                pointer-events: none;
            `
    }
`;

const ClockRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
`;

const ClockFace = styled.div`
    position: relative;
    width: 132px;
    height: 132px;
    border-radius: 50%;
    background:
        radial-gradient(circle at 35% 30%, var(--color-white), var(--color-blue-100));
    border: 1px solid var(--color-border-input);
    box-shadow: inset 0 0 0 6px rgba(255, 255, 255, 0.55), 0 8px 16px var(--color-rgba-card-shadow);
`;

const Tick = styled.span`
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${props => (props.major ? '2px' : '1px')};
    height: ${props => (props.major ? '11px' : '7px')};
    background: ${props => (props.major ? 'var(--color-gray-600)' : 'var(--color-gray-500)')};
    transform: translate(-50%, -50%) rotate(${props => props.deg}deg) translateY(-56px);
    transform-origin: center center;
`;

const ClockHand = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3px;
    height: 43px;
    border-radius: 999px;
    background: linear-gradient(180deg, var(--color-blue-650), var(--color-blue-900));
    transform: translate(-50%, -100%) rotate(${props => props.rotation}deg);
    transform-origin: bottom center;
    transition: transform 0.2s ease;
`;

const ClockCenterDot = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-blue-700);
    transform: translate(-50%, -50%);
`;

const ArrowButton = styled.button`
    background: linear-gradient(135deg, var(--color-blue-650) 0%, var(--color-blue-500) 100%);
    color: var(--color-white);
    border: none;
    border-radius: 999px;
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;

    &:hover {
        background: linear-gradient(135deg, var(--color-blue-900) 0%, var(--color-blue-600) 100%);
    }

    &:disabled {
        background: #d1d5db;
        color: var(--color-gray-700);
        cursor: not-allowed;
    }
`;

const TimeDisplay = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    min-width: 74px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    border: 1px solid var(--color-border-input);
    background: var(--color-white);
    transform: translate(-50%, -50%);
    font-size: 13px;
    font-weight: 700;
    color: var(--color-gray-900);
`;

const PresetRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    width: 100%;
`;

const PresetButton = styled.button`
    min-width: 48px;
    height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    border: 1px solid ${props => (props.active ? 'transparent' : 'var(--color-border-input)')};
    background: ${props => (props.active
        ? 'linear-gradient(135deg, var(--color-blue-650) 0%, var(--color-blue-500) 100%)'
        : 'var(--color-white)')};
    color: ${props => (props.active ? 'var(--color-white)' : 'var(--color-gray-600)')};
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;

    &:hover {
        border-color: ${props => (props.active ? 'transparent' : 'var(--color-blue-450)')};
        color: ${props => (props.active ? 'var(--color-white)' : 'var(--color-blue-850)')};
    }
`;

const FooterRow = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const ResetButton = styled.button`
    border: none;
    background: transparent;
    color: var(--color-gray-500);
    font-size: 12px;
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;

    &:hover {
        color: var(--color-blue-850);
    }
`;

const MinuteSelector = ({value, onChange, disabled}) => {
    const [minutes, setMinutes] = useState(value || 60);
    const presets = [45, 60, 75, 90];

    useEffect(() => {
        if (typeof value === 'number' && value !== minutes) {
            setMinutes(value);
        }
    }, [value]);

    const incrementMinutes = () => {
        const m = Math.min(minutes + 5, 600);
        setMinutes(m);
        onChange && onChange(m);
    };

    const decrementMinutes = () => {
        const m = Math.max(minutes - 5, 5);
        setMinutes(m);
        onChange && onChange(m);
    };

    const applyPreset = (next) => {
        setMinutes(next);
        onChange && onChange(next);
    };

    const resetMinutes = () => {
        setMinutes(60);
        onChange && onChange(60);
    };

    const handRotation = ((minutes % 60) / 60) * 360;

    return (
        <Container disabled={disabled}>
            <ClockRow>
                <ArrowButton type={'button'} onClick={decrementMinutes} disabled={minutes <= 5}>−</ArrowButton>

                <ClockFace>
                    {Array.from({length: 12}, (_, i) => (
                        <Tick key={i} deg={i * 30} major />
                    ))}
                    {Array.from({length: 12}, (_, i) => (
                        <Tick key={`minor-${i}`} deg={i * 30 + 15} />
                    ))}
                    <ClockHand rotation={handRotation} />
                    <ClockCenterDot />
                    <TimeDisplay>{minutes}분</TimeDisplay>
                </ClockFace>

                <ArrowButton type={'button'} onClick={incrementMinutes} disabled={minutes >= 600}>+</ArrowButton>
            </ClockRow>

            <PresetRow>
                {presets.map((preset) => (
                    <PresetButton
                        key={preset}
                        type={'button'}
                        active={minutes === preset}
                        onClick={() => applyPreset(preset)}
                    >
                        {preset}분
                    </PresetButton>
                ))}
            </PresetRow>

            <FooterRow>
                <ResetButton type={'button'} onClick={resetMinutes}>기본값(60분)으로 초기화</ResetButton>
            </FooterRow>
        </Container>
    );
};

export default MinuteSelector;