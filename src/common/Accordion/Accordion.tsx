import * as React from 'react';
import Icon from "../Icon/Icon";
import './Accordion.scss';

interface IPropsAccordion {
    title: JSX.Element;
    body: JSX.Element;
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

    public render() {
        return (
            <div className="Accordion">
                <div
                    onClick={this.updateClose}
                    className={`Accordion_title ${this.state.open ? '' : 'Accordion_title--close'}`}>
                    <Icon name={"navigation-arrow"}/>
                    {this.props.title}
                </div>
                <div className={`Accordion_body ${this.state.open ? '' : 'Accordion_body--close'}`}>
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
