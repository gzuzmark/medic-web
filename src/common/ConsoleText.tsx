import styled from 'styled-components';
import ConsoleColor from './ConsoleColor';

const defaultFont = 'Lato, sans-serif';
const titleFont = 'CircularStd, Helvetica, Arial';

const getTextColor = (key = 'textNormal') => {
    let color ='';
    if (ConsoleColor.TEXT_COLORS[key]) {
        color = ConsoleColor.TEXT_COLORS[key];
    } else {
        throw Error("El color no existe " + key);
    }
    return color;
};

export const Title1 = styled.h1`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 28px;
  font-style: normal;
  font-weight: bold;
  line-height: 40px;
`;

export const Title2 = styled.h2`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 32px;
`;

export const Title3 = styled.h3`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: 32px;
`;

export const SubTitle1 = styled.h4`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const SubTitle2 = styled.h5`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const SubTitleBold2 = styled.h5`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 18px;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
`;

export const Text1 = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const TextBold1 = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 18px;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
`;

export const Text2 = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const TextBold3 = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
`;

export const Text3 = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const SmallText1 = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const SmallText2 = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
`;

export const Heading1 = styled.h1`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;

`;

export const Heading2 = styled.h2`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const Heading3 = styled.h3`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const Text = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const HighlightTextHeading1 = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
`;

export const HighlightText = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
`;

export const BoldText = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;