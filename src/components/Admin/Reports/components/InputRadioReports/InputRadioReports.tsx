import * as React from "react";
import {ReportType} from "../../../../../beans/ReportRequest.bean";
import ConsoleInputRadio from "../../../../../common/ConsoleInputRadio/ConsoleInputRadio";
import FormColumn from "../../../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../ScheduleSession/components/FormRow/FormRow";
import {IInputRadioReports} from "../../Reports";

interface IPropsInputRadioReports {
    name: string;
    type: ReportType;
    inputs: IInputRadioReports[];
    updateState: (params: object) => void;
}

const InputRadioReports: React.StatelessComponent<IPropsInputRadioReports> = (props) => {
    const onChange = (event: any) => {
        props.updateState({[props.name]: event.target.value})
    };

    return (
        <FormRow style={{marginTop: 20}} columns={props.inputs.map((element, index) => {
            return (
                <FormColumn key={`InputRadioReports_${index}`}  width={props.inputs.length}>
                    <ConsoleInputRadio
                        title={element.title}
                        name={props.name}
                        value={element.value}
                        checked={props.type === element.value}
                        onChange={onChange}/>
                </FormColumn>
            )
        })}/>
    );
};


export default InputRadioReports;