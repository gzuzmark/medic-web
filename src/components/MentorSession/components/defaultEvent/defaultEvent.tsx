import * as React from 'react';

const defaultEvent = ({ event }: any) => {
    return (
        <div>
            <div>{event.title}</div>
            <div>{event.site}</div>
        </div>
    )
};


export default defaultEvent;