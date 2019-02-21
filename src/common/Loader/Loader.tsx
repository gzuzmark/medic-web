import * as React from 'react';
import styled from "styled-components";
import hexToRgba from "../Utils/HexToRgba";
import './Loader.scss';

export interface IPropsLoader {
    className?: string;
    size?: number;
    color?: string;
    style?: React.CSSProperties;
}

interface ILoaderContainer {
    color?: string;
    size?: number;
}

const LoaderContainer = styled.div`
    margin: 5px auto;
    text-align: center;
    & > div {
        display: inline-block;
        width: ${(props: ILoaderContainer) => {
            return  !!props.size ? `${props.size}px` : '15px';  
        }};
        height: ${(props: ILoaderContainer) => {
            return !!props.size ? `${props.size}px` : '15px';  
        }};
        margin: 0 4px 0 4px;
        background: ${(props: ILoaderContainer) => {
            const color = props.color || "#000";
            return hexToRgba(color, '0.25');
        }};
        border-radius: 50%;
        transform: translateY(0);
        animation: wave 1.7s infinite ease-in-out;
        &:nth-child(1) {
          animation-delay: 0s;
        }
        &:nth-child(2) {
          animation-delay: 0.1s;
        }
        &:nth-child(3) {
          animation-delay: 0.2s;
        }
    }
    @keyframes wave
    {
      0%, 60%, 100% {
        background: ${(props: ILoaderContainer) => {
            const color = props.color || "#000";
            return hexToRgba(color, '0.25');
        }};
        transform: translateY(0);
      }
    
      20% {
        background: ${(props: ILoaderContainer) => {
            const color = props.color || "#000";
            return hexToRgba(color, '0.75');
        }};
        transform: translateY(13px);
      }
    
      40% {
        background: ${(props: ILoaderContainer) => {
            const color = props.color || "#000";
            return hexToRgba(color, '0.75');
        }};
        transform: translateY(-13px);
      }
    }
`

const Loader: React.StatelessComponent<IPropsLoader> = (props) => {
    return (
        <LoaderContainer className={`${!!props.className && props.className}`} size={props.size} color={props.color} style={{...props.style}}>
            <div />
            <div />
            <div />
        </LoaderContainer>
    );
};


export default Loader;


