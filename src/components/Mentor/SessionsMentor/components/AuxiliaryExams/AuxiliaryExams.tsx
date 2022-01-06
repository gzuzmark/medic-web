import * as React from 'react';
import FormColumn from 'src/common/FormRow/components/FormColumn/FormColumn';
import FormRow from 'src/common/FormRow/FormRow';
import MentorInput from 'src/common/MentorInput/MentorInput';
import { defaultRowStyle, DEFAULT_COLUMN_WIDTH } from '../HistorySessions/CurrentSessionForm/CurrentSessionForm';
import PatientBackgroundFormContext from '../PatientHistoryForm/PatientBackgroundForm.context';
import { AddExamButton, AddExamIcon, AddExamTitle, Title, TrashExamButton, TrashExamIcon, TrashExamTitle } from './StylesComponents';

export interface IAuxiliaryExamsProps {
    forceDisable?: boolean;
}

interface IAuxiliaryExams {
    description: string;
}

const AuxiliaryExams = ({forceDisable}: IAuxiliaryExamsProps) => {
    const { values, handleBlur, setFieldValue} = React.useContext(PatientBackgroundFormContext);  
    
    const [auxiliaryExamInput, setAuxiliaryExamInput] = React.useState<string>("");
    const [auxiliaryExamsList, setAuxiliaryExamsList] = React.useState<IAuxiliaryExams[]>([]);

    const addLaboratoyExams = () => {
        const list = [...auxiliaryExamsList];
        list.push({ description: auxiliaryExamInput.trim() })
        const valueExams = list.map(exam => exam.description).join('\n');
        setFieldValue('case.exams', valueExams);
        setAuxiliaryExamInput("");
    }

    const removeLaboratoryExam = (index: number) => {
        const list = [...auxiliaryExamsList];
        list.splice(index, 1);
        const valueExams = list.map(exam => exam.description).join('\n');
        setFieldValue('case.exams', valueExams);
    }

    React.useEffect(() => {
        try {
            const list = values.case.exams.split(/\r?\n/);
            const exams = list.filter((item) => {
                const exam = item.trim();
                return exam.length > 0;
            });
            setAuxiliaryExamsList(exams.map(exam => ({ description: exam })));
        } catch (error) {
            console.log(error);
        }
    }, [values]);

    return (
        <>
            <FormRow key={'row_20'} style={defaultRowStyle} columns={[
                <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'external_exams'}>
                    <Title>Exámenes de Imágenes / procedimientos</Title>
                </FormColumn>
            ]}/>
            { auxiliaryExamsList.map((examLab, i) => (
                <div key={i}>
                    <FormRow key={'row211'} style={defaultRowStyle} columns={[
                        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={`row211${i}`}>
                            <MentorInput
                                lowercaseLabel={true}
                                disabled={true}
                                attrs={{
                                    maxLength: 100,
                                    name: 'history.meds',
                                    value: examLab.description
                                }}
                                style={{ marginTop: '5px !important', padding: '0px !important' }}
                            />
                        </FormColumn>,
                        ]}
                    />
                    <FormRow key={'row212'} columns={[
                        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={`row212${i}`}>
                            <TrashExamButton onClick={(e) => removeLaboratoryExam(i)}>
                                <TrashExamIcon />
                                <TrashExamTitle>Borrar</TrashExamTitle>
                            </TrashExamButton>
                        </FormColumn>
                    ]}/>
                </div>
                ))
            }
            <FormRow key={'row_21'} style={defaultRowStyle} columns={[
                <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'external_exams'}>
                    <MentorInput
                        lowercaseLabel={true}
                        disabled={!!forceDisable}
                        attrs={{
                            maxLength: 100,
                            name: 'history.meds',
                            onBlur: handleBlur,
                            onChange: (e: any) => setAuxiliaryExamInput(e.target.value),
                            value: auxiliaryExamInput,
                        }}
                        style={{ margin: '10px 0px !important' }}
                    />
                    <AddExamButton onClick={() => addLaboratoyExams()}>
                        <AddExamIcon />
                        <AddExamTitle>Agregar examen</AddExamTitle>
                    </AddExamButton>
                </FormColumn>
            ]}
            />
        </>
    )
}

export default AuxiliaryExams;
