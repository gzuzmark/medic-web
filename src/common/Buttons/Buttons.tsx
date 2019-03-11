import * as React from 'react';
import styled from "styled-components";
import colors from "../MentorColor";
import { Body1 } from '../MentorText';

export interface IButtonProps {
    text?: string;
    type?: string;
    size?: string;
    disabled?: string;
    loading?: string;
    attrs?: any;
    className?: string;
    link?: boolean;
}

export interface IButtonSizesAttr {
    height: string;
}

export interface IButtonSizes {
    small: IButtonSizesAttr;
    medium: IButtonSizesAttr;
    large: IButtonSizesAttr;
}

const sizes: IButtonSizes = {
    large: {
        height: '48px',
    },
    medium: {
        height: '40px',
    },
    small: {
        height: '32px',
    }
};

const getHeight = (props: IButtonProps) => {
    const key = !!props.size ? props.size : 'medium';
    let height = '';
    if (!!sizes[key] && sizes[key].height) {
        height = sizes[key].height;
    } else {
        throw Error("El size no existe " + key);
    }
    return height;
};

const getFont = (text?: string) => {
    return <Body1>{text}</Body1>
};

const buildTheme = (inverse: boolean, color1: string, color2: string) => {
    return {
        primary: inverse ? color2 : color1,
        secondary: inverse ? color1 : color2
    };
};

export const THEME_PRIMARY = 'primary';
export const THEME_SECONDARY = 'secondary';
const INVERSE_COLORS = true;

const colorActive = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const {background_white} = colors.BACKGROUND_COLORS;
    const {dark_purple} = colors.MISC_COLORS;
    const theme = buildTheme(inverse, dark_purple, background_white);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const colorDefault = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const {background_white, background_purple} = colors.BACKGROUND_COLORS;
    const theme = buildTheme(inverse, background_purple, background_white);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const colorDisabled = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const {background_white, background_disabled} = colors.BACKGROUND_COLORS;
    const theme = buildTheme(inverse, background_disabled, background_white);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const colorHover = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const {background_white} = colors.BACKGROUND_COLORS;
    const {light_purple} = colors.MISC_COLORS;
    const theme = buildTheme(inverse, light_purple, background_white);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const fontDisabled = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const {background_white} = colors.BACKGROUND_COLORS;
    const {font_disabled} = colors.TEXT_COLORS;
    const theme = buildTheme(inverse, background_white, font_disabled);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const buttonTheme = {
    colorActive,
    colorDefault,
    colorDisabled,
    colorHover,
    fontDisabled
};

const Button: React.FC<IButtonProps> = props => {
    let element = <button className={props.className} {...props.attrs}>{getFont(props.text)}</button>;
    if (!!props.link) {
        element = <a className={props.className} {...props.attrs}>{getFont(props.text)}</a>;
    }
    return element;
};


const Link: React.FC<IButtonProps> = props =>
    <a className={props.className} {...props.attrs}>{getFont(props.text)}</a>;

const ButtonNormal = styled(Button)`
  @properties disabled, loading;
  align-items: center;
  border: 1px solid ${colors.BACKGROUND_COLORS.background_purple};
  background: ${(props: IButtonProps) => buttonTheme.colorDefault(props, !INVERSE_COLORS)};
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  min-height: ${getHeight};
  justify-content: center;
  padding: 0 16px;
  transition-property: background, border, color;
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
  ${Body1} {
    color: ${(props: IButtonProps) => buttonTheme.colorDefault(props, INVERSE_COLORS)};
  }
  &:hover:not([loading]) {
    border: 1px solid ${colors.MISC_COLORS.light_purple};
    background: ${(props: IButtonProps) => buttonTheme.colorHover(props, !INVERSE_COLORS)};
    ${Body1} {
      color: ${(props: IButtonProps) => buttonTheme.colorHover(props, INVERSE_COLORS)};
    }
  }
  &:active:not([loading]) {
    border: 1px solid ${colors.MISC_COLORS.dark_purple};
    background: ${(props: IButtonProps) => buttonTheme.colorActive(props, !INVERSE_COLORS)};
    ${Body1} {
      color: ${(props: IButtonProps) => buttonTheme.colorActive(props, INVERSE_COLORS)};
    }
  }
  &[disabled] {
    border: 1px solid ${colors.BACKGROUND_COLORS.background_disabled}!important;
    background: ${(props: IButtonProps) => buttonTheme.colorDisabled(props, !INVERSE_COLORS)}!important;
    cursor: default;
    ${Body1} {
      color: ${(props: IButtonProps) => buttonTheme.fontDisabled(props, !INVERSE_COLORS)}!important;
    }
  }
  &[loading] {
    text-indent: -9999px;
    white-space: nowrap;
    overflow: hidden;
    &:before {
      color: ${(props: IButtonProps) => props.type === THEME_SECONDARY ?
    colors.BACKGROUND_COLORS.background_purple: colors.BACKGROUND_COLORS.background_white};
      display: block;
      filter: progid:DXImageTransform.Microsoft.Alpha(enabled=false);
      margin: 0 auto;
      opacity: 1;
    }
  }
  &:before {
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: rotate;
    animation-timing-function: linear;
    border: 4px solid;
    border-left-color: transparent;
    border-radius: 50%;
    content: '';
    display: none;
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
    height: 20px;
    opacity: 0;
    width: 20px;
  }
`;


const ButtonLink = styled(Link)`
  align-items: center;
  background: white;
  border: 0;
  cursor: pointer;
  display: flex;
  min-height: ${getHeight};
  justify-content: center;
  padding: 0 16px;
  text-decoration: none;
  transition-property: background, border, color;
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
  ${Body1} {
    color: ${(props: IButtonProps) => buttonTheme.colorDefault(props, !INVERSE_COLORS)};
  }
  &:hover {
    ${Body1} {
      color: ${(props: IButtonProps) => buttonTheme.colorHover(props, !INVERSE_COLORS)};
    }
  }
  &:active {
    ${Body1} {
      color: ${(props: IButtonProps) => buttonTheme.colorActive(props, !INVERSE_COLORS)};
    }
  }
  &[disabled] {
    ${Body1} {
      color: ${(props: IButtonProps) => buttonTheme.fontDisabled(props, INVERSE_COLORS)}!important;
    }
  }
`;


export {
    ButtonLink,
    ButtonNormal
};
