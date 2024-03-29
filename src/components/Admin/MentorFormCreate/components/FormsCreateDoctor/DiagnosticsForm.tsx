// tslint:disable:no-console
import * as React from "react";
import FormColumn from "src/common/FormRow/components/FormColumn/FormColumn";
import MentorFormBaseContext, { IMentorFormBaseContext } from "src/components/Admin/MentorFormBase/MentorFormBase.context";
import styled from "styled-components";
import FormRow from "../../../../../common/FormRow/FormRow";

export interface IProfileData {
    isEdit?: boolean;
    forceDisable?: boolean;

}
export interface IDiagnosticsFormState {
    listItemsD: string[];
}
export const ItemDiagnostic = styled.div`
    
    margin-right:18px;
    margin-bottom:10px;
    display: flex;
    background-color:#E5EFFF;
    color:#2C7BFD;
    border: none;
    border-radius: 4px;
    label{
        margin-bottom:0
    }
    .item-check {
        display: none;
      }
      .item-name {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #E5EFFF;
        text-align: center;
      }
    .item-check:checked + .item-name {
        background-color: #2C7BFD;
        color:#FFFFFF;
      }
    button{
        border-radius: 4px;
        border:0;
    &:focus{
        background-color: #2C7BFD;
        color: #FFFFFF;
    }
    &:active{
        background-color: #2C7BFD;
    }
    }
`;
class DiagnosticsForm extends React.Component<IProfileData, IDiagnosticsFormState> {
    
    public state: IDiagnosticsFormState;
    // const {values, handleBlur, handleChange } = React.useContext(MentorFormBaseContext);
    // const isEdit = !!props.isEdit;
    constructor(props: IProfileData) {
        super(props);
        this.state = {
            listItemsD: [],
        };
    }

    public render() {
        let counter = 0;
        // const listItemsD= [] as string[];
        return (
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext) => {
                    const diagnostics = context.listDiagnostics;
                    const selecteds = context.values.diagnostics;
                    const existsInDiagnostics = (value: string): boolean => {
                        return selecteds.includes(value);
                    }
                    const selectDiagnostico = (val:string)=>{
                        const exists = selecteds.includes(val);
                        if (exists) {
                            context.setFieldValue('diagnostics', [...selecteds.filter(item => item !== val)]);
                        } else {
                            context.setFieldValue('diagnostics', [...selecteds, val]);
                        }
                        context.setFieldTouched('diagnostics');
                    }
                    return(
                        <React.Fragment>
                            <div style={{ padding: '20px 0', margin: 0,display:'flex' }} >
                                <span style={{color:'#1ECD96',fontWeight:700,fontSize:'18px'}}>¿EN QUE TE PUEDO AYUDAR?</span>
                            </div>
                            <FormRow style={{ paddingBottom: '30px', margin: 0 }} columns={[
                                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                    <span>Seleccione hasta 10 tipos de intereses del especialista</span>
                                </FormColumn>
                            ]} />
                            <FormRow style={{ paddingBottom: '30px', margin: 0 }} columns={[
                                <FormColumn width={1} key={`FormColumn-PersonalData_${++counter}`}>
                                    <div style={{flexFlow:'row wrap',display:'flex'}}>
                                        {diagnostics.map((ele, index) => {
                                            return(
                                                <ItemDiagnostic key={index} className={'ItemDiagnostic'}>
                                                    <label>
                                                        <input className="item-check" name={`item-diagnostic-${index}`}
                                                            type="checkbox" 
                                                            value={ele.value}
                                                            onChange={() => selectDiagnostico(ele.value)} 
                                                            checked={existsInDiagnostics(ele.value)}
                                                        />
                                                        <div className="item-name">{ele.label}</div>
                                                    </label>
                                                </ItemDiagnostic>
                                            )
                                        })}
                                    </div>
                                </FormColumn>
                            ]} />
                        </React.Fragment>
                    )
                }}
            </MentorFormBaseContext.Consumer>
        )
    }
    
};

DiagnosticsForm.contextType = MentorFormBaseContext;

export default DiagnosticsForm;
