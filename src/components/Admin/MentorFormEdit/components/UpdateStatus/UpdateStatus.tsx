import * as React from "react";
import {ButtonNormal, THEME_SECONDARY} from "../../../../../common/Buttons/Buttons";
import ContentModal, {IGenericContentModal} from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import LoaderFullScreen from "../../../../../common/Loader/LoaderFullsScreen";
import {MENTOR_STATUS} from "../../../../../domain/Mentor/MentorBase";
import MentorService from "../../../../../services/Mentor/Mentor.service";

export interface IPropsUpdateStatus {
    status: string;
    idMentor: string;
}

interface IStateUpdateStatus {
    modal: boolean;
    saving: boolean;
    success: boolean;
}

class UpdateStatus extends React.Component <IPropsUpdateStatus, IStateUpdateStatus> {
    public state: IStateUpdateStatus;
    private warningContent: IGenericContentModal;
    private mentorService: MentorService;
    private nexStatus: string;
    constructor(props: IPropsUpdateStatus) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateMentorStatus = this.updateMentorStatus.bind(this);
        this.mentorService = new MentorService();
        this.state = {
            modal: false,
            saving: false,
            success: false
        };
        this.nexStatus = this.props.status === MENTOR_STATUS.PUBLISHED ? 'Deshabilitar' : 'Habilitar';
        this.warningContent = {
            button: "Aceptar",
            description: "No le podrás crear sesiones a los mentores deshabilitados.",
            image: <Icon name={'alert'} />,
            title: `¿Estás seguro que deseas ${this.nexStatus.toLowerCase()} a este mentor?`
        }
    }

    public render() {
        const finalStatus = this.props.status === MENTOR_STATUS.PUBLISHED ? 'deshabilitado' : 'habilitado';
        return (
            <React.Fragment>
                {this.state.saving && <LoaderFullScreen modal={true} text={"Cargando..."}/>}
                <MentorModalBase show={this.state.modal} onCloseModal={this.closeModal}>
                    <ContentModal.Generic generic={this.warningContent} loading={false} confirm={this.updateMentorStatus} />
                </MentorModalBase>
                <MentorModalBase show={this.state.success} hideClose={true}>
                    <ContentModal.Success description={`Mentor ${finalStatus}`} />
                </MentorModalBase>
                <ButtonNormal text={`${this.nexStatus} mentor`} type={THEME_SECONDARY} attrs={{
                    onClick: this.openModal,
                    style: {
                        bottom: 10,
                        position: 'absolute',
                        right: 0,
                    },
                    type: "button",
                }}/>
            </React.Fragment>
        )
    }

    public openModal() {
        this.setState({
            modal: true
        })
    }

    public closeModal() {
        this.setState({
            modal: false
        })
    }

    public updateMentorStatus() {
        this.setState({
            modal: false,
            saving: true
        }, () => {
            const status = this.props.status === MENTOR_STATUS.PUBLISHED ? MENTOR_STATUS.DISABLED : MENTOR_STATUS.PUBLISHED;
            this.mentorService.updateStatus(this.props.idMentor, status).then(() => {
                this.setState({
                    saving: false,
                    success: true
                }, () => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })

            })
        });
    }

}

export default UpdateStatus;
