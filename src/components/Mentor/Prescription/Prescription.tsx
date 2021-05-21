import * as React from 'react'
import Iframe from 'react-iframe';

class Prescription extends React.Component  <{}, {}>  {

    public render() {
        
        return (
           <div>
               <Iframe url="https://web-recetas-electronica-ci02.cindibyinkafarma.com/create/draft-aliv001-969446996428"
                width="100%"
                height="100%"
                id="myId"
                className="myClassname"
                position="absolute"/>
           </div>
           
        );
    }

}

export default Prescription