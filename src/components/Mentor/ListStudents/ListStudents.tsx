import * as React from "react";
import {Link} from "react-router-dom";
import { Sticky, StickyContainer } from "react-sticky";
import Icon from "../../../common/Icon/Icon";
import Loader from "../../../common/Loader/Loader";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import colors, {FONTS} from "../../../common/MentorColor";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../common/MentorInput/MentorInput";
import {Body1, LIGHT_TEXT, Small1, Subhead1} from "../../../common/MentorText";
import {LAYOUT_HEIGHT} from "../../../common/Settings";
import {TableFull, TableHeader} from "../../../common/TableMentor";
import Utilities from "../../../common/Utils/Utilities";
import {IMatchParam} from "../../../interfaces/MatchParam.interface";
import SkillService from "../../../services/Skill/Skill.service";
import {StudentCard, TableBody, TableContainer, TableContainerExtraLarge, ToolBar} from './Styles'

const skillService = new SkillService();

export interface IPropsStudent {
    match: IMatchParam;
}

const ListStudents: React.FC<IPropsStudent> = (props) => {
    const [skills, setSkills] = React.useState([] as any[]);
    const [loadingsSkills, setLoadingSkills] = React.useState(true);
    const [skillSelected, setSkillSelected] = React.useState({} as IPropsMentorOptionsDropDown );
    const [students, setStudents] = React.useState([] as any[]);
    const [loadingStudents, setLoadingStudents] = React.useState(false);
    const [filteredStudents, setFilteredStudents] =  React.useState([] as any[]);
    const [search, setSearch] = React.useState('');
    const [orderRatio, setOrderRatio] = React.useState(false);
    const skillId = props.match.params.skill;
    let timer: any;
    React.useEffect(() => {
        timer = 0;
        skillService.listByMentor().then((response) => {
            if (response) {
                let skill = {} as IPropsMentorOptionsDropDown ;
                setSkills(response.map((v) => {
                    if (v.id === skillId) {
                        skill = {label: v.name, value: v.id}
                    }
                    return {label: v.name, value: v.id}
                }));
                setLoadingSkills(false);
                setLoadingStudents(true);
                if (skill.value) {
                    setSkillSelected(skill);
                    searchBySkill(skill);
                } else {
                    setLoadingStudents(false);
                }
            }
        });
    }, [0]);

    const triggerChange = (name: string, selectedOption: IPropsMentorOptionsDropDown) => {
        setLoadingStudents(true);
        window.location.assign(`/mentor/alumnos/${selectedOption.value}`);
    };

    const searchBySkill = (skill: IPropsMentorOptionsDropDown) => {
        skillService.listStudents(skill.value).then((response: any[]) => {
            setStudents(response);
            setFilteredStudents(response);
            setLoadingStudents(false);
            setSearch('')
        }).catch(() => {
            setLoadingStudents(false);
        })
    };

    const onChangeText = (e: any) => {
        const value = e.target.value.toLocaleLowerCase();
        setSearch(value);
        setTimeout(timer);
        timer = setTimeout(() => {
            setOrderRatio(false);
            if (value.trim().length > 0) {
                setFilteredStudents(students.filter((s) => {
                    return `${s.name.toLocaleLowerCase()} ${s.lastname.toLocaleLowerCase()}`.indexOf(value.trim()) !== -1 ||
                        s.code.toLocaleLowerCase().indexOf(value.trim()) !== -1;
                }))
            } else {
                setFilteredStudents(students);
            }
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
            {loadingsSkills && <LoaderFullScreen text={"Cargando..."} styleLoaderContainer={{marginTop: 300}} />}
            <ToolBar>
                <MentorDropDown
                    options={skills}
                    name={"selection"}
                    disabled={skills.length === 0}
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
                        placeholder: 'Ingresa el código o nombre del alumno',
                        value: search}}/>
            </ToolBar>
            <StickyContainer style={{marginBottom: 70}} >
                <Sticky topOffset={-80}>
                    {({style}) => {
                        return (
                            <TableContainer style={{...style, 'top': LAYOUT_HEIGHT}}>
                                <TableHeader><Small1 color={FONTS.highlight}>Nombre del alumno</Small1></TableHeader>
                                <TableHeader center={true}><Small1 color={FONTS.highlight}>Sesiones agendadas</Small1></TableHeader>
                                <TableHeader center={true}><Small1 color={FONTS.highlight}>Asistencia a asesiones</Small1></TableHeader>
                                <TableHeader center={true} onClick={updateOrderRatio}><Small1 color={FONTS.highlight}>Porcentaje de asistencias a UGO</Small1></TableHeader>
                            </TableContainer>)
                    }}
                </Sticky>

                <TableContainer>
                    {students.length === 0 && !!skillSelected.value && !loadingStudents &&
                    <TableFull message={true}>
                        <Icon name={"alert"}
                              style={{
                                  fill: colors.BACKGROUND_COLORS.background_disabled_button,
                                  height: 40,
                                  width: 40}}/>
                        <Body1 color={FONTS.disabled}>¡Uy! No encontramos alumnos en este curso</Body1>
                    </TableFull>}
                    {filteredStudents.length === 0 && !!search && !loadingStudents &&
                    <TableFull message={true}>
                        <Icon name={"alert"}
                              style={{
                                  fill: colors.BACKGROUND_COLORS.background_disabled_button,
                                  height: 40,
                                  width: 40}}/>
                        <Body1 color={FONTS.disabled}>¡Uy! No encontramos alumnos con este nombre o código</Body1>
                    </TableFull>}
                    {loadingStudents && <TableFull><Loader/></TableFull>}
                </TableContainer>
                <TableContainerExtraLarge>
                    {!loadingStudents && filteredStudents.map((s: any, i: number) => {
                        return (
                            <div key={`students_list-${i}`}>
                                <TableBody>
                                    <Link to={`/mentor/alumno/${s.id}`}>
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
                                    </Link>
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
                            </div>
                        )
                    })}
                </TableContainerExtraLarge>
            </StickyContainer>
        </div>
    )
};

export default ListStudents;
