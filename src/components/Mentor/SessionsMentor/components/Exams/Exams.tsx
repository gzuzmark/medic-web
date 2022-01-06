import * as React from 'react'
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from 'src/common/Buttons/Buttons';
import FormColumn from 'src/common/FormRow/components/FormColumn/FormColumn';
import FormRow from 'src/common/FormRow/FormRow';
import { Heading2 } from 'src/common/MentorText';
import AuxiliaryExams from '../AuxiliaryExams/AuxiliaryExams';
import { ExamsContainer } from '../AuxiliaryExams/StylesComponents';
import { defaultRowStyle, GET_WIDTH_BY_PERCENTAGE } from '../HistorySessions/CurrentSessionForm/CurrentSessionForm';
import LaboratoryExams from '../LaboratoryExams/LaboratoryExams';
import PatientBackgroundFormContext from '../PatientHistoryForm/PatientBackgroundForm.context';

interface IExamsProps {
    user?: string
}

const Exams = ({}: IExamsProps) => {
    const { values } = React.useContext(PatientBackgroundFormContext);
    const [ visible, setVisible ] = React.useState<boolean>(false);
    const [ flag, setFlag ] = React.useState<boolean>(false);

    React.useEffect(() => {
        try {
            if (flag) {
                return;
            }
            if (!flag) {
                setFlag(true);
            }
            const auxiliaries = values.case.exams;
            const laboratories = values.case.external_exams;
            if (auxiliaries.trim().length > 3) {
                setVisible(true);
                return;
            } else if (laboratories.trim().length > 3) {
                setVisible(true);
                return;
            }
            setVisible(false);
        } catch (error) {
            setVisible(false);
        }
    }, [values]);

    const changeVisibility = (e: any) => {
        setVisible(!visible);
    }

    return (
        <ExamsContainer visible={visible}>
            <FormRow
                key={'row70'}
                style={defaultRowStyle}
                columns={[
                    <FormColumn
                        width={GET_WIDTH_BY_PERCENTAGE(80)}
                        key={'medicalAuxiliaryExams'}
                    >
                        <Heading2>¿El paciente requiere de exámenes auxiliares?</Heading2>
                    </FormColumn>,
                    <FormColumn
                        width={GET_WIDTH_BY_PERCENTAGE(20)}
                        key={'medicalAuxiliaryExamsCheckbox'}
                        style={{alignItems: 'flex-end'}}
                    >
                        <CheckBoxWrapper>
                            <CheckBox id="checkboxExams" type="checkbox" checked={visible} onChange={e => changeVisibility(e)}/>
                            <CheckBoxLabel htmlFor="checkboxExams" />
                        </CheckBoxWrapper>
                    </FormColumn>,
                ]}
            />
            {
                visible &&
                <>
                    <LaboratoryExams />
                    <AuxiliaryExams />
                </>
            }
        </ExamsContainer>
    )
}

export default Exams;
