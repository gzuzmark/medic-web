import * as React from 'react';

const defaultEvent = ({ event }: any) => {
    return (
        <div>
            <div className={'MentorSession_text--overflow MentorSession_text--bold'}>{event.title}</div>
            <div className={'MentorSession_text--overflow'}>{event.block}</div>
        </div>
    )
};


export default defaultEvent;
