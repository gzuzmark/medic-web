import * as React from 'react';

const defaultEvent = ({ event }: any) => {
    return (
        <div>
            <div className={'MentorSession_text-overflow'}>{event.title}</div>
            <div className={'MentorSession_text-overflow'}>{event.site}</div>
        </div>
    )
};


export default defaultEvent;