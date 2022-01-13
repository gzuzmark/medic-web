import * as React from 'react';
import FormColumn from 'src/common/FormRow/components/FormColumn/FormColumn';
import FormRow from 'src/common/FormRow/FormRow';
import MentorInput from 'src/common/MentorInput/MentorInput';
import { AddExamButton, AddExamIcon, AddExamTitle, Title, TrashExamButton, TrashExamIcon, TrashExamTitle } from '../AuxiliaryExams/StylesComponents';
import { defaultRowStyle, DEFAULT_COLUMN_WIDTH } from '../HistorySessions/CurrentSessionForm/CurrentSessionForm';
import PatientBackgroundFormContext from '../PatientHistoryForm/PatientBackgroundForm.context';

export interface ILaboratoryExamsProps {
    forceDisable?: boolean;
}

interface ILaboratoryExams {
    description: string;
}

const LaboratoryExams = ({forceDisable}: ILaboratoryExamsProps) => {
    const { values, handleBlur, setFieldValue} = React.useContext(PatientBackgroundFormContext);  
    
    const [laboratoryExamInput, setLaboratoryExamInput] = React.useState<string>("");
    const [LaboratoryExamsList, setLaboratoryExamsList] = React.useState<ILaboratoryExams[]>([]);

    const addLaboratoyExams = () => {
        const list = [...LaboratoryExamsList];
        list.push({ description: laboratoryExamInput.trim() })
        const valueExams = list.map(exam => exam.description).join('\n');
        setFieldValue('case.external_exams', valueExams);
        setLaboratoryExamInput("");
    }

    const removeLaboratoryExam = (index: number) => {
        const list = [...LaboratoryExamsList];
        list.splice(index, 1);
        const valueExams = list.map(exam => exam.description).join('\n');
        setFieldValue('case.external_exams', valueExams);
    }

    React.useEffect(() => {
        try {
            const list = values.case.external_exams.split(/\r?\n/);
            const exams = list.filter((item) => {
                const exam = item.trim();
                return exam.length > 0;
            });
            console.log('lista de examenes', exams);
            setLaboratoryExamsList(exams.map(exam => ({ description: exam })));
        } catch (error) {
            console.log(error);
        }
    }, [values]);

    return (
        <div>
            <FormRow key={'row_20'} style={defaultRowStyle} columns={[
                <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'external_exams'}>
                    <Title>Exámenes de laboratorio</Title>
                </FormColumn>
            ]}/>
            { LaboratoryExamsList.map((examLab, i) => (
                <div key={i}>
                    <FormRow key={'row_201'} style={defaultRowStyle} columns={[
                        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={`row200${i}`}>
                            <MentorInput
                                lowercaseLabel={true}
                                disabled={true}
                                attrs={{
                                    maxLength: 100,
                                    name: 'history.meds',
                                    value: examLab.description
                                }}
                                style={{ margin: '10px 0px !important' }}
                            />
                        </FormColumn>
                        ]}
                    />
                    <FormRow key={'row202'} columns={[
                        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={`row201${i}`}>
                            <TrashExamButton onClick={(e) => removeLaboratoryExam(i)}>
                                <TrashExamIcon />
                                <TrashExamTitle>Borrar</TrashExamTitle>
                            </TrashExamButton>
                        </FormColumn>
                    ]}/>
                </div>
                )) 
            }
            <FormRow key={'row21'} style={defaultRowStyle} columns={[
                <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'external_exams'}>
                    <MentorInput
                        lowercaseLabel={true}
                        disabled={!!forceDisable}
                        attrs={{
                            maxLength: 100,
                            name: 'history.meds',
                            onBlur: handleBlur,
                            onChange: (e: any) => setLaboratoryExamInput(e.target.value),
                            value: laboratoryExamInput,
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
        </div>
    )
}

export default LaboratoryExams;
