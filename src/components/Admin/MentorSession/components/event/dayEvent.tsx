import * as React from 'react';

const dayEvent = ({ event }: any) => {
    return (
        <React.Fragment>
            <div className={'MentorSession_text--overflow'}>{event.title} - {event.block}</div>
        </React.Fragment>
    )
};

export default dayEvent;
