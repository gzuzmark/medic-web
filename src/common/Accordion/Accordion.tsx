import * as React from 'react';
import Icon from "../Icon/Icon";
import './Accordion.scss';

interface IPropsAccordion {
    title: JSX.Element;
    body: JSX.Element;
    open?: boolean;
    className?: string;
    iconStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
}

interface IStateAccordion {
    open: boolean;
}

class Accordion extends React.Component<IPropsAccordion, IStateAccordion> {
    public state: IStateAccordion;
    constructor(props: IPropsAccordion) {
        super(props);
        this.state = {
            open: true
        }
        this.updateClose = this.updateClose.bind(this);
    }

    public componentDidMount() {
        this.setState({open: !!this.props.open})
    }

    public render() {
        return (
            <div className={`Accordion ${this.props.className || ''}`}>
                <div
                    onClick={this.updateClose}
                    style={{...this.props.headerStyle}}
                    className={`Accordion_title ${this.state.open ? '' : 'Accordion_title--close'}`}>
                    <Icon name={"navigation-arrow"} style={{...this.props.iconStyle}}/>
                    {this.props.title}
                </div>
                <div className={`Accordion_body ${this.state.open ? '' : 'Accordion_body--close'}`}
                     style={{...this.props.bodyStyle}}>
                    {this.props.body}
                </div>
            </div>
        );
    }

    private updateClose() {
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }
}

export default Accordion;
