import * as React from "react";
import {ISites} from "../../../../domain/Sites/Sites";
import {IArea} from "../../../../interfaces/Mentor.interface";
import InterestAreaService from "../../../../services/InterestArea/InterestArea.service";
import SitesService from "../../../../services/Sites/Sites.service";

interface IPropsHandlerListAreas {
    areas: IArea[];
    loadingAreas: boolean;
    sites: ISites[];
}

const interestAreaService = new InterestAreaService();
const sitesService = new SitesService();

const HandlerInitialData = (): IPropsHandlerListAreas => {
    const [areas, setAreas] = React.useState([] as IArea[]);
    const [sites, setSites] = React.useState([] as ISites[]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        interestAreaService.listAreas().then((responseAreas: IArea[]) => {
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
