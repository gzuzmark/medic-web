import * as React from "react";
import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import LoaderFullScreen from "../../../../../common/Loader/LoaderFullsScreen";
import colors from "../../../../../common/MentorColor";
import MentorDropDown, {IPropsMentorOptionsDropDown} from "../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import MentorInputNumber from "../../../../../common/MentorInputNumber/MentorInputNumber";
import CreateRoomContext from "../../CreateRoom.context";
import HandlerInitialData from "../HandlerInitialData";
import HandlerListBlocks from "../HandlerListBlocks";
import useHandlerRoom from "./UseHandlerRoom";

const FormCreateRoom: React.FC<{}> = () => {
    let counter = 0;
    const [selectedSite, setSelectedSite] = React.useState('');
    const [selectedBlock, setSelectedBlock] = React.useState('');
    const room = useHandlerRoom(selectedBlock);

    const ctxt = React.useContext(CreateRoomContext);
    const {areas, loadingAreas, sites} = HandlerInitialData();
    const {blocks, loadingBlocks} = HandlerListBlocks(selectedSite);

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
            {loadingAreas && <LoaderFullScreen />}
            <FormRow style={{padding: '30px 0 40px 0', margin: 0}} columns={[
                <FormColumn width={2} key={`FormColumn-PersonalData_${++counter}`}>
                    <MentorDropDown
                        label={"SEDE"}
                        value={selectedSite}
                        disabled={loadingAreas}
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
                        disabled={loadingBlocks}
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
                            maxLength: 25,
                            name: 'description',
                            onBlur: room.handleBlur,
                            onChange: room.handleChange,
                            placeholder: "Ejmpl.: Aula A301, Aula C2001, etc.",
                            style: {padding: "0 24px 0 16px"},
                            value: ctxt.values.description
                        }}
                        label={"AULA"}/>
                    <MentorInputNumber
                        styleContainer={{marginLeft: 22, width: '30%'}}
                        max={100}
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
                        options={areas.map(a => ({label: a.name, value: a.id}))} />
                </FormColumn>
            ]}/>
        </React.Fragment>
    )
};

export default FormCreateRoom;
