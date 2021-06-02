import * as React from 'react'
import Iframe from 'react-iframe';

class Prescription extends React.Component  <{}, {}>  {


    public render() {
        const thePath = window.location.href;
        const draftNumber = thePath.substring(thePath.lastIndexOf('/') + 1)
        const urlAppoiment = "https://web-recetas-electronica-ci02.cindibyinkafarma.com/create/" + draftNumber;
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