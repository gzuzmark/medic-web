import * as React from 'react';
import {CSSProperties} from "react";
import styled from "styled-components";
import {Body1, LIGHT_TEXT, Small1} from '../../common/MentorText';
import FormLabel from "../FormLabel/FormLabel";
import Icon from "../Icon/Icon";
import Loader from "../Loader/Loader";
import colors from "../MentorColor";
import './MentorInput.scss';

interface IPropsMentorInput {
    active?: boolean; // active or deactive animation
    icon?: string;
    iconStyles?: CSSProperties;
    enable?: boolean; // disable or enable input
    error?: string;
    loading?: boolean;
    forceFocus?: boolean;
    style?: React.CSSProperties;
    styleContainer?: React.CSSProperties;
    label?: string;
    onClickIcon?: (value: string) => void,
    animation?: {
        enable?: boolean;
        text?: string;
    };
    info?: string;
    attrs?: any;
}

const InputContainer = styled.div`
    @properties disabled, loading;
    height: 40px;
    input {
        border: 0;
        border-radius: 4px;
        display: none;
        font-weight: 300;
        height: 40px;
        left: 0;
        padding: 0 70px 0 16px;
        position: absolute;
        top: 0;
        transition: border 0.2s ease-in;
        width: 100%;
        &[disabled] {
            border: solid 1px ${colors.BACKGROUND_COLORS.background_disabled};
            color: ${colors.TEXT_COLORS.font_disabled};
        }
        &::-webkit-input-placeholder {color: ${colors.TEXT_COLORS.font_blue_grey};transition: color 0.2s ease-in;}
        &:-moz-placeholder           {color: ${colors.TEXT_COLORS.font_blue_grey}: color 0.2s ease-in;}
        &::-moz-placeholder          {color: ${colors.TEXT_COLORS.font_blue_grey}: color 0.2s ease-in;}
        &:-ms-input-placeholder      {color: ${colors.TEXT_COLORS.font_blue_grey}: color 0.2s ease-in;}
        
        &:focus {
            border: solid 1px ${colors.TEXT_COLORS.font_dark};
            &::-webkit-input-placeholder {color: ${colors.TEXT_COLORS.font_dark};transition: color 0.2s ease-in;}
            &:-moz-placeholder           {color: ${colors.TEXT_COLORS.font_dark}: color 0.2s ease-in;}
            &::-moz-placeholder          {color: ${colors.TEXT_COLORS.font_dark}: color 0.2s ease-in;}
            &:-ms-input-placeholder      {color: ${colors.TEXT_COLORS.font_dark}: color 0.2s ease-in;}
        }
    }
`;

interface IStateMentorInput {
    focus: boolean;
}

const LoaderInput = styled(Loader)`
    display: inline-block;
    height: 30px;
    position: absolute;
    right: -18px;
    top: 2px;
    transform: scale(0.37);
    width: 90px;
`;

// todo: pasar a styled component
class MentorInput extends React.Component<IPropsMentorInput, IStateMentorInput> {
    public static defaultProps = {
        active: true,
        animation: {
            enable: false
        },
        enable: true
    };
    public state: IStateMentorInput;
    public input: React.RefObject<HTMLInputElement>;
    public timer: any =  0;
    constructor(props: IPropsMentorInput) {
        super(props);
        this.state = {
            focus: false
        };
        this.input = React.createRef();
        this.onClick = this.onClick.bind(this);
        this.onClickIcon = this.onClickIcon.bind(this);
    }

    public componentDidMount() {
        if (this.props.forceFocus && this.input.current) {
            this.input.current.focus();
        }
    }

    public render() {
        let inputClass = 'MentorInput--inactive';
        let icon = this.props.icon;
        const noAnimation = this.props.animation && this.props.animation.enable === false || this.props.active;
        if (this.props.enable && (this.props.active || noAnimation)) {
            const status = this.state.focus ? 'focus' : 'default';
            inputClass = `MentorInput--${status}`;
            if (!!this.props.error && !this.props.loading) {
                inputClass = `${inputClass} MentorInput--error`;
            }
        } else if (!this.props.enable) {
            inputClass = `${inputClass} MentorInput--disabled`;
        }

        if (!!this.props.error) {
            icon = 'close'
        }
        return (
            <div style={{...this.props.styleContainer}} onClick={this.onClick}>
                {this.props.label && <FormLabel label={this.props.label} info={this.props.info} uppercase={true}/>}
                <InputContainer
                    className={`MentorInput ${inputClass}`}
                    style={{...this.props.style}}>
                    <input
                        ref={this.input}
                        className={`MentorInput_input`}
                        type={"text"}
                        {...this.props.attrs}/>
                        {this.props.loading && <LoaderInput color={colors.TEXT_COLORS.font_dark}/>}
                        {!!icon && !this.props.loading && <Icon name={icon} style={{...this.props.iconStyles}} click={this.onClickIcon}/>}
                        {!!this.props.animation && <Body1>{this.props.animation.text}</Body1>}
                        {!!this.props.error &&
                        <div className={'MentorInput_message'}><Small1 weight={LIGHT_TEXT}>{this.props.error}</Small1></div>}
                </InputContainer>
            </div>
        );
    }

    private onClickIcon() {
        if (!!this.input && !!this.input.current) {
            const event = new Event('input', { bubbles: true });
            if(!!this.props.error) {
                this.input.current.value = '';
                this.input.current.dispatchEvent(event);
            } else if(this.props.onClickIcon) {
                this.props.onClickIcon(this.input.current.value);
            }
        }
    }

    private onClick() {
        if (!!this.props.attrs && !!this.props.attrs.onClick && this.props.enable) {
            this.props.attrs.onClick('');
            setTimeout(() => {
                if (this.input.current) {
                    this.input.current.focus();
                }
            }, 100);
        }
    }
}

export default MentorInput;
