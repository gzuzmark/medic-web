import * as React from 'react';
import MenuAside from "../../common/Layout/components/MenuAside/MenuAside";
import Sticky from "../../common/Sticky/Sticky";
import {IMatchParam} from "../../interfaces/MatchParam.interface";

interface IPropsSessionDeleteSingle {
    match: IMatchParam;
}

class SessionDeleteSingle extends React.Component<IPropsSessionDeleteSingle, {}> {
    private mentorId: string;

    constructor(props: any) {
        super(props);
        this.state = {
            mentor: undefined,
        };
        this.mentorId = this.props.match.params.id;
    }


    public renderMenu() {
        const textNavigation = this.mentorId ?
            'Crear sesiones para ' + this.mentorId : 'Crear sesiones';
        return (
            <Sticky height={90} top={80}>
                <div className="u-LayoutMargin" style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{
                        minWidth: 395,
                        position: 'relative',
                    }}/>
                    <MenuAside baseText={'Mentores'}
                               url={'/admin/mentores'}
                               textNavigation={textNavigation} />
                </div>
            </Sticky>
        )
    }

    public render() {
        return(
            <div>d</div>
        )
    }
}

export default SessionDeleteSingle;