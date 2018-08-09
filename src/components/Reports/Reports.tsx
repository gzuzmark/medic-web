import * as moment from "moment";
import * as React from "react";
import { ReportRequestBean} from "../../beans/ReportRequest.bean";
import { Text } from '../../common/ConsoleText';
import Loader from "../../common/Loader/Loader";
import {IReportForSession} from "../../interfaces/Reports.interface";
import SessionService from "../../services/Session/Session.service";
import FormColumn from "../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../ScheduleSession/components/FormRow/FormRow";
import FormSection from "../ScheduleSession/components/FormSection/FormSection";
import InputDatePicker from "./components/InputDatePicker/InputDatePicker";

interface IStateReports {
    clean: boolean;
    currentPage: number;
    loading: boolean;
    reportRequest: ReportRequestBean;
    results: any[];
}

class Reports extends React.Component <{}, IStateReports> {
    public state: IStateReports;
    private sessionService = new SessionService();
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
        return (
            <div className="u-LayoutMargin">
                <FormSection title={'Fecha'} style={{marginTop: 10, marginBottom: 10, display: 'block'}} itemStyle={{width: 650}}>
                    <Text>Elige las semanas de las sesiones que quieres ver</Text>
                    <FormRow style={{marginTop: 20}} columns={[
                        <FormColumn key={`Reports_${++counter}`}  width={2}>
                            <InputDatePicker
                                id={'startDate'}
                                date={this.state.reportRequest.startDate}
                                updateState={this.updateState}/>
                        </FormColumn>,
                        <FormColumn key={`Reports_${++counter}`}  width={2}>
                            <InputDatePicker
                                id={'endDate'}
                                date={this.state.reportRequest.endDate}
                                updateState={this.updateState}
                                configDate={{"isDayBlocked": this.isDayBlocked}}/>
                        </FormColumn>
                    ]}/>
                </FormSection>
                <hr className='u-Separator' />
                <FormSection title={'Reportes'} style={{marginTop: 32, marginBottom: 18}}>
                    <Text>Selecciona el tipo de reporte que te gustaría ver</Text>
                </FormSection>
                {this.state.loading && <Loader top={50} height={100}/>}
                {!this.state.clean && !this.state.loading && this.state.results.length ?
                    <div className="Report-table">Datos</div> :
                    <div className="Report-empty">No hay datos</div>}
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

    private searchResults(report: ReportRequestBean) {
        const params = report.toParams(this.state.currentPage);
        this.setState({loading: true});
        this.sessionService.listReport(params).then((data: IReportForSession) => {
            const results = data.items ? data.items : [];
            this.setState({clean: false, loading: false, results});
        }).catch(() => {
            alert("Hubo un error");
            this.setState({clean: false, loading: false});
        });
    }

    private isDayBlocked(day: moment.Moment) {
        return day < moment(this.state.reportRequest.startDate);
    }

}

export default Reports;