import * as React from "react";
import styled from "styled-components";
import colors from "../MentorColor";
import { Body1 } from "../MentorText";



export interface IButtonProps {
    text?: string;
    type?: string;
    size?: string;
    disabled?: string;
    loading?: string;
    attrs?: any;
    className?: string;
    link?: boolean;
    icon?: any
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
        height: "48px"
    },
    medium: {
        height: "40px"
    },
    small: {
        height: "32px"
    }
};

const getHeight = (props: IButtonProps) => {
    const key = !!props.size ? props.size : "medium";
    let height = "";
    if (!!sizes[key] && sizes[key].height) {
        height = sizes[key].height;
    } else {
        throw Error("El size no existe " + key);
    }
    return height;
};

const getFont = (text?: string) => {
    return <Body1>{text}</Body1>;
};

const buildTheme = (inverse: boolean, color1: string, color2: string) => {
    return {
        primary: inverse ? color2 : color1,
        secondary: inverse ? color1 : color2
    };
};

export const THEME_PRIMARY = "primary";
export const THEME_SECONDARY = "secondary";
const INVERSE_COLORS = true;

const colorActive = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const {
        background_white,
        background_dark_green
    } = colors.BACKGROUND_COLORS;
    const theme = buildTheme(inverse, background_dark_green, background_white);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const colorDefault = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const { background_white, background_green } = colors.BACKGROUND_COLORS;
    const theme = buildTheme(inverse, background_green, background_white);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const colorSecondary = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const {
        background_white,
        background_light_blue
    } = colors.BACKGROUND_COLORS;
    const theme = buildTheme(inverse, background_light_blue, background_white);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const colorDisabled = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const { background_white, background_disabled } = colors.BACKGROUND_COLORS;
    const theme = buildTheme(inverse, background_disabled, background_white);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const colorHover = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const { background_green, background_white } = colors.BACKGROUND_COLORS;
    const theme = buildTheme(inverse, background_green, background_white);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const fontDisabled = (props: IButtonProps, inverse: boolean) => {
    const type = !!props.type ? props.type : THEME_PRIMARY;
    const { background_white } = colors.BACKGROUND_COLORS;
    const { font_disabled } = colors.TEXT_COLORS;
    const theme = buildTheme(inverse, background_white, font_disabled);
    return type === THEME_PRIMARY ? theme.primary : theme.secondary;
};

const buttonTheme = {
    colorActive,
    colorDefault,
    colorDisabled,
    colorHover,
    colorSecondary,
    fontDisabled
};

const Button: React.FC<IButtonProps> = props => {
    let element = (
        <button className={props.className} {...props.attrs}>
            {getFont(props.text)}
        </button>
    );
    if (!!props.link) {
        element = (
            <a className={props.className} {...props.attrs}>
                {getFont(props.text)}
            </a>
        );
    }
    return element;
};

const Link: React.FC<IButtonProps> = props => (
    <a className={props.className} {...props.attrs}>
        {getFont(props.text)}
    </a>
);

const ButtonNormal = styled(Button)`
    @properties disabled, loading;
    align-items: center;
    border: 1px solid ${colors.BACKGROUND_COLORS.background_green};
    background: ${(props: IButtonProps) =>
        buttonTheme.colorDefault(props, !INVERSE_COLORS)};
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
        color: ${(props: IButtonProps) =>
            buttonTheme.colorDefault(props, INVERSE_COLORS)};
    }
    &:hover:not([loading]) {
        border: 1px solid ${colors.BACKGROUND_COLORS.background_green};
        background: ${(props: IButtonProps) =>
            buttonTheme.colorDefault(props, !INVERSE_COLORS)};
        ${Body1} {
            color: ${(props: IButtonProps) =>
                buttonTheme.colorDefault(props, INVERSE_COLORS)};
        }
    }
    &:active:not([loading]) {
        border: 1px solid ${colors.BACKGROUND_COLORS.background_dark_green};
        background: ${(props: IButtonProps) =>
            buttonTheme.colorActive(props, !INVERSE_COLORS)};
        ${Body1} {
            color: ${(props: IButtonProps) =>
                buttonTheme.colorActive(props, INVERSE_COLORS)};
        }
    }
    &[disabled] {
        border: 1px solid
            ${colors.BACKGROUND_COLORS.background_disabled}!important;
        background: ${(props: IButtonProps) =>
            buttonTheme.colorDisabled(props, !INVERSE_COLORS)}!important;
        cursor: default;
        ${Body1} {
            color: ${(props: IButtonProps) =>
                buttonTheme.fontDisabled(props, !INVERSE_COLORS)}!important;
        }
    }
    &[loading] {
        text-indent: -9999px;
        white-space: nowrap;
        overflow: hidden;
        &:before {
            color: ${(props: IButtonProps) =>
                props.type === THEME_SECONDARY
                    ? colors.BACKGROUND_COLORS.background_green
                    : colors.BACKGROUND_COLORS.background_white};
            display: block;
            filter: progid:DXImageTransform.Microsoft.Alpha(enabled=false);
            margin: 0 auto;
            opacity: 1;
        }
    }
    &:before {        
        content: url(${(props: IButtonProps) =>
          props.icon
              ? props.icon
              : ''});
        display: inline-block;
        font-size: inherit;
        height: 20px
        padding-right: ${(props: IButtonProps) =>
              props.icon
                  ? 14
                  : 0}px;  
        text-rendering: auto;                               
    }
`;

const ButtonSecondary = styled(Button)`
  @properties disabled, loading;
  align-items: center;
  border: 1px solid ${colors.BACKGROUND_COLORS.background_light_blue};
  background: ${(props: IButtonProps) =>
      buttonTheme.colorSecondary(props, !INVERSE_COLORS)};
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  min-height: ${getHeight};
  justify-content: center;
  padding: 0 14px;
  transition-property: background, border, color;
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
  ${Body1} {
    color: ${(props: IButtonProps) =>
        buttonTheme.colorSecondary(props, INVERSE_COLORS)};
  }
  &:hover:not([loading]) {
    border: 1px solid ${colors.BACKGROUND_COLORS.background_light_blue};
    background: ${(props: IButtonProps) =>
        buttonTheme.colorSecondary(props, !INVERSE_COLORS)};
    ${Body1} {
      color: ${(props: IButtonProps) =>
          buttonTheme.colorSecondary(props, INVERSE_COLORS)};
    }
  }
  &:active:not([loading]) {
    border: 1px solid ${colors.BACKGROUND_COLORS.background_light_blue};
    background: ${(props: IButtonProps) =>
        buttonTheme.colorActive(props, !INVERSE_COLORS)};
    ${Body1} {
      color: ${(props: IButtonProps) =>
          buttonTheme.colorActive(props, INVERSE_COLORS)};
    }
  }
  &[disabled] {
    border: 1px solid ${colors.BACKGROUND_COLORS.background_disabled}!important;
    background: ${(props: IButtonProps) =>
        buttonTheme.colorDisabled(props, !INVERSE_COLORS)}!important;
    cursor: default;
    ${Body1} {
      color: ${(props: IButtonProps) =>
          buttonTheme.fontDisabled(props, !INVERSE_COLORS)}!important;
    }
  }
  &[loading] {
    text-indent: -9999px;
    white-space: nowrap;
    overflow: hidden;
    &:before {
      color: ${(props: IButtonProps) =>
          props.type === THEME_SECONDARY
              ? colors.BACKGROUND_COLORS.background_light_blue
              : colors.BACKGROUND_COLORS.background_white};
      display: block;
      filter: progid:DXImageTransform.Microsoft.Alpha(enabled=false);
      margin: 0 auto;
      opacity: 1;
    }
  }
  &:before {   
    content: url(${(props: IButtonProps) =>
          props.icon
              ? props.icon
              : ''});
    display: inline-block;
    font-size: inherit;
    height: 20px
    padding-right: ${(props: IButtonProps) =>
          props.icon
              ? 14
              : 0}px;  
    text-rendering: auto;
}
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
        color: ${(props: IButtonProps) =>
            buttonTheme.colorDefault(props, !INVERSE_COLORS)};
    }
    &:hover {
        ${Body1} {
            color: ${(props: IButtonProps) =>
                buttonTheme.colorHover(props, !INVERSE_COLORS)};
        }
    }
    &:active {
        ${Body1} {
            color: ${(props: IButtonProps) =>
                buttonTheme.colorActive(props, !INVERSE_COLORS)};
        }
    }
    &[disabled] {
        ${Body1} {
            color: ${(props: IButtonProps) =>
                buttonTheme.fontDisabled(props, INVERSE_COLORS)}!important;
        }
    }
`;

export { ButtonLink, ButtonNormal, ButtonSecondary };
