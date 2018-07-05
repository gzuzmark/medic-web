import * as React from 'react';

const agendaEvent = ({ event }: any) => {
    return (
        <React.Fragment>
            <div>{event.title}</div>
            <div>{event.location}</div>
        </React.Fragment>
    )
};

export default agendaEvent;