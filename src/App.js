import React from 'react';
import DialogIcon from "./components/DialogIcon";
import Info from "./components/Info";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Location from './components/Location';
import styled from 'styled-components';
// import Slider from './components/Slider';

const Styles = styled.div`
  margin: 0 auto;

  .value {
    flex: 1;
    font-size: 15px;
  }

  .slider {
    flex: 6;
    width: 200px;
    height: 15px;
    border-radius: 5px;
    background: #efefef;
    outline: none;
  }
`;

const api_key = "597ae3dcf8367cde6ca9a8f46608a04a";
const aqua = [0, 255, 255];
const blue = [107, 230, 255];
const yellow = [255, 247, 0];
const light_yellow = [255, 255, 60];
const orange = [255, 140, 0];
const color=[];

class App extends React.Component {
  state = {
    pict: undefined,
    temp: undefined,
    temp_min: undefined,
    temp_max: undefined,
    wind: undefined,
    clouds: undefined, 
    pressure: undefined,
    city: undefined,
    country: undefined,
    flag: undefined,
    weather: undefined,
    err: undefined,
    addModalShow: false,
    lat: undefined,
    lon: undefined,
    result: undefined,
    data:undefined
  }

  addModalAllow = () => {
    this.setState({result:true, addModalShow:false});
  }

  addModalCancel = () => {
    this.setState({addModalShow:false, result:false});
  }

  colorOfTemp = () => {
    const data=this.state.data;
    const current_temp = this.state.temp;
    if(current_temp<-9){
      document.body.style.backgroundColor="rgb("+aqua.join()+")";
    }else if(current_temp===10){
      document.body.style.backgroundColor="rgb("+yellow.join()+")";
    }else if(current_temp===30 || current_temp>30){
      document.body.style.backgroundColor="rgb("+orange.join()+")";
    }else if(data.cod==="400" || data.cod==="404"){
      document.body.style.backgroundColor="#fff";
    }else{
      if(current_temp>-10 && current_temp<1){
        for(let i=0; i<3; i++){
          color[i] = blue[i]*0.9 + aqua[i]*0.1;
          document.body.style.backgroundColor="rgb("+color.join()+")";
        }
      }else if(current_temp>0 && current_temp<10){
        for(let i=0; i<3; i++){
          color[i] = yellow[i]*0.1 + light_yellow[i]*0.9;
          document.body.style.backgroundColor="rgb("+color.join()+")";
        }
      }else if(current_temp>10 && current_temp<20){
        for(let i=0; i<3; i++){
          color[i] = yellow[i]*0.7 + orange[i]*0.3;
          document.body.style.backgroundColor="rgb("+color.join()+")";
        }
      }else{
        for(let i=0; i<3; i++){
          color[i] = yellow[i]*0.5 + orange[i]*0.5;
          document.body.style.backgroundColor="rgb("+color.join()+")";
        }
      }
    }
  }
  
  weatherOfLocation = async () => {
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=${api_key}`);
    const data = await api_url.json();
    console.log(data);
    this.setState({data: data});

    this.setState({
      addModalShow:false,
      pict: (await fetch(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)).url,
      temp: data.main.temp-273.15
    });
    
    this.colorOfTemp();
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
    const data = await api_url.json();
    this.setState({data: data});
      
    if(city==="" || data.cod==="404"){
      this.setState({
        pict: undefined,
        temp: undefined,
        temp_min: undefined,
        temp_max: undefined,
        wind: undefined,
        clouds: undefined, 
        pressure: undefined,
        city: undefined,
        country: undefined,
        flag: undefined,
        weather: undefined,
        err: data.message
      });
    }else{
      this.setState({
        pict: (await fetch(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)).url,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        wind: data.wind.speed,
        clouds: data.clouds.all, 
        pressure: data.main.pressure,
        city: data.name,
        country: data.sys.country,
        flag: (await fetch(`http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`)).url,
        weather: data.weather[0].description,
        err: undefined
      });
    }
  
    this.colorOfTemp();
  }

  componentDidMount(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          this.setState({addModalShow:true, lat:position.coords.latitude, lon:position.coords.longitude });
        }
      ); 
    }
  }

  handleOnChange = (e) => {
    this.setState({temp: e.target.value});
    console.log(this.state.temp);
    this.colorOfTemp();
  }
    
  render(){
  
    return(
      <div className="block">
        {this.state.addModalShow &&
          <DialogIcon
            show={this.state.addModalShow}
            allow={this.addModalAllow}
            cancel={this.addModalCancel}
            lat={this.state.lat}
            lon={this.state.lon}
          />
        }
            
        {this.state.result &&
          <div>
            <Location 
                  weather={this.weatherOfLocation}
                  pict={this.state.pict}
              />
              <Styles>
                  <input
                    type="range"
                    min={-30} max={40}
                    value={this.state.temp}
                    className="slider"
                    onChange={this.handleOnChange}
                  />
                  <div className="value">{this.state.temp}°C</div>
              </Styles>
          </div>
        }      
            
        {this.state.result===false &&
          <div className="wrapper">
            <div className="container">
              <Info />
              <Form getMethod = {this.getWeather} />
              <Weather 
                pict = {this.state.pict}
                temp = {this.state.temp}
                temp_min = {this.state.temp_min}
                temp_max = {this.state.temp_max}
                wind = {this.state.wind}
                clouds = {this.state.clouds} 
                pressure = {this.state.pressure}
                city = {this.state.city}
                country = {this.state.country}
                flag = {this.state.flag}
                weather = {this.state.weather}
                err = {this.state.err} 
              />
            </div>
          </div>
        }
      </div>
    );
  }  
}

export default App;