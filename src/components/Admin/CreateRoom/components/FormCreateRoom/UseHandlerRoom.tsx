import * as React from "react";
import RoomService from "../../../../../services/Room/Room.service";
import CreateRoomContext from "../../CreateRoom.context";

const roomService = new RoomService();

const useHandlerRoom = (block: string) => {
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState({error: '', loadSuccess: ''});
    const [timer, setTimer] = React.useState(0 as any);

    const context = React.useContext(CreateRoomContext);
    const handleBlur = context.handleBlur;

    const verifyRoom = (value: string) => {
        roomService.searchRoom(block, value).then(() => {
            setLoading(false);
            context.setIsRepeated(true);
            setState({
                error: 'Esta aula ya existe',
                loadSuccess: ''
            })
        }).catch((error: any) => {
            if (error.response && error.response.data) {
                setLoading(false);
                const {code} = error.response.data;
                if (code === 404) {
                    context.setIsRepeated(false);
                    setState({
                        error: '',
                        loadSuccess: 'check'
                    })
                } else {
                    context.setIsRepeated(true);
                    setState({
                        error: '',
                        loadSuccess: ''
                    })
                }
            }
        });
    };

    const onChange = (e: any) => {
        context.handleChange(e);
        setLoading(true);
        clearTimeout(timer);
        if (e.target.value.trim().length) {
            const newTimer = setTimeout(() => {
                setLoading(true);
                verifyRoom(e.target.value.trim());
            }, 250);
            setTimer(newTimer);
        }

    };


    return {loading, handleBlur, handleChange: onChange, error: state.error, loadSuccess: state.loadSuccess}
};

export default useHandlerRoom;
