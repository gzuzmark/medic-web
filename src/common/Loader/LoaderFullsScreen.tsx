import * as React from "react";
import styled from "styled-components";
import colors, {FONTS} from "../MentorColor";
import {Heading3} from '../MentorText';
import Loader from "./Loader";

const FullScreenContainer = styled.div`
    align-items: flex-start;
    background: ${(props: {modal: boolean}) => (!!props.modal ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.75)')};
    bottom: 0;
    display: flex;
    left: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1.2rem;
    position: ${(props: {modal: boolean}) => (!!props.modal ? 'fixed' : 'absolute')};
    right: 0;
    top: 0;
    width: 100%;
    z-index:  ${(props: {modal: boolean}) => (!!props.modal ? '1000' : '2')};
`;

const LoaderContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 110px;
    justify-content: space-around;
    margin: ${(props: {modal: boolean}) => (!!props.modal ? 'auto' : '165px auto auto auto')};
`;

interface IPropsLoaderFullScreen {
    text?: string;
    modal?: boolean;
    size?: number;
    styleLoaderContainer?: React.CSSProperties;
}

const LoaderFullScreen: React.FC<IPropsLoaderFullScreen> = (props) => {
    const color = !!props.modal ? colors.BACKGROUND_COLORS.background_white : colors.BACKGROUND_COLORS.background_purple;
    const font = !!props.modal ? FONTS.light : FONTS.purple;
    return (
        <FullScreenContainer modal={!!props.modal}>
            <LoaderContainer modal={!!props.modal} style={{...props.styleLoaderContainer}}>
                <Loader color={color} size={props.size || 27} style={{marginBottom: 50}} />
                {!!props.text && <Heading3 color={font}>{props.text}</Heading3>}
            </LoaderContainer>
        </FullScreenContainer>
    );
};

export default LoaderFullScreen;
