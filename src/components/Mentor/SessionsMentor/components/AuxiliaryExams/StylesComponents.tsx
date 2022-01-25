import * as React from 'react';
import styled from 'styled-components';

interface IExamsContainerProps {
    visible: boolean;
}

export const ExamsContainer = styled.div<IExamsContainerProps>`
    margin-top: ${(p: IExamsContainerProps) => p.visible ? '40px': '40px'};
    margin-bottom: ${(p: IExamsContainerProps) => p.visible ? '70px': '5px'};;
`

export const Title = styled.h4`
    display: block;
    font-family: Mulish;
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 20px;
    color: #494F66;
    margin-bottom: 10px;
`;

export const AddExamButton = styled.div`
    display: flex;
    align-self: flex-end;
    align-items: center;
    column-gap: 8px;
    margin-top: 15px;
    margin-bottom: 10px;
    cursor: pointer;
`

export const AddExamIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#E5EFFF"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M12.75 6.75C12.75 6.33579 12.4142 6 12 6C11.5858 6 11.25 6.33579 11.25 6.75V11.25H6.75C6.33579 11.25 6 11.5858 6 12C6 12.4142 6.33579 12.75 6.75 12.75H11.25V17.25C11.25 17.6642 11.5858 18 12 18C12.4142 18 12.75 17.6642 12.75 17.25V12.75H17.25C17.6642 12.75 18 12.4142 18 12C18 11.5858 17.6642 11.25 17.25 11.25H12.75V6.75Z" fill="#2C7BFD"/>
    </svg>);

export const AddExamTitle = styled.span`
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #2C7BFD;
`

export const TrashExamButton = styled.div`
    display: flex;
    align-self: flex-end;
    align-items: center;
    column-gap: 8px;
    margin-top: 15px;
    margin-bottom: 10px;
    cursor: pointer;
`

export const TrashExamIcon = () => (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M4.57741 1.24408C4.73369 1.0878 4.94565 0.999999 5.16667 0.999999H7.83333C8.05435 0.999999 8.26631 1.0878 8.42259 1.24408C8.57887 1.40036 8.66667 1.61232 8.66667 1.83333V2.66667H4.33333V1.83333C4.33333 1.61232 4.42113 1.40036 4.57741 1.24408ZM3.33333 2.66667V1.83333C3.33333 1.3471 3.52649 0.880787 3.8703 0.53697C4.21412 0.193154 4.68044 0 5.16667 0H7.83333C8.31956 0 8.78588 0.193154 9.1297 0.53697C9.47351 0.880787 9.66667 1.3471 9.66667 1.83333V2.66667H11.1667H12.5C12.7761 2.66667 13 2.89052 13 3.16667C13 3.44281 12.7761 3.66667 12.5 3.66667H11.6667V12.5C11.6667 12.9862 11.4735 13.4525 11.1297 13.7964C10.7859 14.1402 10.3196 14.3333 9.83333 14.3333H3.16667C2.68044 14.3333 2.21412 14.1402 1.8703 13.7964C1.52649 13.4525 1.33333 12.9862 1.33333 12.5V3.66667H0.5C0.223858 3.66667 0 3.44281 0 3.16667C0 2.89052 0.223858 2.66667 0.5 2.66667H1.83333H3.33333ZM2.33333 3.66667V12.5C2.33333 12.721 2.42113 12.933 2.57741 13.0893C2.73369 13.2455 2.94565 13.3333 3.16667 13.3333H9.83333C10.0543 13.3333 10.2663 13.2455 10.4226 13.0893C10.5789 12.933 10.6667 12.721 10.6667 12.5V3.66667H9.16667H3.83333H2.33333ZM5.16667 6C5.44281 6 5.66667 6.22386 5.66667 6.5V10.5C5.66667 10.7761 5.44281 11 5.16667 11C4.89052 11 4.66667 10.7761 4.66667 10.5V6.5C4.66667 6.22386 4.89052 6 5.16667 6ZM8.33333 6.5C8.33333 6.22386 8.10948 6 7.83333 6C7.55719 6 7.33333 6.22386 7.33333 6.5V10.5C7.33333 10.7761 7.55719 11 7.83333 11C8.10948 11 8.33333 10.7761 8.33333 10.5V6.5Z" fill="#676F8F"/>
    </svg>
)

export const TrashExamTitle = styled.span`
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 120%;
    color: #676F8F;
`
