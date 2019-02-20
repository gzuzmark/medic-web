import * as React from "react";
import styled from "styled-components";
import colors from "../../../../../common/MentorColor";
import {Heading2, LIGHT_TEXT, Subhead1} from "../../../../../common/MentorText";

export interface IPropsFormTemplateHOC {
    title?: string;
    name?: string;
    subTitle?: string;
}

export const Title = styled(Heading2)`
    color: ${colors.BACKGROUND_COLORS.background_purple}
    text-align: center;
`;


export const FormTemplateContainer = styled.div`
   border: 1px solid ${colors.MISC_COLORS.background_grey_2};
   border-radius: 4px;
   margin-top: 50px; 
`;
export const formTemplateHOC = <P extends object>(Component: React.ComponentType<P>, Component2?: React.ComponentType<P>) =>
    class FormTemplate extends React.Component<P & IPropsFormTemplateHOC> {
        public render() {
            const { title, subTitle, name, ...props } = this.props as IPropsFormTemplateHOC;
            return (
                    <div className='FormTemplate'>
                        {!!title &&
                            <Title>{title}</Title>}
                        {!!name &&
                            <Title>{name}</Title>}
                        {!!subTitle &&
                            <Subhead1 weight={LIGHT_TEXT} style={{textAlign: 'center'}}>{subTitle}</Subhead1>}
                        {!!this.props.children &&
                            this.props.children}
                        <FormTemplateContainer>
                            <div style={{padding: '30px 85px'}}>
                                <Component {...props}/>
                            </div>
                        </FormTemplateContainer>
                        {!!Component2 &&
                            <FormTemplateContainer>
                                <Component2 {...props} />
                            </FormTemplateContainer>}
                    </div>
                )



        }
    };
