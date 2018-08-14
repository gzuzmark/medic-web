import * as moment from "moment";
import * as React from "react";
import {REPORT_SESSIONS, REPORT_STUDENTS, ReportRequestBean, ReportType} from "../../beans/ReportRequest.bean";
import BoxMessage from "../../common/BoxMessage/BoxMessage";
import ConsolePager from "../../common/ConsolePager/ConsolePager";
import { Text } from '../../common/ConsoleText';
import Utilities from "../../common/Utilities";
import {IReportForSession, IReportForStudent} from "../../interfaces/Reports.interface";
import SessionService from "../../services/Session/Session.service";
import StudentService from "../../services/Student/Student.service";
import FormColumn from "../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../ScheduleSession/components/FormRow/FormRow";
import FormSection from "../ScheduleSession/components/FormSection/FormSection";
import InputDatePicker from "./components/InputDatePicker/InputDatePicker";
import InputRadioReports from "./components/InputRadioReports/InputRadioReports";
import ReportsLoader from "./components/ReportsLoader/ReportsLoader";
import ReportTable from "./components/ReportTable/ReportTable";
import './Reports.scss';

interface IStateReports {
    clean: boolean;
    currentPage: number;
    loading: boolean;
    reportRequest: ReportRequestBean;
    results: any[];
    pageSize: number;
    totalItemsCount: number;
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
            pageSize: 0,
            reportRequest: new ReportRequestBean(),
            results: [],
            totalItemsCount: 0
        };
        this.updateState = this.updateState.bind(this);
        this.searchResults = this.searchResults.bind(this);
        this.isDayBlocked = this.isDayBlocked.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.downloadResults = this.downloadResults.bind(this);
    }

    public render() {
        let counter = 0;
        let propsTableContainer = {};
        const shouldShowTable = !this.state.clean && this.state.results.length > 0;
        const shouldShowError = !this.state.clean && this.state.results.length === 0 && !this.state.loading;
        if (this.state.loading && shouldShowTable) {
            propsTableContainer = {
                ['data-disabled']: true
            }
        }
        return (
            <div className="u-LayoutMargin">
                <div className='Reports'>
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
                    <div className='Reports-table_container' {...propsTableContainer}>
                        <ReportsLoader loading={this.state.loading} center={shouldShowTable}>
                            Espera un momento mientras buscamos las sesiones
                        </ReportsLoader>
                        {shouldShowTable &&
                        <ReportTable items={this.state.results}
                                     type={this.state.reportRequest.type} />}
                        {shouldShowTable &&
                        <button className="u-Button Reports-button"
                                disabled={false}
                                onClick={this.downloadResults}>
                            Descarga en Excel
                        </button>
                        }
                        <ConsolePager activePage={this.state.currentPage}
                                      pageSize={this.state.pageSize}
                                      totalItemsCount={this.state.totalItemsCount}
                                      onChange={this.handlePageChange} />
                        <BoxMessage type={'error'} show={shouldShowError}>No se encontraron sesiones en las fechas solicitadas</BoxMessage>
                    </div>
                </div>
            </div>
        )
    }

    private updateState(params: object) {
        const reportRequest = {...this.state.reportRequest};
        const newReportRequest = Object.assign(reportRequest, params);
        this.setState({reportRequest:  new ReportRequestBean(newReportRequest), currentPage: 1}, () => {
            if (this.state.reportRequest.isValid()) {
                this.searchResults(this.state.reportRequest);
            }
        });
    }

    private handlePageChange(pageNumber: number) {
        const previousPage = this.state.currentPage;
        this.setState({currentPage: pageNumber}, async () => {
            try {
                await this.searchResults(this.state.reportRequest)
            } catch (e) {
                this.setState({currentPage: previousPage});
            }
        });
    }

    private async downloadResults() {
        const report = this.state.reportRequest;
        const params = this.state.reportRequest.toReportParams();
        let response: string = '';
        this.setState({loading: true});
        try {
            if (report.type === REPORT_SESSIONS) {
                response = await this.sessionService.getReportLink(params);
            } else if (report.type === REPORT_STUDENTS){
                response = await this.studentService.getReportLink(params);
            }
            if (!!response) {
                // tslint:disable:no-console
                console.log(response)
                Utilities.donwloadLink(response, report.getName(), 'xls')
            }
            this.setState({loading: false});
        } catch (e) {
            this.setState({loading: false});
        }
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
            if (data) {
                const results = data && data.items ? data.items : [];
                this.setState({
                    clean: false,
                    loading: false,
                    pageSize: data.pageSize,
                    results,
                    totalItemsCount: data.totalItems});
            }
        } catch (e) {
            this.setState({clean: false, loading: false});
        }
    }

    private isDayBlocked(day: moment.Moment) {
        const startDate = new Date(this.state.reportRequest.startDate);
        return day < moment(startDate) || moment(startDate).add(1, 'year') < day;
    }
}

export default Reports;