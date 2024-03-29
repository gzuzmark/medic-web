import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import styled from "styled-components";
import {default as colors, FONTS} from "../../../../../common/MentorColor";
import {Body1, LIGHT_TEXT, Small2} from '../../../../../common/MentorText';

import './SessionItem.scss';

export interface IPropsSessionItem {
    address?: string;
    ubigeo?: string;
    name: string;
    id?: string;
    email?: string;
    gender?: number;
    lastname?: string;
    usedBenefit?: string;
    companyName?: string;
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
      const { email, companyName } = this.props;
      return (
          <div className="SessionItem">
              <ReactTooltip id="ListMentor_SessionItem" effect={"solid"} place={"bottom"} />
              <div className='SessionItem_basicInformation'>
                 {/* <NameSessionContainer>
                      <Subhead1 color={FONTS.error}>{this.props.usedBenefit ? 'Colaborador' : '-'}</Subhead1>
                  </NameSessionContainer>
                  <NameSessionContainer>
                      <Subhead1 color={FONTS.error}>{this.props.gender === 3 || this.props.lastname === 'ugito' ? 'Pedir Información' : ''}</Subhead1>
                  </NameSessionContainer>*/}
                  <NameSessionContainer>
                  <Small2 weight={"400"} color={"#000000"}>{this.props.name}</Small2>
                  </NameSessionContainer>
                  {/*<NameSessionContainer>
                      <Small1 color={FONTS.dark}>{this.props.address}</Small1>
                  </NameSessionContainer>
                  <NameSessionContainer>
                      <Small1 color={FONTS.dark}>{this.props.ubigeo}</Small1>
                  </NameSessionContainer>*/}
                  {!!email && (
                    <div className='SessionItem_tagWrapper'>
                      <Small2 key={'mentor-item-info'}
                        className='SessionItem_tag'
                        weight={LIGHT_TEXT}
                        color={FONTS.dark}
                        style={{'background': colors.BACKGROUND_COLORS.background_white, border: `1px solid ${colors.BACKGROUND_COLORS.background_disabled}`}}>
                        {email}
                      </Small2>
                    </div>
                  )}
                  {!!companyName && (<div className='SessionItem_tagWrapper'>
                      <Body1 key={'mentor-item-info'}
                             className='SessionItem_tag'
                             weight={LIGHT_TEXT}
                             color={FONTS.dark}
                             style={{'background': colors.BACKGROUND_COLORS.background_blue, border: `1px solid ${colors.BACKGROUND_COLORS.background_disabled}`}}>
                          {companyName}
                      </Body1>
                  </div>)}
              </div>
          </div>
        );
    }
}

export default SessionItem;
