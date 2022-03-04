import styled from 'styled-components';

interface IInterconsultContainerProps {
    visible: boolean;
}

export const InterconsultContainer = styled.div<IInterconsultContainerProps>`
    margin-top: ${(p: IInterconsultContainerProps) => p.visible ? '0px': '0px'};
    margin-bottom: ${(p: IInterconsultContainerProps) => p.visible ? '50px': '5px'};
`
