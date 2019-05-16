import * as React from "react";
import Icon from "../../../common/Icon/Icon";
import Loader from "../../../common/Loader/Loader";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import colors, {FONTS} from "../../../common/MentorColor";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../common/MentorInput/MentorInput";
import {Body1, LIGHT_TEXT, Small1, Subhead1} from "../../../common/MentorText";
import Utilities from "../../../common/Utils/Utilities";
import SkillService from "../../../services/Skill/Skill.service";
import {StudentCard, TableBody, TableContainer, TableFull, TableHeader, ToolBar} from './Styles'

const skillService = new SkillService();

const ListStudents: React.FC<{}> = () => {
    const [skills, setSkills] = React.useState([] as any[]);
    const [skillSelected, setSkillSelected] = React.useState({} as IPropsMentorOptionsDropDown );
    const [students, setStudents] = React.useState([] as any[]);
    const [loading, setLoading] = React.useState(false);
    const [filteredStudents, setFilteredStudents] =  React.useState([] as any[]);
    const [search, setSearch] = React.useState('');
    const [orderRatio, setOrderRatio] = React.useState(false);
    let timer: any;
    React.useEffect(() => {
        timer = 0;
        skillService.listByMentor().then((response) => {
            if (response) {
                setSkills(response.map((v) => {
                    return {label: v.name, value: v.id}
                }));
            }
        });
    }, [0]);

    const triggerChange = (name: string, selectedOption: IPropsMentorOptionsDropDown) => {
        setSkillSelected(selectedOption);
        setLoading(true);
        skillService.listStudents(selectedOption.value).then((response: any[]) => {
            setStudents(response);
            setFilteredStudents(response);
            setLoading(false);
            setSearch('')
        })
    };

    const onChangeText = (e: any) => {
        const value = e.target.value.toLocaleLowerCase();
        setSearch(value);
        setTimeout(timer);
        timer = setTimeout(() => {
            setOrderRatio(false);
            setFilteredStudents(students.filter((s) => {
                return `${s.name.toLocaleLowerCase()} ${s.lastname.toLocaleLowerCase()}`.indexOf(value) !== -1 ||
                    s.code.toLocaleLowerCase().indexOf(value) !== -1;
            }))
        }, 800);
    };

    const updateOrderRatio = () => {
        setOrderRatio(!orderRatio);
        const order = [...filteredStudents];
        order.sort((a, b) => {
            return orderRatio ?
                Number(a.sessionsStatistics.attendedRatio) -  Number(b.sessionsStatistics.attendedRatio) :
                Number(b.sessionsStatistics.attendedRatio) -  Number(a.sessionsStatistics.attendedRatio);
        });
        setFilteredStudents(order);
    };

    return (
        <div className="u-LayoutMargin" style={{padding: '0 35px'}}>
            {skills.length === 0 && <LoaderFullScreen/>}
            <ToolBar>
                <MentorDropDown
                    options={skills}
                    name={"selection"}
                    triggerChange={triggerChange}
                    isSearchable={true}
                    value={skillSelected.value}
                    placeholder={'Ejmpl. Introducción a la matemática para economía'}
                    label={"Elige el curso que deseas buscar"}/>
                <MentorInput
                    disabled={students.length === 0}
                    label={"Buscar alumno"}
                    icon={"search"}
                    attrs={{
                        onInput: onChangeText,
                        placeholder: 'Ingresa el código o nombre del almumno',
                        value: search}}/>
            </ToolBar>
            <TableContainer>
                <TableHeader><Small1 color={FONTS.highlight}>Nombre del alumno</Small1></TableHeader>
                <TableHeader center={true}><Small1 color={FONTS.highlight}>Sesiones agendadas</Small1></TableHeader>
                <TableHeader center={true}><Small1 color={FONTS.highlight}>Asistencia a asesiones</Small1></TableHeader>
                <TableHeader center={true} onClick={updateOrderRatio}><Small1 color={FONTS.highlight}>Porcentaje de asistencias a UGO</Small1></TableHeader>
                {students.length === 0 && !!skillSelected.value && !loading &&
                <TableFull message={true}>
                    <Icon name={"alert"}
                          style={{
                              fill: colors.BACKGROUND_COLORS.background_disabled_button,
                              height: 40,
                              width: 40}}/>
                    <Body1 color={FONTS.disabled}>¡Uy! No encontramos alumnos en este curos</Body1>
                </TableFull>}
                {filteredStudents.length === 0 && !!search && !loading &&
                <TableFull message={true}>
                    <Icon name={"alert"}
                          style={{
                              fill: colors.BACKGROUND_COLORS.background_disabled_button,
                              height: 40,
                              width: 40}}/>
                    <Body1 color={FONTS.disabled}>¡Uy! No encontramos alumnos con este nombre o código</Body1>
                </TableFull>}
                {loading && <TableFull><Loader/></TableFull>}
                {!loading && filteredStudents.map((s: any, i: number) => {
                    return (
                        <React.Fragment key={`students_list-${i}`}>
                            <TableBody>
                                <StudentCard>
                                    <img
                                        width="56"
                                        height="56"
                                        src={s.photo}
                                        onError={Utilities.onErrorStudentImage}/>
                                    <div>
                                        <Subhead1 color={FONTS.medium}>{s.name} {s.lastname}</Subhead1>
                                        <Body1 weight={LIGHT_TEXT} color={FONTS.medium}>{s.code}</Body1>
                                    </div>
                                </StudentCard>
                            </TableBody>
                            <TableBody center={true}>
                                <Body1 weight={LIGHT_TEXT}>{s.sessionsStatistics.scheduled}</Body1>
                            </TableBody>
                            <TableBody center={true}>
                                <Body1 weight={LIGHT_TEXT}>{s.sessionsStatistics.attended}</Body1>
                            </TableBody>
                            <TableBody center={true}>
                                <Body1 weight={LIGHT_TEXT}>{(Number(s.sessionsStatistics.attendedRatio) * 100).toFixed(0)}%</Body1>
                            </TableBody>
                        </React.Fragment>
                    )
                })}
            </TableContainer>
        </div>
    )
};

export default ListStudents;
