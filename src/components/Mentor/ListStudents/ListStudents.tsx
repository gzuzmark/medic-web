import * as React from "react";
import styled from "styled-components";
import MentorDropDown from "../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../common/MentorInput/MentorInput";

const ToolBar = styled.div`
    display: grid;
    grid-template-columns: 380px 380px;
    grid-column-gap: calc(100% - 380px*2);
`;

const ListStudents: React.FC<{}> = () => {
    const a = () => void(0)
    return (
        <div className="u-LayoutMargin" style={{padding: '0 35px'}}>
            <ToolBar>
                <MentorDropDown
                    options={[]}
                    name={"selection"}
                    triggerChange={a}
                    placeholder={'Ejmpl. Introducción a la matemática para economía'}
                    label={"Elige el curso que deseas buscar"}/>
                <MentorInput
                    label={"Buscar alumno"}
                    attrs={{placeholder: 'Ingresa el código o nombre del almumno'}}/>
            </ToolBar>
        </div>
    )
};

export default ListStudents;
