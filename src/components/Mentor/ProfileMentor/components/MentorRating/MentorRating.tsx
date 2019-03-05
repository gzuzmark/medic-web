/*
.star-ratings-sprite {
    background: url('../assets/images/noStar@3x.png') repeat-x;
    background-size: 17px;
    font-size: 0;
    height: 17px;
    line-height: 0;
    margin-right: 6px;
    overflow: hidden;
    text-indent: -999em;
    width: 85px;
    &-rating {
      background: url('../assets/images/star@3x.png') repeat-x;
      background-position: 0 0;
      background-size: 17px;
      display:block;
      float: left;
      height: 17px;
    }
    &-text {
      color: rgb(150, 149, 162);
      font-size: 12px;
    }
  }

  <div class="star-ratings-sprite">
      <span [style.width]="(mentor.rating.count > 0 ? mentor.rating.average : 0) * 20 + '%'"
            class="star-ratings-sprite-rating"></span>
    </div>
 */



import styled from "styled-components";
import blankStar from '../../../../../assets/images/rated/blank-star.png';
import fullStar from '../../../../../assets/images/rated/full-star.png';

const RatingSpriteContainer = styled.img`
    background: url(${blankStar}) repeat-x;
    background-size: 17px;
    font-size: 0;
    height: 17px;
    line-height: 0;
    margin-right: 6px;
    overflow: hidden;
    text-indent: -999em;
    width: 85px;
}}
`;

const RatingSpriteTotal =  styled.div`
      background: url(${fullStar}) repeat-x;
      background-position: 0 0;
      background-size: 17px;
      display:block;
      float: left;
      height: 17px;
`;
