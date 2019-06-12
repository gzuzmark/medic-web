import {Formik} from "formik";
import * as React from "react";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import {FONTS} from "../../../common/MentorColor";
import {Heading2, LIGHT_TEXT, Subhead1} from "../../../common/MentorText";
import RoomAdminCreate, {IRoomAdminCreateRequest, IRoomAdminCreateResponse} from "../../../domain/Room/Room";
import RoomRepository, {ROOM_CREATE_ACTION} from "../../../repository/RoomRepository";
import RoomService from "../../../services/Room/Room.service";
import {formTemplateHOC} from "../MentorFormBase/components/FormTemplate/FormTemplateHOC";
import ButtonCreateRoom from "./components/ButtonsCreateRoom/ButtonsCreateRoom";
import FormCreateRoom from "./components/FormCreateRoom/FormCreateRoom";
import RoomModalCreate from "./components/RoomModalCreate/RoomModalCreate";
import RoomCreateContext from "./RoomCreate.context";
import roomCreateSchema from "./RoomCreate.validation";

const FormCreateRoomTemplate = formTemplateHOC(FormCreateRoom);
const roomAdmin = new RoomAdminCreate({});
const roomService = new RoomService();

const RoomCreate: React.FC<{}> = () => {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [isRepeated, setIsRepeated] = React.useState(true);
    const onSubmit = (values: IRoomAdminCreateRequest) => {
        setLoading(true);
        roomService.create(values.block, values).then((room: IRoomAdminCreateResponse) => {
            setLoading(false);
            setSuccess(true);
            RoomRepository.addedRoomInsert({
                action: ROOM_CREATE_ACTION,
                block: values.block,
                room: room.id,
                site: values.site,
            });
        }).catch(() => {
            setLoading(false);
            setSuccess(false);
        });
    };

    return (
        <div className="u-LayoutMargin" style={{textAlign: 'center', width: 874, position: 'relative'}}>
            {loading && <LoaderFullScreen text={'Cargando...'} modal={true}/>}
            <RoomModalCreate success={success}/>
            <Heading2 color={FONTS.purple}>Nueva aula</Heading2>
            <Subhead1 weight={LIGHT_TEXT}>Ingresa los datos del aula que deseas ingresar</Subhead1>
            <Formik
                initialValues={roomAdmin.getRequest}
                validationSchema={roomCreateSchema}
                onSubmit={onSubmit}>
                {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched, setValues, setTouched}) => {
                    return (
                        <RoomCreateContext.Provider
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
                                <FormCreateRoomTemplate />
                                <ButtonCreateRoom onSubmit={handleSubmit}/>
                            </form>
                        </RoomCreateContext.Provider>
                    )
                }}
            </Formik>
        </div>
    )
};

export default RoomCreate;
