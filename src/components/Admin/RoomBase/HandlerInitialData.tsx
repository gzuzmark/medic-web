import * as React from "react";
import {IRoomAdminArea} from "../../../domain/Room/Room";
import {ISites} from "../../../domain/Sites/Sites";
import InterestAreaService from "../../../services/InterestArea/InterestArea.service";
import SitesService from "../../../services/Sites/Sites.service";

interface IPropsHandlerListAreas {
    areas: IRoomAdminArea[];
    loadingAreas: boolean;
    sites: ISites[];
}

const interestAreaService = new InterestAreaService();
const sitesService = new SitesService();

const HandlerInitialData = (): IPropsHandlerListAreas => {
    const [areas, setAreas] = React.useState([] as IRoomAdminArea[]);
    const [sites, setSites] = React.useState([] as ISites[]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        interestAreaService.listAreas().then((responseAreas: IRoomAdminArea[]) => {
            setAreas(responseAreas);
            sitesService.list().then((responseSites: ISites[]) => {
                setSites(responseSites);
                setLoading(false);
            })
        })
    }, [0]);
    return {areas, loadingAreas: loading, sites}
};

export default HandlerInitialData;
