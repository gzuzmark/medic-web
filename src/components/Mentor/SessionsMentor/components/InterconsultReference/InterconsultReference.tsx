import * as React from 'react';
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from 'src/common/Buttons/Buttons';
import FormColumn from 'src/common/FormRow/components/FormColumn/FormColumn';
import FormRow from 'src/common/FormRow/FormRow';
import { Heading2 } from 'src/common/MentorText';
import MentorTextArea from 'src/common/MentorTextArea/MentorTextArea';
import { isValidURL } from 'src/helper/Url';
import { defaultRowStyle, DEFAULT_COLUMN_WIDTH, GET_WIDTH_BY_PERCENTAGE } from '../HistorySessions/CurrentSessionForm/CurrentSessionForm';
import PatientBackgroundFormContext from '../PatientHistoryForm/PatientBackgroundForm.context';
import { InterconsultContainer } from './Styles';

const InterconsultReference = () => {

    const { values, handleBlur, handleChange, setFieldValue } = React.useContext(PatientBackgroundFormContext);
    const [ onlyRead, setOnlyRead ] =  React.useState(false);
    const [visible, setVisible] = React.useState(false);
    
    React.useEffect(() => {
        const url = values.case.urlInterconsult;
        if (isValidURL(url)) {
            setOnlyRead(true);
        }
    }, []);

    React.useEffect(() => {
        const isInterconsult = values.case.isInterconsult;
        setVisible(isInterconsult);
    }, [values.case.isInterconsult]);

    const changeVisibility = (e: any) => {
        if (!onlyRead) {
            setFieldValue('case.isInterconsult', !visible);
        }
    }

    return (
        <InterconsultContainer visible={visible}>
        <FormRow
            key={'row70'}
            style={defaultRowStyle}
            columns={[
                <FormColumn
                    width={GET_WIDTH_BY_PERCENTAGE(80)}
                    key={'interconsultMedical'}
                >
                    <Heading2>¿El paciente requiere de una interconsulta/referencia?</Heading2>
                </FormColumn>,
                <FormColumn
                    width={GET_WIDTH_BY_PERCENTAGE(20)}
                    key={'interconsultMedicalCheckbox'}
                    style={{alignItems: 'flex-end'}}
                >
                    <CheckBoxWrapper>
                        <CheckBox id="checkboxInterconsult" type="checkbox" checked={visible} onChange={e => changeVisibility(e)}/>
                        <CheckBoxLabel htmlFor="checkboxInterconsult" />
                    </CheckBoxWrapper>
                </FormColumn>,
            ]}
        />
        {
            visible &&
            <>
                <FormRow key={'interconsultMedicalTextArea'} style={defaultRowStyle} columns={[
                    <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'interconsultMedicalFormColum'}>
                    <div>Detalle de la solicitud</div>
                    <MentorTextArea
                        disabled={onlyRead}
                        label=""
                        attrs={{
                            name: "case.descriptionInterconsult",
                            onBlur: handleBlur,
                            onChange: handleChange,
                            rows: 4,
                            style: {  height: 'auto' },
                            value: values.case.descriptionInterconsult || '',
                        }} />
                </FormColumn>
                ]}/>
            </>
        }
    </InterconsultContainer>
    )
}

export default InterconsultReference;
