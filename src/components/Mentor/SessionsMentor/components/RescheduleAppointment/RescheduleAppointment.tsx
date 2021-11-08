import * as React from 'react';
import Select from 'react-select';
import { ActionMeta, ValueType } from 'react-select/lib/types';
import { ButtonNormal, THEME_PRIMARY, THEME_SECONDARY } from 'src/common/Buttons/Buttons';

export interface IOptionWeek {
  value: number;
  label: string;
}

export interface IOptionRescheduleAppointment {
  isYes: boolean;
  option: IOptionWeek | null;
}

const options: IOptionWeek[] = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
]

export interface IRescheduleAppointmentProps {
  value: number | null,
  onChange: (change: IOptionRescheduleAppointment) => void;
}

const RescheduleAppointment = ({ value, onChange }: IRescheduleAppointmentProps) => {
  const [optionYes, setOptionYes] = React.useState<boolean>(false);
  const [defaultOption, setDefaultOption] = React.useState<IOptionWeek | null>(null);

  const onSelectMenu = (option: ValueType<IOptionWeek>, action: ActionMeta) => {
    if (option) {
      onChange({
        isYes: optionYes,
        option: option as IOptionWeek
      });
    }
  };

  React.useEffect(() => {
    console.log('change value', value);
    if (value) {
      const option = options.find(o => o.value === Number(value)) || null;
      setDefaultOption(option);
      setOptionYes(true);
    }
  }, [value]);

  const onClickYesNo = (yesNo: boolean) => {
    setOptionYes(yesNo);
    setDefaultOption(null);
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
    <div style={{ marginTop: 20, border: 'solid 1px #1ECD96', padding: 10}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>¿El paciente quiere reagendar una cita?</div>
          <div style={{justifyContent: 'flex-end', display: 'flex', flexDirection: 'row', flex: '1'}}>
            <ButtonNormal text="Si" type={optionYes ? THEME_PRIMARY : THEME_SECONDARY} attrs={{ type: 'button', style: {marginRight: 10}, onClick: () => onClickYesNo(true)}} />
            <ButtonNormal text="No" type={!optionYes ? THEME_PRIMARY : THEME_SECONDARY} attrs={{ type: 'button', style: {marginRight: 10}, onClick: () => onClickYesNo(false)}} />
        </div>
      </div>
      <div style={{ marginTop: 10}}>
        {
          optionYes && (
            <div style={{display:'flex', flexDirection: 'row'}}>
              <div style={{marginRight: 10, width: 200 }}>
                <Select options={options} placeholder={'semana'} onChange={onSelectMenu} defaultValue={defaultOption} />
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RescheduleAppointment;
