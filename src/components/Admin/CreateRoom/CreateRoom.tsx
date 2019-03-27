import {Formik} from "formik";
import * as React from "react";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import {FONTS} from "../../../common/MentorColor";
import {Heading2, LIGHT_TEXT, Subhead1} from "../../../common/MentorText";
import RoomAdminCreate, {IRoomAdminCreateRequest} from "../../../domain/Room/Room";
import RoomService from "../../../services/Room/Room.service";
import {formTemplateHOC} from "../MentorFormBase/components/FormTemplate/FormTemplateHOC";
import ButtonCreateRoom from "./components/ButtonsCreateRoom/ButtonsCreateRoom";
import FormCreateRoom from "./components/FormCreateRoom/FormCreateRoom";
import RoomModalSuccess from "./components/RoomModalSuccess/RoomModalSuccess";
import CreateRoomContext from "./CreateRoom.context";
import roomCreateSchema from "./CreateRoom.validation";

const FormCreateRoomTemplate = formTemplateHOC(FormCreateRoom);
const roomAdmin = new RoomAdminCreate({});
const roomService = new RoomService();

const CreateRoom: React.FC<{}> = () => {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [isRepeated, setIsRepeated] = React.useState(true);
    const onSubmit = (values: IRoomAdminCreateRequest) => {
        setLoading(true);
        roomService.create(values.block, values).then(() => {
            setLoading(false);
            setSuccess(true);
        }).catch(() => {
            setLoading(false);
            setSuccess(false);
        });
    };

    return (
        <div className="u-LayoutMargin" style={{textAlign: 'center', width: 874, position: 'relative'}}>
            {loading && <LoaderFullScreen text={'Cargando...'} modal={true}/>}
            <RoomModalSuccess success={success}/>
            <Heading2 color={FONTS.purple}>Nueva aula</Heading2>
            <Subhead1 weight={LIGHT_TEXT}>Ingresa los datos del aula que deseas ingresar</Subhead1>
            <Formik
                initialValues={roomAdmin.getRequest}
                validationSchema={roomCreateSchema}
                onSubmit={onSubmit}>
                {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched, setValues, setTouched}) => {
                    return (
                        <CreateRoomContext.Provider
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
                        </CreateRoomContext.Provider>
                    )
                }}
            </Formik>
        </div>
    )
};

export default CreateRoom;
