import * as React from "react";
import FormColumn from "../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../common/FormRow/FormRow";
import MentorDropDown from "../../../../common/MentorDropDown/MentorDropDown";

const FormCreateRoom: React.FC<{}> = () => {
    let counter = 0;

    const onChange = () => void(0);

    return (
        <React.Fragment>
            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorDropDown
                        label={"SEDE"}
                        value={''}
                        name={`location`}
                        triggerChange={onChange}
                        placeholder="Ejmpl.: Lima Centro, Lima Norte, etc."
                        options={[]} />
                </FormColumn>,
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorDropDown
                        label={"NOMBRE DE LA DIRECCIÓN"}
                        value={''}
                        name={`location`}
                        triggerChange={onChange}
                        placeholder="Ingresa un nombre para la dirección"
                        options={[]} />
                </FormColumn>
            ]}/>
        </React.Fragment>
    )
};

export default FormCreateRoom;
