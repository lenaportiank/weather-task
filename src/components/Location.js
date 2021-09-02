import React from "react";

class Location extends React.Component{
    render(){
        this.props.weather();
        return(
            <img className="img_weather" src={this.props.pict} alt="icon"/>
            
        );
    }
}

export default Location;