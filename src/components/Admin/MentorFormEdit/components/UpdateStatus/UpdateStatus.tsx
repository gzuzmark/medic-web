import * as React from "react";
import {ButtonNormal, THEME_SECONDARY} from "../../../../../common/Buttons/Buttons";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import LoaderFullScreen from "../../../../../common/Loader/LoaderFullsScreen";
import {IMentorAdminEditCreateData} from "../../../../../domain/Mentor/MentorAdminEdit";
import {MENTOR_STATUS} from "../../../../../domain/Mentor/MentorBase";
import MentorService from "../../../../../services/Mentor/Mentor.service";

export interface IPropsUpdateStatus {
    status: string;
    idMentor: string;
    updateMentor: (status: string) => void;
}

const mentorService = new MentorService();

const UpdateStatus: React.FC<IPropsUpdateStatus> = (props) => {
    const [isPublished, setIsPublished] = React.useState(
        props.status === MENTOR_STATUS.PUBLISHED || props.status === MENTOR_STATUS.INCOMPLETE);
    const [finalStatus, setFinalStatus] =  React.useState('');
    const [nexStatus, setNexStatus] =  React.useState('');
    const [currentStatus, setCurrentStatus] =  React.useState('');
    const [state, setState] = React.useState({
        modal: false,
        saving: false,
        success: false
    });
    const warningContent = {
        button: "Aceptar",
        description: isPublished?
            "No le podrás crear sesiones a los mentores deshabilitados." :
            "Sus datos e información de perfil serán visibles.",
        image: <Icon name={'alert'} />,
        title: `¿Estás seguro que deseas ${nexStatus.toLowerCase()} a este mentor?`
    };

    React.useEffect(() => {
        setIsPublished(props.status === MENTOR_STATUS.PUBLISHED || props.status === MENTOR_STATUS.INCOMPLETE);
        setFinalStatus(isPublished ? 'habilitado' : 'deshabilitado');
        setNexStatus(isPublished ? 'Deshabilitar' : 'Habilitar');
    }, [currentStatus, props.status]);

    const openModal = () => {
        setState({
            ...state,
            modal: true
        })
    };

    const closeModal = () => {
        setState({
            ...state,
            modal: false
        })
    };

    const updateMentorStatus = () => {
        setState({
            ...state,
            modal: false,
            saving: true
        });
        const status = isPublished ? MENTOR_STATUS.DISABLED : MENTOR_STATUS.PUBLISHED;
        mentorService.updateStatus(props.idMentor, status).then((mentor: IMentorAdminEditCreateData) => {
            const newStatus = !!mentor.status ? mentor.status : '';
            props.updateMentor(newStatus);
            setCurrentStatus(newStatus);
            setState({
                ...state,
                modal: false,
                saving: false,
                success: true
            });
            setTimeout(() => {
                setState({
                    ...state,
                    modal: false,
                    success: false});
            }, 2000);
        })
    };

    return (
        <React.Fragment>
            {state.saving && <LoaderFullScreen modal={true} text={"Cargando..."}/>}
            <MentorModalBase show={state.modal} onCloseModal={closeModal}>
                <ContentModal.Generic generic={warningContent} loading={false} confirm={updateMentorStatus} />
            </MentorModalBase>
            <MentorModalBase show={state.success} hideClose={true}>
                <ContentModal.Success description={`Mentor ${finalStatus}`} />
            </MentorModalBase>
            <ButtonNormal text={`${nexStatus} mentor`} type={THEME_SECONDARY} attrs={{
                onClick: openModal,
                style: {
                    bottom: 10,
                    position: 'absolute',
                    right: 0,
                },
                type: "button",
            }}/>
        </React.Fragment>
    )
};

export default UpdateStatus;
