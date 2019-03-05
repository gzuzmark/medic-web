import * as React from 'react';
import styled from "styled-components";
import errorCamera from '../../../assets/images/error_camera.png';
import {ButtonNormal} from "../../../common/Buttons/Buttons";
import colors, {FONTS} from "../../../common/MentorColor";
import {Body1, Heading2, LIGHT_TEXT, Subhead1} from '../../../common/MentorText';
import ImageProfile from '../../../components/Admin/MentorFormBase/components/ImageProfile/ImageProfile';
import {ExperienceItem, FormReviewHeader, Separator} from "../../../components/Admin/MentorFormBase/MentorFormBase.styled";
import MentorRating from "./components/MentorRating/MentorRating";

const COLUMN =  'column';

const BasicData = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: ${(props: any) => {
        return props.type === COLUMN ? 'column' : 'row';
    }};
    margin: 0 56px;
`;

class SessionsMentor extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const selectedImage = 'https://neilpatel-qvjnwj7eutn3.netdna-ssl.com/wp-content/uploads/2017/05/LinkedIn.jpg';
        return (
            <div className="u-LayoutMargin">
                <BasicData>
                    <ImageProfile src={selectedImage || errorCamera}
                                  width={88} height={88}
                                  title={!!selectedImage ? "Foto de perfil" : "Falta foto de perfil"}
                                  filled={!!selectedImage }/>
                    <Heading2 color={FONTS.purple} style={{margin: '40px 0 10px 0'}}>Mario Augusto Benedetti de las Casas Montalván</Heading2>
                    <Subhead1 color={FONTS.error} style={{margin: '3px 0'}}>Cargo Actual (Pendiente)</Subhead1>
                    <Subhead1 color={FONTS.error} style={{margin: '3px 0'}}>Empresas Actual (Pendiente)</Subhead1>
                    <MentorRating count={1} average={4.5}/>
                </BasicData>
                <Separator />
                <FormReviewHeader>
                    <Wrapper>
                        <Subhead1>Descripción</Subhead1>
                        <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>
                    </Wrapper>
                </FormReviewHeader>
                <Wrapper>
                    <div style={{background: colors.MISC_COLORS.background_grey_1, padding: "22px 16px", width: '100%'}}>
                        <Subhead1 weight={LIGHT_TEXT} style={{overflowWrap: 'break-word'}}>“esta es una descripcion kawai”</Subhead1>
                    </div>
                </Wrapper>
                <Separator />
                <FormReviewHeader>
                    <Wrapper>
                        <Subhead1>Experiencia laboral</Subhead1>
                        <Subhead1 color={FONTS.error}>(Pendiente)</Subhead1>
                    </Wrapper>
                </FormReviewHeader>
                <Wrapper type={COLUMN}>
                    <ExperienceItem key={`form_view_experiences_${1}`}>
                        <Subhead1 color={FONTS.medium}>position</Subhead1>
                        <Body1 weight={LIGHT_TEXT}>company</Body1>
                        <Body1 weight={LIGHT_TEXT} color={FONTS.blue_grey}>value</Body1>
                    </ExperienceItem>
                    <ExperienceItem key={`form_view_experiences_${1}`}>
                        <Subhead1 color={FONTS.medium}>position</Subhead1>
                        <Body1 weight={LIGHT_TEXT}>company</Body1>
                        <Body1 weight={LIGHT_TEXT} color={FONTS.blue_grey}>value</Body1>
                    </ExperienceItem>
                </Wrapper>
                <Separator />
                <ButtonNormal text={"Editar información"} attrs={{
                    style: {margin: '0 0 0 auto'}
                }}/>
            </div>
        )
    }
}

export default SessionsMentor;
