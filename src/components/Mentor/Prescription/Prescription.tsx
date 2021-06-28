import * as React from 'react'
import Iframe from 'react-iframe';
import { LOCAL_STORAGE_PRESCRIPTION_URL } from '../SessionsMentor/components/HistorySessions/Constants';

class Prescription extends React.Component  <{}, {}>  {


    public render() {
        // https://web-recetas-electronica-ci05.cindibyinkafarma.com/create/draft-beb04161-988a-40ca-a9ac-4284a02a85bd-298473900074
        const urlAppoiment = localStorage.getItem(LOCAL_STORAGE_PRESCRIPTION_URL);
        if(urlAppoiment === null || urlAppoiment === undefined) {
            return (<div>No encontrado</div>);
        }
        return(
            <div style={{textAlign: "center"}}>
                <Iframe url={urlAppoiment}
                    width="100%"
                    height="100%"
                    id="myId"
                    className="myClassname"
                    position="absolute"
                    />
            </div>
        )
    }

}

export default Prescription
