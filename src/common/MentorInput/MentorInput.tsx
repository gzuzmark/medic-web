import * as React from 'react';
import {Body1, LIGHT_TEXT, Small1} from '../../common/MentorText';
import Icon from "../Icon/Icon";
import './MentorInput.scss';

interface IPropsMentorInput {
    active?: boolean; // active or deactive animation
    icon?: string;
    enable?: boolean; // disable or enable input
    error?: string;
    forceFocus?: boolean;
    style?: React.CSSProperties;
    styleContainer?: React.CSSProperties;
    label?: string;
    animation?: {
        enable?: boolean;
        text?: string;
    };
    attrs?: any;
}

interface IStateMentorInput {
    focus: boolean;
}

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
            if (!!this.props.error) {
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
                {!!this.props.label &&
                <label>
                    <Small1 style={{marginBottom: 3, display: 'block'}}>{this.props.label}</Small1>
                </label>}
                <div
                    className={`MentorInput ${inputClass}`}
                    style={{...this.props.style}}>
                    <input
                        ref={this.input}
                        className={`MentorInput_input`}
                        type={"text"}
                        {...this.props.attrs}/>
                        {!!icon && <Icon name={icon} click={this.onClickIcon}/>}
                        {!!this.props.animation && <Body1>{this.props.animation.text}</Body1>}
                        {!!this.props.error &&
                        <div className={'MentorInput_message'}><Small1 weight={LIGHT_TEXT}>{this.props.error}</Small1></div>}
                </div>
            </div>
        );
    }

    private onClickIcon() {
        if (!!this.input && !!this.input.current) {
            const event = new Event('input', { bubbles: true });
            if(!!this.props.error) {
                this.input.current.value = '';
                this.input.current.dispatchEvent(event);
            } else if(this.props.attrs && this.props.attrs.onClickIcon) {
                this.props.attrs.onClickIcon(this.input.current.value);
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
