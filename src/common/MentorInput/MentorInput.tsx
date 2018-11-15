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
        onBlur?: (event: any) => void;
        onChange?: (event: any) => void;
        onClick?: (event: any) => void;
        onFocus?: (event: any) => void;
        name: string;
        value: string;
        placeholder?: string;
        onKeyPress?: (event: any) => void;
    }
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
    }

    public componentDidMount() {
        if (this.props.forceFocus && this.input.current) {
            this.input.current.focus();
        }
    }

    public render() {
        let inputClass = 'MentorInput--inactive';
        const noAnimation = this.props.animation && this.props.animation.enable === false || this.props.active;
        if (this.props.active || noAnimation) {
            const status = this.state.focus ? 'focus' : 'default';
            inputClass = `MentorInput--${status}`
        }
        return (
            <div
                className={`MentorInput ${inputClass}`}
                style={{...this.props.style}}
                onClick={this.onClick}>
                <input
                    ref={this.input}
                    className={`MentorInput_input`}
                    type={"text"}
                    name={this.props.input.name}
                    onChange={this.props.input.onChange}
                    onKeyPress={this.props.input.onKeyPress}
                    autoFocus={this.props.input.autoFocus}
                    value={this.props.input.value}
                    placeholder={this.props.input.placeholder}/>
                    {!!this.props.icon && <Icon name={this.props.icon}/>}
                    {!!this.props.animation && <Text3>{this.props.animation.text}</Text3>}
            </div>
        );
    }

    private onClick() {
        if (this.props.input.onClick) {
            this.props.input.onClick('');
            setTimeout(() => {
                if (this.input.current) {
                    this.input.current.focus();
                }
            }, 100);
        }
    }
}

export default MentorInput;
