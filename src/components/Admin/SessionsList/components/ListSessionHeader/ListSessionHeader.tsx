import * as React from 'react';
import {FONTS} from "../../../../../common/MentorColor";
import { Small1 } from '../../../../../common/MentorText';

interface IPropsListSessionsHeader {
    header: string[];
}

class ListSessionsHeader extends React.Component <IPropsListSessionsHeader, {}> {
  constructor(props: IPropsListSessionsHeader) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <div className="ListSessions">
          <div className="ListSessions_header u-LayoutMargin u-ListSessions_padding">
            {this.props.header.map((item, index) => {
              return (
                <div className="ListSessions_column" key={'header-' + index}>
                    <Small1 color={FONTS.blue_grey}>{item}</Small1>
                </div>
              )
            })}
          </div>
        </div>
        <hr className='ListSessions_line' />
      </React.Fragment>
    );
  }
}

export default ListSessionsHeader;
