// tslint:disable:no-console
import * as React from "react";
import FormColumn from "src/common/FormRow/components/FormColumn/FormColumn";
import MentorFormBaseContext, { IMentorFormBaseContext } from "src/components/Admin/MentorFormBase/MentorFormBase.context";
import styled from "styled-components";
/// import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
/*import MentorTextArea from "../../../../../common/MentorTextArea/MentorTextArea";
import MentorFormBaseContext from "../../../MentorFormBase/MentorFormBase.context";
import { limitDescription } from "../../../MentorFormBase/MentorFormBase.validations";
import getBorderColor from "../../../MentorFormBase/components/FormTemplate/FormTemplateField";
*/
export interface IProfileData {
    isEdit?: boolean;
    forceDisable?: boolean;
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
class DiagnosticsForm extends React.Component<IProfileData> {
    public listItemsD: string[];
    // const {values, handleBlur, handleChange } = React.useContext(MentorFormBaseContext);
    // const isEdit = !!props.isEdit;
       
    public render() {
        let counter = 0;  
        const listItemsD= [] as string[];
        return (
            <MentorFormBaseContext.Consumer>
                {(context: IMentorFormBaseContext) => {
                    const diagnostics = context.listDiagnostics;
                    const selectDiagnostico =  (val:string)=>{
                        return (e: any) => {
                            if (e.target.checked) {
                                listItemsD.push(val)
                                // cont.handleChange(e);
                            }else if (!e.target.checked){
                                listItemsD.forEach( (item, index) => {
                                    if(item === val){
                                        listItemsD.splice(index,1); 
                                    } 
                                  });
                            }
                            context.setFieldValue('diagnostics', listItemsD);
                        context.setFieldTouched('diagnostics');
                        }
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
                                        {diagnostics.map((ele,index) => {
                                            return(
                                            <ItemDiagnostic key={index} className={'ItemDiagnostic'}>
                                                <label>
                                                    <input className="item-check" name="`${index}`" type="checkbox" value={ele.value} onChange={selectDiagnostico(ele.value)}/>
                                                    <div className="item-name">{ele.label}</div>
                                                </label>
                                                {/*<button  onClick={this.selectDiagnostic(ele.value,context)}>
                                                <span >{ele.label}</span> 
                                                </button>*/}
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
export default DiagnosticsForm;
