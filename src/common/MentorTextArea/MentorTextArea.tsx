import * as React from 'react';
import styled from "styled-components";
import FormLabel from "../FormLabel/FormLabel";
import colors, { FONTS } from "../MentorColor";
import { Body1, defaultFont, LIGHT_TEXT, Small1 } from "../MentorText";

export interface IPropsMentorTextArea {
    label?: string;
    info?: string;
    limit?: number;
    disabled?: boolean;
    attrs?: any;
    error?: string;
    styleContainer?: React.CSSProperties;
}

const TextArea: React.SFC<any> = props =>
    <textarea className={props.className} {...props.attrs}>{props.children}</textarea>;

export const TextAreaComponent = styled(TextArea)`
   border: 1px solid ${(props: any) => {
        let border = colors.MISC_COLORS.background_grey_2;
        if (props.error) {
            border = colors.TEXT_COLORS.font_error;
        }
        return border;
    }};
   border-radius: 4px;
   background: transparent;
   color: ${colors.TEXT_COLORS.font_dark};
   font-family: ${defaultFont};
   font-size: 14px;
   font-style: normal;
   font-weight: ${LIGHT_TEXT};
   line-height: 20px;
   height: 64px;
   padding: 11px 20px;
   resize: none;
   width: 100%;    
   &[disabled] {
       border: solid 1px ${colors.BACKGROUND_COLORS.background_disabled};
       color: ${colors.TEXT_COLORS.font_disabled};
       &::-webkit-input-placeholder {color: ${colors.BACKGROUND_COLORS.background_disabled};transition: color 0.2s ease-in;}
       &:-moz-placeholder           {color: ${colors.BACKGROUND_COLORS.background_disabled}: color 0.2s ease-in;}
       &::-moz-placeholder          {color: ${colors.BACKGROUND_COLORS.background_disabled}: color 0.2s ease-in;}
       &:-ms-input-placeholder      {color: ${colors.BACKGROUND_COLORS.background_disabled}: color 0.2s ease-in;}
   }
   &:focus {
      background: ${colors.BACKGROUND_COLORS.background_white};
      border: 1px solid ${(props: any) => {
        let border = colors.MISC_COLORS.dark;
        if (props.error) {
            border = colors.TEXT_COLORS.font_error;
        }
        return border;
    }};
   }
`;

class MentorTextArea extends React.Component<IPropsMentorTextArea, {}> {
    public static defaultProps = {
        disabled: false
    };

    constructor(props: IPropsMentorTextArea) {
        super(props);
        this.state = {
            focus: false
        };
    }

    public render() {
        const value = this.props.attrs && this.props.attrs.value || "";
        let attrs = this.props.attrs;
        const hasError = this.props.limit && value.length > this.props.limit || !!this.props.error;
        let color = hasError ? FONTS.error : '';
        if (!!this.props.disabled) {
            attrs = { ...attrs, disabled: true };
            color = FONTS.disabled;
        }
        return (
            <div style={this.props.styleContainer}>
                {this.props.label && <FormLabel label={this.props.label} info={this.props.info} />}
                <TextAreaComponent error={hasError} attrs={{ ...attrs }} />
                {!!this.props.error &&
                    <div className={'MentorTextArea_message'}><Small1 weight={LIGHT_TEXT} color='font_error'>{this.props.error}</Small1></div>}
                {!!this.props.limit &&
                    <div className={"MentorTextArea_limit"} style={{ textAlign: 'right' }}>
                        <Body1 weight={LIGHT_TEXT} color={color}>
                            {`${value.length}/${this.props.limit}`}
                        </Body1>
                    </div>}
            </div>
        );
    }
}


export default MentorTextArea;
