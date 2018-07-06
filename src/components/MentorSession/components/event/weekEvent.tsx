
import * as React from 'react';

const weekEvent = ({ event }: any) => {
    return (
        <div>
            <div className={'MentorSession_text--overflow'}>{event.title}</div>
        </div>
    )
};


export default weekEvent;