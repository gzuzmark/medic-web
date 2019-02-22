import * as React from "react";
import styled from "styled-components";
import colors, {FONTS} from "../MentorColor";
import {Heading3} from '../MentorText';
import Loader from "./Loader";

const FullScreenContainer = styled.div`
    align-items: flex-start;
    background: rgba(0, 0, 0, 0.75);
    bottom: 0;
    display: flex;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1.2rem;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1000;
`;

const LoaderContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 110px;
    justify-content: space-around;
    margin: auto;
`;

interface IPropsLoaderFullScreen {
    text?: string;
}

const LoaderFullScreen: React.StatelessComponent<IPropsLoaderFullScreen> = (props) => {
    return (
        <FullScreenContainer>
            <LoaderContainer>
                <Loader color={colors.BACKGROUND_COLORS.background_white} size={27} style={{marginBottom: 50}} />
                {!!props.text && <Heading3 color={FONTS.light}>{props.text}</Heading3>}
            </LoaderContainer>
        </FullScreenContainer>
    );
};

export default LoaderFullScreen;
