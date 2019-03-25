import * as React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import roomActive from '../../../../../assets/images/room_active.png';
import roomInactive from '../../../../../assets/images/room_inactive.png';
import Card from "../../../../../common/Card/Card";
import Icon from "../../../../../common/Icon/Icon";
import colors from "../../../../../common/MentorColor";
import {Heading3} from "../../../../../common/MentorText";
import {CARD_STATUS} from "../../../../../domain/Card";
import {ISites} from "../../../../../domain/Sites/Sites";
import SitesService from "../../../../../services/Sites/Sites.service";


const CardRoom = styled(Card)`
    height: 108px;
    width: 225px;
`;

const CardRoomContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const RoomText = styled(Heading3)`
    margin-top: 10px;
    overflow:hidden; 
    text-align: center;
    text-overflow:ellipsis;
    white-space:nowrap; 
    width: 90%;
    word-break: break-word;
`;

interface IPropsHandlerCardRoom {
    click: (site: ISites) => void;
    selectedSite: ISites;
}

const SliderNav = styled.div`
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    width: 48px;
    height: 48px;
    padding: 0;
    transform: translateY(-50%);
    cursor: pointer;
    border: none;
    transition: all 0.15s ease-in-out;
`;

const SliderPrev = styled(SliderNav)`
    left: -48px;
    &:hover {
        left: -52px;
    }
`;

const SliderNext = styled(SliderNav)`
    right: -48px;
    &:hover {
        right: -52px;
    }
`;

const NavigationBefore = styled(Icon)`
    fill: ${colors.BACKGROUND_COLORS.background_purple};
    height: 48px;
    transform: rotate(180deg);
    width: 48px; 
`;


const NavigationNext = styled(Icon)`
    fill: ${colors.BACKGROUND_COLORS.background_purple};
    height: 48px;
    width: 48px; 
`;


const HandlerCardRoom: React.FC<IPropsHandlerCardRoom> = (props) => {
    const [loading, setLoading] = React.useState(true);
    const [sites, setSites] = React.useState([] as ISites[]);

    React.useEffect(() => {
        const sitesService = new SitesService();
        sitesService.list().then((items: ISites[]) => {
            setSites(items);
            setLoading(false);
            if (items.length > 0) {
                props.click(items[0]);
            }
        }).catch(() => {
            setLoading(false);
        });
    }, [0]);

    const selectSite = (site: ISites) => {
        return () => {
            props.click(site);
        };
    };

    const settings = {
        dots: false,
        infinite: true,
        nextArrow: <SliderNext><NavigationBefore name={"navigation-arrow"}/></SliderNext>,
        prevArrow: <SliderPrev><NavigationNext name={"navigation-arrow"} /></SliderPrev>,
        slidesToScroll: 1,
        slidesToShow: 4
    };

    return (
        <React.Fragment>
            {loading &&
            <CardRoomContainer>
                {["1", "2", "3", "4"].map((item) => (
                    <CardRoom status={CARD_STATUS.DISABLED} key={item}>
                        <img src={roomInactive} width={24}/>
                        <RoomText>&nbsp;</RoomText>
                    </CardRoom>
                ))}
            </CardRoomContainer>}
            {(!loading && sites.length > 4) &&
            <div style={{margin: '0 35px'}}>
                <Slider {...settings}>
                    {sites.map((site) => (
                        <CardRoom
                            status={site.id === props.selectedSite.id ? CARD_STATUS.ACTIVE : CARD_STATUS.DEFAULT}
                            click={selectSite(site)}
                            key={site.id}>
                            <img src={site.id === props.selectedSite.id ? roomActive : roomInactive}
                                 width={24} />
                            <RoomText>{site.name}</RoomText>
                        </CardRoom>))}
                </Slider>
            </div>}
        </React.Fragment>
    )
}


export default HandlerCardRoom;
