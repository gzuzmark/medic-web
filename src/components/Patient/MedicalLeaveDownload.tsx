import * as React from 'react';
import {IMatchParam} from "../../interfaces/MatchParam.interface";
import MedicalLeaveService from "../../services/Student/MedicalLeave.service";


interface IPropsMentorSession {
    match: IMatchParam;
}

/**
 * Creates an anchor element `<a></a>` with
 * the base64 pdf source and a filename with the
 * HTML5 `download` attribute then clicks on it.
 * @param  {string} pdf
 * @return {void}
 */
function downloadPDF(pdf: string) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "descanso-medico.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    window.open('','_parent','');
    window.close();

}

class MedicalLeaveDownload extends React.Component<IPropsMentorSession, {}> {
    private sessionId: string;

    private service = new MedicalLeaveService();

    constructor(props: IPropsMentorSession) {
        super(props);
        this.sessionId = this.props.match.params.id;
    }


    public componentDidMount() {
        this.service.getMedicalLeavePdf(this.sessionId).then((pdf) => {
            downloadPDF(pdf);
        })
    }



    public render() {
        return (
            <div style={{textAlign: "center", margin: "100px 0", width: '100vw'}}>Tu descarga empezará en unos segundos... </div>
        );
    }
}

export default MedicalLeaveDownload;
