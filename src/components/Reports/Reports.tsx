import * as moment from "moment";
import * as React from "react";
import {REPORT_SESSIONS, REPORT_STUDENTS, ReportRequestBean, ReportType} from "../../beans/ReportRequest.bean";
import { Text } from '../../common/ConsoleText';
import Loader from "../../common/Loader/Loader";
import {IReportForSession, IReportForStudent} from "../../interfaces/Reports.interface";
import SessionService from "../../services/Session/Session.service";
import StudentService from "../../services/Student/Student.service";
import FormColumn from "../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../ScheduleSession/components/FormRow/FormRow";
import FormSection from "../ScheduleSession/components/FormSection/FormSection";
import InputDatePicker from "./components/InputDatePicker/InputDatePicker";
import InputRadioReports from "./components/InputRadioReports/InputRadioReports";
import ReportTable from "./components/ReportTable/ReportTable";

interface IStateReports {
    clean: boolean;
    currentPage: number;
    loading: boolean;
    reportRequest: ReportRequestBean;
    results: any[];
}

export interface IInputRadioReports {
    title: string;
    value: ReportType;
}
const inputRadioValues = [
    {
        title: 'Reporte de sesiones',
        value: REPORT_SESSIONS
    }, {
        title: 'Reporte de alumnos',
        value: REPORT_STUDENTS
    }
] as IInputRadioReports[];

class Reports extends React.Component <{}, IStateReports> {
    public state: IStateReports;
    private sessionService = new SessionService();
    private studentService = new StudentService();
    constructor(props: any) {
        super(props);
        this.state = {
            clean: true,
            currentPage: 1,
            loading: false,
            reportRequest: new ReportRequestBean(),
            results: [],
        };
        this.updateState = this.updateState.bind(this);
        this.searchResults = this.searchResults.bind(this);
        this.isDayBlocked = this.isDayBlocked.bind(this);
    }

    public render() {
        let counter = 0;
        const shouldShowTable = !this.state.clean && !this.state.loading;
        return (
            <div className="u-LayoutMargin">
                <FormSection title={'Fecha'} style={{marginTop: 10, marginBottom: 10, display: 'block'}} itemStyle={{width: 650}}>
                    <Text>Elige las semanas de las sesiones que quieres ver</Text>
                    <FormRow style={{marginTop: 20}} columns={[
                        <FormColumn key={`Reports_${++counter}`}  width={2}>
                            <Text style={{paddingLeft: 12, paddingBottom: 6}}>Desde el:</Text>
                            <InputDatePicker
                                id={'startDate'}
                                date={this.state.reportRequest.startDate}
                                updateState={this.updateState}
                                configDate={{"isOutsideRange": () => false}}/>
                        </FormColumn>,
                        <FormColumn key={`Reports_${++counter}`}  width={2}>
                            <Text style={{paddingLeft: 12, paddingBottom: 6}}>Hasta el:</Text>
                            <InputDatePicker
                                id={'endDate'}
                                date={this.state.reportRequest.endDate}
                                updateState={this.updateState}
                                configDate={{"isDayBlocked": this.isDayBlocked, "isOutsideRange": () => false}}/>
                        </FormColumn>
                    ]}/>
                </FormSection>
                <hr className='u-Separator' />
                <FormSection title={'Reportes'} style={{marginTop: 32, marginBottom: 18}} itemStyle={{width: 350}}>
                    <Text>Selecciona el tipo de reporte que te gustaría ver</Text>
                    <InputRadioReports
                        name={'type'}
                        type={this.state.reportRequest.type}
                        inputs={inputRadioValues}
                        updateState={this.updateState}/>
                </FormSection>
                {this.state.loading && <Loader top={50} height={100}/>}
                {shouldShowTable && (this.state.results.length ?
                    <ReportTable items={this.state.results} type={this.state.reportRequest.type} /> :
                    <div className="Report-empty">No hay datos</div>)}
            </div>
        )
    }

    private updateState(params: object) {
        const reportRequest = {...this.state.reportRequest};
        const newReportRequest = Object.assign(reportRequest, params);
        this.setState({reportRequest:  new ReportRequestBean(newReportRequest)}, () => {
            if (this.state.reportRequest.isValid()) {
                this.searchResults(this.state.reportRequest);
            }
        });
    }

    private async searchResults(report: ReportRequestBean) {
        const params = report.toParams(this.state.currentPage);
        let data: IReportForSession | IReportForStudent | null = null;
        this.setState({loading: true});
        try {
            if (report.type === REPORT_SESSIONS) {
                data = await this.sessionService.listReport(params) as IReportForSession;
            } else if (report.type === REPORT_STUDENTS){
                data = await this.studentService.listReport(params) as IReportForStudent;
            }
            const results = data && data.items ? data.items : [];
            this.setState({clean: false, loading: false, results});
        } catch (e) {
            alert("Hubo un error");
            this.setState({clean: false, loading: false});
        }
    }

    private isDayBlocked(day: moment.Moment) {
        const startDate = this.state.reportRequest.startDate;
        return day < moment(startDate) || moment(startDate).add(1, 'year') < day;
    }
}

export default Reports;