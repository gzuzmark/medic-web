import * as React from "react";
import RoomService from "../../../services/Room/Room.service";

const roomService = new RoomService();

const removeExtraSpaces = (value: string) => {
    return value.split(" ").filter((v: string) => v !== "").join(" ");
}

const handlerRoom = (block: string, context: any, room?: string) => {
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState({error: '', loadSuccess: ''});
    const [timer, setTimer] = React.useState(0 as any);
    const handleBlur = context.handleBlur;

    const verifyRoom = (value: string) => {
        roomService.searchRoom(block, value, room).then(() => {
            setLoading(false);
            context.setIsRepeated(true);
            setState({
                error: 'Esta aula ya existe en la dirección seleccionada.',
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
        if (e !== null && e.target) {
            context.handleChange(e);
            setLoading(true);
            clearTimeout(timer);
            if (e.target.value && e.target.value.trim().length) {
                e.target.value.trim().split(" ").filter((v: string) => v !== "").join(" ");
                const value = removeExtraSpaces(e.target.value.trim());
                const newTimer = setTimeout(() => {
                    setLoading(true);
                    verifyRoom(value);
                }, 250);
                setTimer(newTimer);
            } else {
                setLoading(false);
                context.setIsRepeated(true);
                setState({
                    error: '',
                    loadSuccess: ''
                })
            }
        }
    };


    return {loading, handleBlur, handleChange: onChange, error: state.error, loadSuccess: state.loadSuccess, verifyRoom}
};

export default handlerRoom;
