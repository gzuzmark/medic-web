import * as React from 'react';
import { Text3 } from '../../common/ConsoleText';
import Icon from "../Icon/Icon";
import './MentorInput.scss';

interface IPropsMentorInput {
    active?: boolean; // active or deactive animation
    icon?: string;
    enable?: string; // disable or enable input
    forceFocus?: boolean;
    style?: React.CSSProperties;
    animation?: {
        enable?: boolean;
        text?: string;
    };
    input: {
        autoFocus: boolean;
        onChange?: (event: any) => void;
        onClick?: (event: any) => void;
        name: string;
        value: string;
        placeholder?: string;
        onKeyPress?: (event: any) => void;
    }
}

interface IStateMentorInput {
    active: boolean;
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
            active: !!this.props.active,
            focus: false
        };
        this.input = React.createRef();
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.doBlur = this.doBlur.bind(this);
        this.doFocus = this.doFocus.bind(this);
        this.onClickElement = this.onClickElement.bind(this);
    }

    public componentDidMount() {
        if (this.props.forceFocus && this.input.current) {
            this.input.current.focus();
        }
    }

    public render() {
        let inputClass = 'MentorInput--inactive';
        if (this.state.active) {
            const status = this.state.focus ? 'focus' : 'default';
            inputClass = `MentorInput--${status}`
        }
        return (
            <div
                className={`MentorInput ${inputClass}`}
                onClick={this.onClickElement}
                style={{...this.props.style}}>
                <input
                    ref={this.input}
                    className={`MentorInput_input`}
                    type={"text"}
                    name={this.props.input.name}
                    onChange={this.props.input.onChange}
                    onKeyPress={this.props.input.onKeyPress}
                    autoFocus={this.props.input.autoFocus}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={this.props.input.value}
                    placeholder={this.props.input.placeholder}/>
                    {!!this.props.icon && <Icon name={this.props.icon}/>}
                    {!!this.props.animation && <Text3>{this.props.animation.text}</Text3>}
            </div>
        );
    }

    private onClickElement() {
        if (this.props.input && this.props.input.onClick) {
            this.props.input.onClick("");
        }
        if (this.props.animation && this.props.animation.enable) {
            this.setState({
                active: true,
            }, () => {
                this.doFocus();
            })
        } else {
            this.doFocus();
        }
    }

    private doFocus() {
        this.setState({
            focus: true,
        }, () => {
            setTimeout(() => {
                if (this.input.current) {
                    this.input.current.focus();
                }
            }, 0)
        });
    }

    private onFocus() {
        clearTimeout(this.timer);
        if (!this.state.focus) {
            this.setState({
                focus: true,
            });
        }
    }

    private onBlur() {
        if (this.props.animation && this.props.animation.enable) {
            this.setState({
                active: false
            }, () => {
                this.doBlur();
            })
        } else {
            this.doBlur();
        }
    }

    private doBlur() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (this.state.focus) {
                this.setState({
                    focus: false,
                });
            }
        }, 0)
    }
}

export default MentorInput;
