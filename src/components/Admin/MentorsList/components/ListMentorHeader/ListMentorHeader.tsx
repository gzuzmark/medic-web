import * as React from 'react';
import {FONTS} from "../../../../../common/MentorColor";
import { Small1 } from '../../../../../common/MentorText';

interface IPropsListMentorsHeader {
    header: string[];
}

class ListMentorsHeader extends React.Component <IPropsListMentorsHeader, {}> {
    constructor(props: IPropsListMentorsHeader) {
        super(props);
    }

    public render() {
        return (
          <React.Fragment>
              <div className="ListMentors">
                  <div className="ListMentors_header u-LayoutMargin u-ListMentors_padding">
                      {this.props.header.map((item, index) => {
                          return (
                              <div className="ListMentors_column" key={'header-' + index}>
                                  <Small1 color={FONTS.blue_grey}>{item}</Small1>
                              </div>
                          )
                      })}
                  </div>
              </div>
              <hr className='ListMentors_line' />
          </React.Fragment>
        );
    }
}

export default ListMentorsHeader;
