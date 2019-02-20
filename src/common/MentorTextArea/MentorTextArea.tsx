import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import styled from "styled-components";
import Icon from "../Icon/Icon";
import colors, {FONTS} from "../MentorColor";
import {Body1, defaultFont, LIGHT_TEXT } from "../MentorText";

export interface IPropsMentorTextArea {
    label?: string;
    info?: string;
    limit?: number;
    attrs?: any;
}

const TextArea: React.SFC<any> = props =>
    <textarea className={props.className} maxLength={2000} {...props.attrs}>{props.children}</textarea>;

export const TextAreaComponent = styled(TextArea)`
   border: 1px solid ${(props: any) => {
       let border = colors.MISC_COLORS.background_grey_2;
       if(props.error) {
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
   &:focus {
      background: ${colors.BACKGROUND_COLORS.background_white};
      border: 1px solid ${(props: any) => {
        let border = colors.MISC_COLORS.dark;
        if(props.error) {
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
        const hasError = this.props.limit && value.length > this.props.limit;
        return (
            <div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {!!this.props.label &&
                    <label>
                        <Body1 style={{marginBottom: 3, display: 'block'}}>{this.props.label}</Body1>
                    </label>}
                    {!!this.props.info &&
                        <React.Fragment>
                            <ReactTooltip effect={"solid"} place={"top"} multiline={true}/>
                            <Icon name={"alert"}
                                  attr={{"data-tip": this.props.info}}
                                  style={{
                                      cursor: 'pointer',
                                      fill: colors.BACKGROUND_COLORS.background_purple,
                                      height: 24,
                                      width: 24
                                  }}/>
                        </React.Fragment>
                    }
                </div>
                <TextAreaComponent error={hasError} attrs={{...this.props.attrs}} />
                {!!this.props.limit &&
                <div className={"MentorTextArea_limit"} style={{textAlign: 'right'}}>
                    <Body1 weight={LIGHT_TEXT} color={value.length > this.props.limit ? FONTS.error : ''}>
                        {`${value.length}/${this.props.limit}`}
                    </Body1>
                </div>}
            </div>
        );
    }
}


export default MentorTextArea;
