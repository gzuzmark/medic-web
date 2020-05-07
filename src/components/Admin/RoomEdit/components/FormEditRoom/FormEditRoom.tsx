import * as React from "react";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import LoaderFullScreen from "../../../../../common/Loader/LoaderFullsScreen";
import colors from "../../../../../common/MentorColor";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import MentorInputNumber from "../../../../../common/MentorInputNumber/MentorInputNumber";
import {IRoomAdminArea} from "../../../../../domain/Room/Room";
import {MAX_NAME_ROOM, MAX_STUDENTS_ROOM} from "../../../RoomBase/constRoom";
import HandlerInitialData from "../../../RoomBase/HandlerInitialData";
import HandlerListBlocks from "../../../RoomBase/HandlerListBlocks";
import handlerRoom from "../../../RoomBase/HandlerRoom";
import RoomEditContext from "../../RoomEdit.context";

interface IFormEditRoomProps {
    idRoom: string;
    idBlock: string;
    interestAreas: any[];
    minStudents: number;
}

const listOptions = (areas: IRoomAdminArea[], selectedAreas: IRoomAdminArea[]) => {
    const options = areas.map((area) => {
        const isDisabled = selectedAreas.some(selectedArea => selectedArea.id === area.id && !selectedArea.enabled);
        return {
            disabled: isDisabled,
            label: area.name,
            value: area.id,
        }
    });

    return options.filter(v => v.disabled).concat(options.filter(v => !v.disabled));
};

const FormEditRoom: React.FC<IFormEditRoomProps> = (props) => {
    let counter = 0;
    const context = React.useContext(RoomEditContext);
    const [selectedSite, setSelectedSite] = React.useState('');
    const [selectedBlock, setSelectedBlock] = React.useState(context.values.block);
    const room = handlerRoom(selectedBlock, context, props.idRoom);

    const ctxt = React.useContext(RoomEditContext);
    const {areas, loadingAreas, sites} = HandlerInitialData();
    const {blocks, loadingBlocks} = HandlerListBlocks(selectedSite);

    React.useEffect(() => {
        room.verifyRoom(context.values.description);
        setSelectedSite(context.values.site);
    }, [0]);

    const onChangeArea = (name: string, option: IPropsMentorOptionsDropDown[]) => {
        ctxt.setFieldValue(name, option.map(o => o.value));
        if (!ctxt.touched[name]) {
            ctxt.setFieldTouched(name, true);
        }
    };

    const onChangeSite = (name: string, option: IPropsMentorOptionsDropDown) => {
        setSelectedSite(option.value);
        ctxt.setFieldValue('site', option.value);
        setSelectedBlock('');
        ctxt.setFieldValue('block', '');
        room.handleChange(null);
        ctxt.setFieldTouched('description', false);
        ctxt.setFieldValue('description', '');
    };

    const onChangeBlock = (name: string, option: IPropsMentorOptionsDropDown) => {
        setSelectedBlock(option.value);
        ctxt.setFieldValue('block', option.value);
        room.handleChange(null);
        ctxt.setFieldTouched('description', false);
        ctxt.setFieldValue('description', '');
    };

    const onChangeMax = (n: number) => {
        ctxt.setFieldValue('maxStudents', n);
    };

    return (
        <React.Fragment>
            {(loadingAreas || loadingBlocks) && <LoaderFullScreen />}
            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorDropDown
                        label={"SEDE"}
                        value={selectedSite}
                        disabled={true}
                        name={`site`}
                        triggerChange={onChangeSite}
                        placeholder="Ejmpl.: Lima Centro, Lima Norte, etc."
                        options={sites.map(s => ({label: s.name, value: s.id}))} />
                </FormColumn>,
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorDropDown
                        label={"NOMBRE DE LA DIRECCIÓN"}
                        value={selectedBlock}
                        name={`location`}
                        disabled={true}
                        triggerChange={onChangeBlock}
                        placeholder="Ingresa un nombre para la dirección"
                        options={blocks.map(b => ({label: b.name, value: b.id}))} />
                </FormColumn>
            ]}/>
            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}
                            style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <MentorInput
                        styleContainer={{width: '70%'}}
                        error={room.error}
                        loading={room.loading}
                        icon={ctxt.values.description.length > 0 ? room.loadSuccess : ''}
                        iconStyles={{fill: colors.MISC_COLORS.green}}
                        disabled={!selectedBlock}
                        attrs={{
                            maxLength: MAX_NAME_ROOM,
                            name: 'description',
                            onBlur: room.handleBlur,
                            onChange: room.handleChange,
                            placeholder: "Ejmpl.: Aula A301, Aula C2001, etc.",
                            style: {padding: "0 24px 0 16px"},
                            value: ctxt.values.description
                        }}
                        label={"AULA"} />
                    <MentorInputNumber
                        info={"La cap. min. del aula está sujeta<br/>a la cantidad máxima de<br/>pacientes inscritos en las otras<br/>sesiones de esta misma aula."}
                        styleContainer={{marginLeft: 22, width: '30%'}}
                        max={MAX_STUDENTS_ROOM}
                        min={props.minStudents}
                        label={"CAPACIDAD"}
                        value={ctxt.values.maxStudents && ctxt.values.maxStudents.toString() || ''}
                        onChange={onChangeMax}/>
                </FormColumn>,
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorDropDown
                        label={"Área de interés"}
                        value={ctxt.values.interestAreasId}
                        isMulti={true}
                        disabled={loadingAreas}
                        isSearchable={true}
                        error={!!ctxt.touched.interestAreasId && ctxt.errors.interestAreasId}
                        name={`interestAreasId`}
                        triggerChange={onChangeArea}
                        placeholder="Ejmpl.: Tutoría, taller, empleabilidad"
                        options={listOptions(areas, props.interestAreas)} />
                </FormColumn>
            ]}/>
        </React.Fragment>
    )
};

export default FormEditRoom;
