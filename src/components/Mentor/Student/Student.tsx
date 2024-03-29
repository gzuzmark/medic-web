import * as React from "react";
import { Sticky, StickyContainer } from "react-sticky";
import Assitance from '../../../assets/images/assistance.png'
import Improve from '../../../assets/images/improve.png'
import Accordion from "../../../common/Accordion/Accordion";
import DonatChart from "../../../common/DonatChart/DonatChart";
import Icon from "../../../common/Icon/Icon";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import colors, {FONTS} from '../../../common/MentorColor';
import {Body1, Heading3, LIGHT_TEXT, Small1, Subhead1} from '../../../common/MentorText';
import {LAYOUT_HEIGHT} from "../../../common/Settings";
import {TableFull, TableHeader} from "../../../common/TableMentor";
import {date} from "../../../common/Utils/DateUtilities";
import Utilities from "../../../common/Utils/Utilities";
import ImageProfile from '../../../components/Admin/MentorFormBase/components/ImageProfile/ImageProfile';
import {IStudentProfile, ITaggedSessions} from "../../../domain/Student/IStudentProfile";
import {IMatchParam} from "../../../interfaces/MatchParam.interface";
import StudentService from "../../../services/Student/Student.service";
import {ProfileStudent, StatisticCard, StatisticCardsContainer, StatisticTextContainer, TableBody, TableContainer} from './Styles';

export interface IPropsStudent {
    match: IMatchParam;
}

const renderTableHeaderReport = (text: string) => {
    return (
        <TableHeader center={true} style={{marginBottom: 10}}><Small1 color={FONTS.highlight}>{text}</Small1></TableHeader>
    )
};

const getHeaderAccordion = (title: string) => (<Heading3 style={{borderBottom: `1px solid ${colors.MISC_COLORS.background_grey_2}`}}>{title}</Heading3>);

const getUGOHistory = ({attended, attendedRatio, frequentlyTags}: any) => {
    const tags: string[] = !!frequentlyTags ? frequentlyTags.split(',') : [];
    const lastTitle = (tags.length === 1) ? 'Mejora recurrente' : 'Mejoras recurrentes';
    const firstTittle = attended === 1 ? 'Sesión asistida' : 'Sesiones asistidas';
    return (
        <StatisticCardsContainer>
            <StatisticCard border={'right'}>
                <Body1>Asistencia en UGO</Body1>
                <img src={Assitance} width={51} />
                <StatisticTextContainer top={-10}>
                    <Subhead1 weight={LIGHT_TEXT}>{attended} {firstTittle}</Subhead1>
                </StatisticTextContainer>
            </StatisticCard>
            <StatisticCard>
                <Body1>Ratio de asistencia UGO</Body1>
                <DonatChart percent={Number((attendedRatio * 100).toFixed(0))} />
            </StatisticCard>
            <StatisticCard border={'left'}>
                <Body1>{lastTitle}</Body1>
                <img src={Improve} width={51} />
                <StatisticTextContainer top={tags.length > 1 ? -2 : -10}>
                {tags.length > 0 ?
                    tags.map((tag, index) => (<Subhead1 weight={LIGHT_TEXT} key={`tag_${index}`}>{tag.trim()}</Subhead1>)):
                    <Subhead1 weight={LIGHT_TEXT}>Sin mejoras</Subhead1>}
                </StatisticTextContainer>
            </StatisticCard>
        </StatisticCardsContainer>
    )
};

const getReviewComments = (taggedSessions?: ITaggedSessions[]) => {
    return (
        <div style={{position: 'relative', marginTop: 20}}>
            <Sticky topOffset={-30}>
                {({style}) => {
                    return (
                        <TableContainer style={{...style, 'top': LAYOUT_HEIGHT}} >
                            {renderTableHeaderReport('Mejora')}
                            {renderTableHeaderReport('Comentario')}
                            {renderTableHeaderReport('Curso')}
                            {renderTableHeaderReport('Fecha')}
                        </TableContainer>
                    )
                }}
            </Sticky>
            <TableContainer>
                {!!taggedSessions ?
                    taggedSessions.map((session: ITaggedSessions, index: number) => {
                        const newDate = new Date(session.date);
                        const day = date.lpad(newDate.getDate(), 2) ;
                        const month = date.lpad(newDate.getMonth(), 2) ;
                        const year = newDate.getFullYear();
                        return (
                            <React.Fragment key={`Table_${session.id}`}>
                                <TableBody>
                                    <Body1 weight={LIGHT_TEXT}>{session.tagsList}</Body1></TableBody>
                                <TableBody center={true}>
                                    <Body1 weight={LIGHT_TEXT}>{session.comment || 'Sin comentarios'}</Body1></TableBody>
                                <TableBody center={true}>
                                    <Body1 weight={LIGHT_TEXT}>{session.skillName}</Body1></TableBody>
                                <TableBody center={true}>
                                    <Body1 weight={LIGHT_TEXT}>{day}/{month}/{year}</Body1></TableBody>
                            </React.Fragment>)
                    }) :
                    <TableFull message={true}>
                        <Icon name={"alert"}
                              style={{
                                  fill: colors.BACKGROUND_COLORS.background_disabled_button,
                                  height: 40,
                                  width: 40}}/>
                        <Body1 color={FONTS.disabled}>Aún no hay comentarios</Body1>
                    </TableFull>
                }
            </TableContainer>
        </div>
    );
};

const studentService = new StudentService();

const Student: React.FC<IPropsStudent> = (props) => {
    const idStudent = props.match.params.id;
    const [details, setDetails] = React.useState({} as IStudentProfile);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        studentService.getStudentDetail(idStudent).then((data: IStudentProfile) => {
            setDetails(data);
            setLoading(false);
        }).catch((error: any) => {
            if (error.response && error.response.data) {
                setLoading(false);
                const {code} = error.response.data;
                if (code === 404) {
                    window.location.assign('/');
                }
            }
        });
    }, [0]);
    return (
            <div className="u-LayoutMargin" style={{padding: '0 35px 100px 35px'}}>
                {loading && <LoaderFullScreen text={"Cargando..."} styleLoaderContainer={{marginTop: 300}} />}
                {!!details.student &&
                    <ProfileStudent>
                        <ImageProfile src={details.student.photo}
                                      onError={Utilities.onErrorStudentImage}
                                      width={88} height={88}
                                      title={"Estudiante"}
                                      filled={true}/>
                        <Heading3 style={{marginTop: 12}}>{details.student.name} {details.student.lastname}</Heading3>
                        <Body1 weight={LIGHT_TEXT}>{details.student.code}</Body1>
                        <Body1 weight={LIGHT_TEXT}>{details.student.acadCareer}</Body1>
                    </ProfileStudent>}
                {!!details.statistics &&
                    <Accordion title={getHeaderAccordion('Historial en UGO')}
                               body={getUGOHistory(details.statistics)}/>}
                <br/>
                <StickyContainer>
                    {!loading &&
                        <Accordion title={getHeaderAccordion('Resumen de comentarios')}
                                   body={getReviewComments(details.taggedSessions)}/>}
                </StickyContainer>
            </div>
    )
};

export default Student;
