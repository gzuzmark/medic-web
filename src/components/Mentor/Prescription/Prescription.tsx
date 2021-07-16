import * as React from "react";
import Iframe from "react-iframe";
import { LOCAL_STORAGE_PRESCRIPTION_URL } from "../SessionsMentor/components/HistorySessions/Constants";

class Prescription extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
        this.handleWindowClose = this.handleWindowClose.bind(this);
    }

    public componentDidMount() {
        window.addEventListener("beforeunload", this.handleWindowClose);
    }

    public componentWillUnmount() {
        window.removeEventListener("beforeunload", this.handleWindowClose);
    }
    public render() {
        // https://web-recetas-electronica-ci05.cindibyinkafarma.com/create/draft-beb04161-988a-40ca-a9ac-4284a02a85bd-298473900074
        const urlAppoiment = localStorage.getItem(
            LOCAL_STORAGE_PRESCRIPTION_URL
        );
        if (urlAppoiment === null || urlAppoiment === undefined) {
            return <div>No encontrado</div>;
        }
        return (
            <div style={{ textAlign: "center" }}>
                <Iframe
                    url={urlAppoiment}
                    width="100%"
                    height="100%"
                    id="myId"
                    className="myClassname"
                    position="absolute"
                />
            </div>
        );
    }

    private handleWindowClose(e: any) {
        
        // if (window && window.parent) {
            // tslint:disable:no-console
            console.log("we have message sending here parent", window.parent);

            window.opener ? window.opener.postMessage("messagereceipe", window.location.origin): window.parent.postMessage("messagereceipe", window.location.origin);
            // window.opener?.postMessage('Message to the parent', "*");
        // }
        const message = "o/";
        // tslint:disable:no-console
        console.log("we have message sending here", { window });
        console.log("we have message sending here", { parent: window.parent });
        // (e || window.event).returnValue = message; // Gecko + IE
        return message;
    }
}

export default Prescription;
