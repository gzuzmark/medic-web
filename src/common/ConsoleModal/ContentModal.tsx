import * as React from 'react';
import { ButtonNormal } from "../Buttons/Buttons";
import Icon from "../Icon/Icon";
import colors, {FONTS} from "../MentorColor";
import {Body1, Heading3, LIGHT_TEXT} from '../MentorText';
import './ContentModal.scss';


export interface IGenericContentModal {
    image?: JSX.Element | null;
    title?: string;
    description?: string;
    button?: string;
}

export interface IPropsGenericContentModal {
    generic: IGenericContentModal;
    loading: boolean;
    confirm?: () => void;
    error?: boolean;
}

const Generic: React.StatelessComponent<IPropsGenericContentModal> = (props) => {

    const onClick = () => {
        if (props.confirm) {
            props.confirm();
        }
    };

    let propsButton = {};
    if (props.loading) {
        propsButton = {
            disabled: "true",
            loading: "true"
        }
    }

    return (
        <div className={`GenericContentModal`}>
            <div className={"GenericContentModal_header"}>
                {!!props.generic.image && props.generic.image}
            </div>
            <div className={"GenericContentModal_body"}>
                <div className={"GenericContentModal_custom-width"}>
                    {
                        !!props.generic.title &&
                        <div className={"GenericContentModal_title"}>
                            <Heading3>{props.generic.title}</Heading3>
                        </div>
                    }
                    {
                        !!props.generic.description &&
                        <div className={"GenericContentModal_description"}>
                            {!!props.error && <Icon name={"alert"} style={{fill: colors.TEXT_COLORS.font_error}}/>}
                            <Body1 color={!!props.error ? FONTS.error : ''} weight={LIGHT_TEXT}>{props.generic.description}</Body1>
                        </div>
                    }
                </div>
            </div>
            {
                !!props.generic.button &&
                <div className={"GenericContentModal_footer"}>
                    <ButtonNormal attrs={{onClick, ...propsButton}}
                                  className="GenericContentModal_button u-Button"
                                  text={props.generic.button} />
                </div>
            }
        </div>
    )
};

const Success: React.StatelessComponent<{description: string}> = (props) => {
    const generic: IGenericContentModal = {
        button: "",
        description: props.description,
        image: <Icon name={'check-circle'} />,
        title: "¡Listo!"
    };
    return <Generic generic={generic} loading={false} />
};

const ContentModal: {
    Generic: React.StatelessComponent<IPropsGenericContentModal>,
    Success: React.StatelessComponent<{description: string}>} = {
    Generic, Success
};

export default ContentModal;
