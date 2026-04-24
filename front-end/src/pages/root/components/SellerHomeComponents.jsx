import styled from "styled-components";
import PropTypes from "prop-types";
import Title from "antd/lib/typography/Title";
import {Button, Form, Input, Rate, Select} from "antd";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 1200px) {
        width: 100%;
    }
`
//940px

export const PageShell = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${props => props.shellGap ? props.shellGap : '28px'};
    padding: ${props => props.shellPadding ? props.shellPadding : '0 4px 32px'};
`

PageShell.propTypes = {
    shellGap: PropTypes.string,
    shellPadding: PropTypes.string,
}

export const FormContainer = styled(Form)`
    margin-left: ${props => props.marginLeft ? props.marginLeft : '20px'};
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    
    @media (max-width: 1200px) {
        margin-left: 0;
    }
`

export const ParagraphDiv = styled.div`
        width: ${props => props.width ? props.width : '100%'};
        display: flex;
        flex-direction: row;
    
    @media (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
    }
`
ParagraphDiv.propTypes = {
    width: PropTypes.string,
    marginLeft: PropTypes.string,
}

export const RequiredSpan = styled.span`
    display: inline-block;
    width: 14px;
    color: red;
    margin-right: 4px;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    flex-shrink: 0;
`

export const TitleDiv = styled(Title)`
    width: ${props => props.width ? props.width : '110px'};
    text-align: left;

    @media (max-width: 1200px) {
        width: 100%;
        text-align: center;
    }
`

TitleDiv.propTypes = {
    width: PropTypes.string,
}

export const HeroBadge = styled.div`
    display: inline-flex;
    align-items: center;
    padding: ${props => props.badgePadding ? props.badgePadding : '8px 12px'};
    border-radius: 999px;
    background: var(--color-rgba-badge-bg);
    color: var(--color-blue-800);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`

HeroBadge.propTypes = {
    badgePadding: PropTypes.string,
}

export const HeroCard = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    padding: ${props => props.heroPadding ? props.heroPadding : '26px 30px'};
    background:
        radial-gradient(
            circle at top right,
            var(--color-rgba-brand-radial),
            transparent ${props => props.radialFade ? props.radialFade : '34%'}
        ),
        linear-gradient(
            135deg,
            var(--color-blue-100) 0%,
            var(--color-blue-070) ${props => props.gradientMiddle ? props.gradientMiddle : '50%'},
            var(--color-blue-100) 100%
        );
    border: 1px solid var(--color-rgba-brand-border);
    box-shadow: 0 18px 40px var(--color-rgba-brand-shadow);

    @media (max-width: 1200px) {
        padding: ${props => props.heroMobilePadding ? props.heroMobilePadding : '22px 18px'};
        border-radius: 22px;
    }
`

HeroCard.propTypes = {
    heroPadding: PropTypes.string,
    heroMobilePadding: PropTypes.string,
    radialFade: PropTypes.string,
    gradientMiddle: PropTypes.string,
}

export const HeroTitle = styled.h2`
    margin: 12px 0 8px;
    color: var(--color-gray-900);
    font-size: 32px;
    line-height: 1.2;

    @media (max-width: 1200px) {
        font-size: 26px;
    }
`

export const HeroDescription = styled.p`
    max-width: ${props => props.maxWidth ? props.maxWidth : '820px'};
    margin: 0;
    color: var(--color-gray-700);
    line-height: 1.7;
    font-size: ${props => props.fontSize ? props.fontSize : '15px'};
`

HeroDescription.propTypes = {
    maxWidth: PropTypes.string,
    fontSize: PropTypes.string,
}

export const SurfaceCard = styled.div`
    border-radius: ${props => props.cardRadius ? props.cardRadius : '28px'};
    padding: ${props => props.cardPadding ? props.cardPadding : '28px'};
    background: var(--color-white);
    border: 1px solid var(--color-rgba-card-border);
    box-shadow: ${props => props.cardShadow ? props.cardShadow : '0 18px 40px var(--color-rgba-card-shadow)'};

    @media (max-width: 1200px) {
        padding: ${props => props.cardMobilePadding ? props.cardMobilePadding : '20px 16px'};
        border-radius: ${props => props.cardMobileRadius ? props.cardMobileRadius : '22px'};
    }
`

SurfaceCard.propTypes = {
    cardRadius: PropTypes.string,
    cardPadding: PropTypes.string,
    cardShadow: PropTypes.string,
    cardMobilePadding: PropTypes.string,
    cardMobileRadius: PropTypes.string,
}

export const StickySidebar = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.sidebarGap ? props.sidebarGap : '20px'};
    position: sticky;
    top: ${props => props.sidebarTop ? props.sidebarTop : '24px'};

    @media (max-width: 1200px) {
        position: static;
    }
`

StickySidebar.propTypes = {
    sidebarGap: PropTypes.string,
    sidebarTop: PropTypes.string,
}

export const InfoCard = styled.div`
    border-radius: ${props => props.cardRadius ? props.cardRadius : '24px'};
    padding: ${props => props.cardPadding ? props.cardPadding : '20px'};
    background: var(--color-white);
    border: 1px solid var(--color-rgba-card-border);
    box-shadow: ${props => props.cardShadow ? props.cardShadow : '0 16px 32px var(--color-rgba-card-shadow)'};
`

InfoCard.propTypes = {
    cardRadius: PropTypes.string,
    cardPadding: PropTypes.string,
    cardShadow: PropTypes.string,
}

export const SectionHeader = styled.div`
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    justify-content: ${props => props.column ? 'flex-start' : 'space-between'};
    align-items: ${props => props.column ? 'flex-start' : 'end'};
    gap: ${props => props.headerGap ? props.headerGap : (props.column ? '8px' : '16px')};
    padding-bottom: 14px;
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0'};
    border-bottom: 1px solid var(--color-rgba-card-shadow);

    @media (max-width: 1200px) {
        flex-direction: column;
        align-items: flex-start;
    }
`

SectionHeader.propTypes = {
    column: PropTypes.bool,
    headerGap: PropTypes.string,
    marginBottom: PropTypes.string,
}

export const SectionTitle = styled.h3`
    margin: 0;
    color: var(--color-gray-900);
    font-size: 22px;
`

export const SectionDescription = styled.p`
    margin: 0;
    color: var(--color-gray-600);
    font-size: 14px;
    line-height: 1.6;
`

export const FormRow = styled(ParagraphDiv)`
    align-items: flex-start;
    gap: 12px;

    @media (max-width: 1200px) {
        gap: 8px;
    }
`

export const FormLabelTitle = styled(TitleDiv)`
    width: ${props => props.labelWidth ? props.labelWidth : '120px'};
    margin: 0;
    padding-top: 10px;
    flex-shrink: 0;
    font-size: 17px;

    @media (max-width: 1200px) {
        width: 100%;
        padding-top: 0;
        text-align: left;
    }
`

FormLabelTitle.propTypes = {
    labelWidth: PropTypes.string,
}

export const FieldHint = styled.div`
    color: var(--color-gray-500);
    font-size: 12px;
    margin-top: ${props => props.hintMarginTop ? props.hintMarginTop : '6px'};
    line-height: 1.5;
`

FieldHint.propTypes = {
    hintMarginTop: PropTypes.string,
}

export const FormInput = styled(Input)`
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
`

export const FormTextArea = styled(Input.TextArea)`
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
`

export const FormSelect = styled(Select)`
    .ant-select-selector {
        height: 46px !important;
        border-radius: 14px !important;
        border-color: var(--color-border-input) !important;
        background: var(--color-blue-060) !important;
        display: flex;
        align-items: center;
    }

    &.ant-select-focused .ant-select-selector,
    &:hover .ant-select-selector {
        border-color: var(--color-blue-450) !important;
        box-shadow: 0 0 0 4px var(--color-rgba-focus-ring) !important;
        background: var(--color-white) !important;
    }
`

export const PreviewLabel = styled.div`
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--color-gray-650);
    text-transform: uppercase;
    margin-bottom: 8px;
`

export const GuideCard = styled.div`
    border-radius: ${props => props.cardRadius ? props.cardRadius : '20px'};
    padding: ${props => props.cardPadding ? props.cardPadding : '18px 18px 16px'};
    background: linear-gradient(135deg, var(--color-blue-900) 0%, var(--color-blue-700) 100%);
    color: var(--color-white);
`

GuideCard.propTypes = {
    cardRadius: PropTypes.string,
    cardPadding: PropTypes.string,
}

export const GuideTitle = styled.div`
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 8px;
`

export const GuideText = styled.p`
    margin: 0;
    line-height: ${props => props.lineHeight ? props.lineHeight : '1.6'};
    font-size: 13px;
    color: var(--color-rgba-helper-text);
`

GuideText.propTypes = {
    lineHeight: PropTypes.string,
}

export const GuideList = styled.div`
    margin: ${props => props.listMargin ? props.listMargin : '14px 0 0'};
    padding-left: ${props => props.listPaddingLeft ? props.listPaddingLeft : '0'};
    display: flex;
    flex-direction: column;
    gap: ${props => props.listGap ? props.listGap : '10px'};
    font-size: 13px;
`

GuideList.propTypes = {
    listMargin: PropTypes.string,
    listPaddingLeft: PropTypes.string,
    listGap: PropTypes.string,
}

export const GuideItem = styled.div`
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 13px;
    line-height: 1.5;
`

export const GuideDot = styled.div`
    width: 8px;
    height: 8px;
    margin-top: 6px;
    border-radius: 50%;
    background: var(--color-white);
    flex-shrink: 0;
`

export const LayoutGrid = styled.div`
    display: grid;
    grid-template-columns: ${props => props.columns ? props.columns : 'minmax(0, 1.1fr) 420px'};
    gap: ${props => props.gridGap ? props.gridGap : '28px'};
    align-items: ${props => props.alignItems ? props.alignItems : 'start'};

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`

LayoutGrid.propTypes = {
    columns: PropTypes.string,
    gridGap: PropTypes.string,
    alignItems: PropTypes.string,
}

export const FormStack = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.stackGap ? props.stackGap : '18px'};
    padding-right: ${props => props.paddingRight ? props.paddingRight : '24px'};

    @media (max-width: 1200px) {
        padding-right: 0;
    }
`

FormStack.propTypes = {
    stackGap: PropTypes.string,
    paddingRight: PropTypes.string,
}

export const FormActionRow = styled.div`
    display: flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-end'};
    padding-top: ${props => props.paddingTop ? props.paddingTop : '6px'};
`

FormActionRow.propTypes = {
    justifyContent: PropTypes.string,
    paddingTop: PropTypes.string,
}

export const GradientSubmitButton = styled(Button)`
    && {
        min-width: ${props => props.$buttonMinWidth ? props.$buttonMinWidth : '120px'};
        height: ${props => props.$buttonHeight ? props.$buttonHeight : '44px'};
        border-radius: 999px;
        font-weight: ${props => props.$buttonWeight ? props.$buttonWeight : '700'};
        background: linear-gradient(135deg, var(--color-blue-650) 0%, var(--color-blue-500) 100%);
        box-shadow: ${props => props.$buttonShadow ? props.$buttonShadow : 'none'};
        border: none;
        color: var(--color-white);
    }

    &&:hover,
    &&:focus {
        background: linear-gradient(135deg, var(--color-blue-900) 0%, var(--color-blue-600) 100%) !important;
        border: none;
        color: var(--color-white);
    }
`

export const ItemDiv = styled(Form.Item)`
    margin: 0;
    width: ${props => props.width ? props.width : '100%'};
    
    @media (max-width: 1200px) {
        width: 100%;
        text-align: center;
    }
`

ItemDiv.propTypes = {
    width: PropTypes.string,
}

export const RateDiv = styled(Rate)`
    line-height: 32px;
    text-align: left;
    font-size: 20px;
    
    color: ${props => props.color ? props.color : '#f8d914'};
    
    @media (max-width: 1200px) {
        text-align: center;
        font-size: 32px;
    }
`

RateDiv.propTypes = {
    color: PropTypes.string,
}


export const SubmitButton = styled(Button)`
    width: 100px;
    height: 40px;
    margin-top: 20px;
    text-align: center;
`
