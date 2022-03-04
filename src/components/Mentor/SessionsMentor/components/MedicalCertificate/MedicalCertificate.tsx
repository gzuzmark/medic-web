import * as React from 'react';
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from 'src/common/Buttons/Buttons';
import FormColumn from 'src/common/FormRow/components/FormColumn/FormColumn';
import FormRow from 'src/common/FormRow/FormRow';
import { Heading2 } from 'src/common/MentorText';
import { isValidURL } from 'src/helper/Url';
import { defaultRowStyle, GET_WIDTH_BY_PERCENTAGE } from '../HistorySessions/CurrentSessionForm/CurrentSessionForm';
import PatientBackgroundFormContext from '../PatientHistoryForm/PatientBackgroundForm.context';
import { CertificateContainer } from './Styles';

const MedicalCertificate = () => {

    const { values, setFieldValue } = React.useContext(PatientBackgroundFormContext);
    const [visible, setVisible] = React.useState(false);
    const [onlyRead, setOnlyRead] = React.useState(false);
    
    React.useEffect(() => {
        const url = values.case.urlMedicalCertificate;
        if (isValidURL(url)) {
            setOnlyRead(true);
        }
    }, []);

    React.useEffect(() => {
        const isCertificate = values.case.isMedicalCertificate;
        setVisible(isCertificate === 1 ? true: false);
    }, [values.case.isMedicalCertificate]);

    const changeVisibility = (e: any) => {
        if (!onlyRead) {
            setFieldValue('case.isMedicalCertificate', !visible? 1 : 0);
        }
    }

    return (
        <CertificateContainer visible={visible}>
        <FormRow
            key={'rowCertificate'}
            style={defaultRowStyle}
            columns={[
                <FormColumn
                    width={GET_WIDTH_BY_PERCENTAGE(80)}
                    key={'medicalCertificate'}
                >
                    <Heading2>¿El paciente solicita una constancia médica ?</Heading2>
                </FormColumn>,
                <FormColumn
                    width={GET_WIDTH_BY_PERCENTAGE(20)}
                    key={'medicalCertificateCheckbox'}
                    style={{alignItems: 'flex-end'}}
                >
                    <CheckBoxWrapper>
                        <CheckBox id="checkboxCertificate" type="checkbox" checked={visible} onChange={e => changeVisibility(e)}/>
                        <CheckBoxLabel htmlFor="checkboxCertificate" />
                    </CheckBoxWrapper>
                </FormColumn>,
            ]}
        />
        {
            visible &&
            <>
                <div style={{ marginTop: 20 }}>Se enviará al paciente una constancia con el resumen de esta cita</div>
            </>
        }
    </CertificateContainer>
    )
}

export default MedicalCertificate;
