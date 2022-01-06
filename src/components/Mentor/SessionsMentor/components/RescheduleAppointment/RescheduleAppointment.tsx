import * as React from 'react';
// import Select from 'react-select';
// import { ActionMeta, ValueType } from 'react-select/lib/types';
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from 'src/common/Buttons/Buttons';
import { Heading2 } from 'src/common/MentorText';
import InputDatePicker from 'src/components/Admin/Reports/components/InputDatePicker/InputDatePicker';

export interface IOptionWeek {
  value: number;
  label: string;
}

export interface IOptionRescheduleAppointment {
  isYes: boolean;
  option: Date | null;
}


export interface IRescheduleAppointmentProps {
  value: Date | null,
  onChange: (change: IOptionRescheduleAppointment) => void;
}

const RescheduleAppointment = ({ value, onChange }: IRescheduleAppointmentProps) => {
  const [optionYes, setOptionYes] = React.useState<boolean>(false);
  const [defaultOption, setDefaultOption] = React.useState<Date | null>(null);

  const onSelectMenu = (params: { rescheduleDate: Date }) => {    
    if (params && params.rescheduleDate) {
      onChange({
        isYes: optionYes,
        option: params.rescheduleDate as Date
      });
    }
  };

  React.useEffect(() => {
    if (value) {      
      setDefaultOption(value);
      setOptionYes(true);
    }
  }, [value]);

  const onClickYesNo = (yesNo: boolean) => {
    setOptionYes(yesNo);    
    onChange({
      isYes: yesNo,
      option: null,
    });
  }

  React.useEffect(() => {
    onChange({
      isYes: optionYes,
      option: null,
    });
  }, []);

  return (
    <div style={{ marginTop: 20}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <Heading2>¿El paciente necesita una cita control?</Heading2> 
          <div style={{justifyContent: 'flex-end', display: 'flex', flexDirection: 'row', flex: '1'}}>            
            <CheckBoxWrapper>
              <CheckBox id="reschedule-checkbox" type="checkbox" checked={optionYes} onChange={ (e: any) => onClickYesNo(e.target.checked)}/>
              <CheckBoxLabel htmlFor="reschedule-checkbox" />
            </CheckBoxWrapper>
        </div>
      </div>
      <div style={{ marginTop: 10}}>
        {
          optionYes && (
            <div style={{display:'flex', flexDirection: 'row'}}>
              <div style={{marginRight: 10, width: 200 }}>                
                <InputDatePicker
                id="rescheduleDate"
                date={defaultOption || new Date()}
                updateState={onSelectMenu}
                configDate={{ 'displayFormat': () => "dddd, D MMM" }}  
            />
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RescheduleAppointment;
