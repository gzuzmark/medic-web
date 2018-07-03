import styled from 'styled-components';
import ConsoleColor from './ConsoleColor';

const defaultFont = 'Lato, sans-serif';
const titleFont = 'CircularStd, Helvetica, Arial';

const getTextColor = (key = 'textNormal') => {
    return ConsoleColor.TEXT_COLORS[key];
};

export const Heading1 = styled.h1`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px;

`;

export const Heading2 = styled.h2`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
`;

export const Heading3 = styled.h3`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

export const Heading4 = styled.h4`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

export const Heading5 = styled.h5`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
`;

export const Heading6 = styled.h6`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 11px;
`;

export const Text = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const HighlightText = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;

export const BoldText = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
`;