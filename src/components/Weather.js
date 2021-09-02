import React from "react";

class Weather extends React.Component{
    render(){
        return(
            <div className="weather_info">
                {this.props.city && 
                <div>
                    <div >
                        <img className="img_icon" src={this.props.pict} alt="icon"/>
                    </div>
                    <div>
                        <b>{this.props.city}, {this.props.country}</b>
                        <img className="img_flag" src={this.props.flag} alt="flag" />
                        <b>{this.props.weather}</b>
                        <p className="text_about_weather">
                            <span className="temperature">{this.props.temp}°C</span>
                            temperature from {this.props.temp_min} to {this.props.temp_max}°С, wind {this.props.wind} m/s. clouds {this.props.clouds} %, {this.props.pressure} hpa
                        </p>
                    </div>
                </div>
                }
                <p>{this.props.err}</p>
            </div>
        );
    }
}

export default Weather;