import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import styled from "styled-components";
import {default as colors, FONTS} from "../../../../../common/MentorColor";
import {Body1, LIGHT_TEXT, Small1, Subhead1} from '../../../../../common/MentorText';

import './SessionItem.scss';

export interface IPropsSessionItem {
    address?: string;
    ubigeo?: string;
    name: string;
    id?: string;
    email?: string;
    gender?: number;
    lastname?: string;
}

const NameSessionContainer = styled.div`
    display: flex;
    margin: 12px 0 6px 0;
`;
class SessionItem extends React.Component<IPropsSessionItem, {}> {
    constructor(props: IPropsSessionItem) {
        super(props);
    }

    public render() {
      const { email } = this.props;
      return (
          <div className="SessionItem">
              <ReactTooltip id="ListMentor_SessionItem" effect={"solid"} place={"bottom"} />
              <div className='SessionItem_basicInformation'>
                  <NameSessionContainer>
                      <Subhead1 color={FONTS.error}>{this.props.gender === 3 || this.props.lastname === 'ugito' ? 'Pedir Información' : ''}</Subhead1>
                  </NameSessionContainer>
                  <NameSessionContainer>
                      <Subhead1 color={FONTS.dark}>{this.props.name}</Subhead1>
                  </NameSessionContainer>
                  <NameSessionContainer>
                      <Small1 color={FONTS.dark}>{this.props.address}</Small1>
                  </NameSessionContainer>
                  <NameSessionContainer>
                      <Small1 color={FONTS.dark}>{this.props.ubigeo}</Small1>
                  </NameSessionContainer>
                  {!!email && (
                    <div className='SessionItem_tagWrapper'>
                      <Body1 key={'mentor-item-info'}
                        className='SessionItem_tag'
                        weight={LIGHT_TEXT}
                        color={FONTS.dark}
                        style={{'background': colors.BACKGROUND_COLORS.background_white, border: `1px solid ${colors.BACKGROUND_COLORS.background_disabled}`}}>
                        {email}
                      </Body1>
                    </div>
                  )}
              </div>
          </div>
        );
    }
}

export default SessionItem;
