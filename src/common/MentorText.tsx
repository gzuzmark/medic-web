import styled from 'styled-components';
import MentorColor from './MentorColor';

export const defaultFont = 'Lato, sans-serif';

const getTextColor = (key: string) => {
    let color ='';
    if (key === 'primary') {
        color = MentorColor.TEXT_COLORS.font_dark;
    } else if(!!key) {
        color = MentorColor.TEXT_COLORS[key];
    } else {
        throw Error("El color no existe " + key);
    }
    return color;
};

interface IMentorTextProps {
    color?: string;
    weight?: string;
}

export const LIGHT_TEXT = '300';
export const BLACK_WEIGHT = '900';
export const DEFAULT_WEIGHT = '700';

export const COLOR_PRIMARY = 'primary';

export const Display1 = styled.span`
  color: ${(props: IMentorTextProps) => {
      const color = props.color || COLOR_PRIMARY;
      return getTextColor(color);
    }};
  font-family: ${defaultFont};
  font-size: 48px;
  font-style: normal;
  font-weight: ${(props: IMentorTextProps) => props.weight && LIGHT_TEXT || BLACK_WEIGHT};
  line-height: 64px;
`;

export const Display2 = styled.span`
  color: ${(props) => {
    const color = props.color || COLOR_PRIMARY;
    return getTextColor(color);
}};
  font-family: ${defaultFont};
  font-size: 40px;
  font-style: normal;
  font-weight: ${(props: IMentorTextProps) => props.weight && LIGHT_TEXT || BLACK_WEIGHT};
  line-height: 56px;
`;

export const Headline1 = styled.h1`
  color: ${(props) => {
    const color = props.color || COLOR_PRIMARY;
    return getTextColor(color);
}};
  font-family: ${defaultFont};
  font-size: 24px;
  font-style: normal;
  font-weight: ${(props: IMentorTextProps) => props.weight && LIGHT_TEXT || BLACK_WEIGHT};
  line-height: 32px;
`;

export const Heading2 = styled.h2`
  color: ${(props) => {
    const color = props.color || COLOR_PRIMARY;
    return getTextColor(color);
}};
  font-family: ${defaultFont};
  font-size: 20px;
  font-style: normal;
  font-weight: ${(props: IMentorTextProps) => props.weight && LIGHT_TEXT || BLACK_WEIGHT};
  line-height: 32px;
`;


export const Heading3 = styled.h3`
  color: ${(props) => {
    const color = props.color || COLOR_PRIMARY;
    return getTextColor(color);
}};
  font-family: ${defaultFont};
  font-size: 18px;
  font-style: normal;
  font-weight: ${(props: IMentorTextProps) => props.weight && LIGHT_TEXT || DEFAULT_WEIGHT};
  line-height: 28px;
`;

export const Subhead1 = styled.h4`
  color: ${(props) => {
    const color = props.color || COLOR_PRIMARY;
    return getTextColor(color);
}};
  font-family: ${defaultFont};
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props: IMentorTextProps) => props.weight && LIGHT_TEXT || BLACK_WEIGHT};
  line-height: 24px;
`;

export const Body1 = styled.span`
  color: ${(props) => {
    const color = props.color || COLOR_PRIMARY;
    return getTextColor(color);
}};
  font-family: ${defaultFont};
  font-size: 14px;
  font-style: normal;
  font-weight: ${(props: IMentorTextProps) => props.weight && LIGHT_TEXT || DEFAULT_WEIGHT};
  line-height: 20px;
`;

export const Small1 = styled.span`
  color: ${(props) => {
    const color = props.color || COLOR_PRIMARY;
    return getTextColor(color);
}};
  font-family: ${defaultFont};
  font-size: 11px;
  font-style: normal;
  font-weight: ${(props: IMentorTextProps) => props.weight && LIGHT_TEXT || DEFAULT_WEIGHT};
  line-height: 16px;
`;

export const Small2 = styled.span`
  color: ${(props) => {
    const color = props.color || COLOR_PRIMARY;
    return getTextColor(color);
}};
  font-family: ${defaultFont};
  font-size: 12px;
  font-style: normal;
  font-weight: ${(props: IMentorTextProps) => props.weight && LIGHT_TEXT || DEFAULT_WEIGHT};
  line-height: 16px;
`;

export const Small3 = styled.span`
  color: ${(props) => {
    const color = props.color || COLOR_PRIMARY;
    return getTextColor(color);
}};
  font-family: ${defaultFont};
  font-size: 10px;
  font-style: normal;
  font-weight: ${(props: IMentorTextProps) => props.weight && LIGHT_TEXT || DEFAULT_WEIGHT};
  line-height: 14px;
`;
