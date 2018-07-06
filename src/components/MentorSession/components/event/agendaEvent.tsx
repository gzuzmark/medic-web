import * as React from 'react';

const agendaEvent = ({ event }: any) => {
    return (
        <React.Fragment>
            <div className={'MentorSession_text--overflow'}>{event.title}</div>
            <div className={'MentorSession_text--overflow'}>{event.location}</div>
        </React.Fragment>
    )
};

export default agendaEvent;