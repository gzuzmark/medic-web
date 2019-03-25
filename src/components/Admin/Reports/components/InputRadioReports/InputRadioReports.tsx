import * as React from "react";
import {ReportType} from "../../../../../beans/ReportRequest.bean";
import ConsoleInputRadio from "../../../../../common/ConsoleInputRadio/ConsoleInputRadio";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import {IInputRadioReports} from "../../Reports";

interface IPropsInputRadioReports {
    name: string;
    type: ReportType;
    inputs: IInputRadioReports[];
    updateState: (params: object) => void;
}

const InputRadioReports: React.FC<IPropsInputRadioReports> = (props) => {
    const onChange = (event: any) => {
        props.updateState({[props.name]: event.target.value})
    };

    return (
        <FormRow style={{marginTop: 20}} columns={props.inputs.map((element, index) => {
            return (
                <FormColumn key={`InputRadioReports_${index}`}  width={props.inputs.length}>
                    <ConsoleInputRadio
                        title={element.title}
                    attrs={{
                        checked:props.type === element.value,
                        name:props.name,
                        onChange,
                        value:element.value
                    }}/>
                </FormColumn>
            )
        })}/>
    );
};


export default InputRadioReports;
