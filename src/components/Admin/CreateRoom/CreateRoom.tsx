import * as React from "react";
import {FONTS} from "../../../common/MentorColor";
import {Heading2, LIGHT_TEXT, Subhead1} from "../../../common/MentorText";
import {formTemplateHOC} from "../MentorFormBase/components/FormTemplate/FormTemplateHOC";
import FormCreateRoom from "./components/FormCreateRoom";


const FormCreateRoomTemplate = formTemplateHOC(FormCreateRoom);
const CreateRoom: React.FC<{}> = () => {
    return (
        <div className="u-LayoutMargin" style={{textAlign: 'center'}}>
            <Heading2 color={FONTS.purple}>Nueva aula</Heading2>
            <Subhead1 weight={LIGHT_TEXT}>Ingresa los datos del aula que deseas ingresar</Subhead1>
            <FormCreateRoomTemplate />
        </div>
    )
};

export default CreateRoom;
