import {Formik} from "formik";
import * as React from "react";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import {FONTS} from "../../../common/MentorColor";
import {Heading2, LIGHT_TEXT, Subhead1} from "../../../common/MentorText";
import RoomAdminCreate, {
    IRoomAdminArea,
    IRoomAdminCreateRequest,
    IRoomAdminCreateResponse
} from "../../../domain/Room/Room";
import {IMatchParam} from "../../../interfaces/MatchParam.interface";
import RoomRepository, {ROOM_UPDATE_ACTION} from "../../../repository/RoomRepository";
import RoomService from "../../../services/Room/Room.service";
import {formTemplateHOC} from "../MentorFormBase/components/FormTemplate/FormTemplateHOC";
import ButtonsEditRoom from "./components/ButtonsEditRoom/ButtonsEditRoom";
import FormEditRoom from "./components/FormEditRoom/FormEditRoom";
import RoomModalEditFail from "./components/RoomModalEdit/RoomModalEditFail";
import RoomModalEditSuccess from "./components/RoomModalEdit/RoomModalEditSuccess";
import RoomEditContext from "./RoomEdit.context";
import roomEditSchema from "./RoomEdit.validation";

const FormEditRoomTemplate = formTemplateHOC(FormEditRoom);
const roomService = new RoomService();

interface IRoomEditProps {
    match: IMatchParam;
}

const IS_REQUEST_SUCCESS = 'IS_REQUEST_SUCCESS';
const IS_REQUEST_FAIL = 'IS_REQUEST_FAIL';

const RoomEdit: React.FC<IRoomEditProps> = (props) => {
    const [loadingFullScreen, setLoadingFullScreen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [statusRequest, setStatusRequest] = React.useState('');
    const [isRepeated, setIsRepeated] = React.useState(true);
    const [roomValues, setRoomValues] = React.useState({} as IRoomAdminCreateRequest);
    const [selectedAreas, setSelectedAreas] = React.useState([] as IRoomAdminArea[]);
    const idRoom = props.match.params.room;
    const idBlock = props.match.params.block;

    React.useEffect(() => {
        roomService.getRoom(idRoom, idBlock).then((response: any) => {
            const roomAdmin = new RoomAdminCreate({
                description: response.description,
                interestAreas: response.interestAreas,
                maxStudents: response.maxStudents,
            });
            const room = roomAdmin.getRequest;
            room.block = response.blockId;
            room.site = response.siteId;
            room.minStudents = response.minCapacityAllowed;
            setSelectedAreas(roomAdmin.room.interestAreas || []);
            setRoomValues(room);
            setLoading(false);
        });
    }, [0]);

    const onSubmit = (values: IRoomAdminCreateRequest) => {
        setLoadingFullScreen(true);
        roomService.update(values.block, idRoom, values).then((room: IRoomAdminCreateResponse) => {
            setLoadingFullScreen(false);
            setStatusRequest(IS_REQUEST_SUCCESS);
            setTimeout(() => {
                window.location.assign('/admin/aulas');
            }, 3000);
            RoomRepository.addedRoomInsert({
                action: ROOM_UPDATE_ACTION,
                block: values.block,
                room: room.id,
                site: values.site,
            });
        }).catch(() => {
            setLoadingFullScreen(false);
            setStatusRequest(IS_REQUEST_FAIL);
        });
    };

    return (
        <div className="u-LayoutMargin" style={{textAlign: 'center', width: 874, position: 'relative', minHeight: 300}}>
            {loadingFullScreen && <LoaderFullScreen text={'Cargando...'} modal={true}/>}
            <RoomModalEditSuccess show={statusRequest === IS_REQUEST_SUCCESS}/>
            <RoomModalEditFail show={statusRequest === IS_REQUEST_FAIL}/>
            <Heading2 color={FONTS.green}>Editar aula</Heading2>
            <Subhead1 weight={LIGHT_TEXT}>Ingresa los datos del aula que deseas editar</Subhead1>
            {loading ? <LoaderFullScreen styleLoaderContainer={{marginTop: 150}}/> :
            <Formik
                initialValues={roomValues}
                validationSchema={roomEditSchema}
                onSubmit={onSubmit}>
                {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched, setValues, setTouched}) => {
                    return (
                        <RoomEditContext.Provider
                            value={{
                                errors,
                                handleBlur,
                                handleChange,
                                isRepeated,
                                setFieldTouched,
                                setFieldValue,
                                setIsRepeated,
                                setTouched,
                                setValues,
                                touched,
                                values: values as IRoomAdminCreateRequest
                            }}>
                            <form>
                                <FormEditRoomTemplate
                                    interestAreas={selectedAreas}
                                    idRoom={idRoom}
                                    minStudents={roomValues.minStudents || 1}
                                    idBlock={idBlock}/>
                                <ButtonsEditRoom onSubmit={handleSubmit}/>
                            </form>
                        </RoomEditContext.Provider>
                    )
                }}
            </Formik>}
        </div>
    )
};

export default RoomEdit;
