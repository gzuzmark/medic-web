import * as React from 'react';
import { Text } from '../../../../common/ConsoleText';

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
                  <div className="ListMentors-header u-LayoutMargin u-ListMentors-padding">
                      {this.props.header.map((item, index) => {
                          return (
                              <div className="ListMentors-column" key={'header-' + index}>
                                  <Text className="ListMentors-text">{item}</Text>
                              </div>
                          )
                      })}
                  </div>
              </div>
              <hr className='ListMentors-line' />
          </React.Fragment>
        );
    }
}

export default ListMentorsHeader;
