import styled from 'styled-components';

interface ICertificateContainerProps {
    visible: boolean;
}

export const CertificateContainer = styled.div<ICertificateContainerProps>`
    margin-top: ${(p: ICertificateContainerProps) => p.visible ? '30px': '0px'};
    margin-bottom: ${(p: ICertificateContainerProps) => p.visible ? '50px': '5px'};
`
