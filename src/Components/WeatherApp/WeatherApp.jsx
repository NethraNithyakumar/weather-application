import React, { useState,useEffect } from 'react'
import styles from './WeatherApp.css'
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import cloudyy from '../Assets/cloudyy.jpg';
import dizzlyy from '../Assets/dizzlyy.jpg';
import rains from '../Assets/rains.jpg';
import snowman from '../Assets/snowman.jpg';
import clearr from '../Assets/clearr.jpeg';
import broken_icon from '../Assets/broken.png';
import clouds from '../Assets/clouds.jpg';



export const WeatherApp = () => {
  let api_key="81879ccb9d18e3b7ce2cb1d8a3db9575";
  const[wicon,setWicon] = useState(cloud_icon);
  const [backgroundImage, setBackgroundImage] = useState(cloudyy); // Default background image
  
  useEffect(() => {
    // Function to set background image based on weather icon
    const setBackgroundBasedOnWeather = () => {
      if (wicon === clear_icon) {
        setBackgroundImage(clearr);
      } else if (wicon === cloud_icon ) {
        setBackgroundImage(clouds);
      } else if (wicon === drizzle_icon) {
        setBackgroundImage(dizzlyy);
      }
        else if (wicon === rain_icon) {
        setBackgroundImage(rains);
      } else if (wicon === snow_icon) {
        setBackgroundImage(snowman);
      } else if (wicon === broken_icon) {
        setBackgroundImage(cloudyy);
      }  else {
        setBackgroundImage(cloudyy); // Default background image
      }
    };

    setBackgroundBasedOnWeather();
  }, [wicon]);

  const search = async () =>{
    const element = document.getElementsByClassName("cityInput");
    if(element[0].value===""){
      return 0;
    }
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    let response = await fetch(url);
    let data = await response.json(); 
    const humidity = document.getElementsByClassName("humdity-percent");
    const wind = document.getElementsByClassName("Wind-speed");
    const temrature = document.getElementsByClassName("Weather-temp");
    const location = document.getElementsByClassName("Weather-location");
    humidity[0].innerHTML= data.main.humidity+"%";
    wind[0].innerHTML = Math.floor(data.wind.speed)+"km/h";
    temrature[0].innerHTML = Math.floor(data.main.temp)+"°C";
    location[0].innerHTML = data.name;

    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
    {
      setWicon(clear_icon);
    }
    else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
    {
      setWicon(cloud_icon);
    }
    else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
    {
      setWicon(cloud_icon);
    }
    else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
    {
      setWicon(broken_icon);
    }
    else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
    {
      setWicon(drizzle_icon);
    }
    else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
    {
      setWicon(rain_icon);
    }
    else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
    {
      setWicon(snow_icon);
    }
    else{
      setWicon(clear_icon);      
    }

  }
  return (
    <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',}}>
      <div className="card">
        <div className='top-bar'>
            <input type='text' className='cityInput' placeholder='search' />
            <div className="search_icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="Weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="Weather-temp">30°C</div>
        <div className="Weather-location">Chennai</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} style={{paddingTop:"15px"}} alt="" />
            <div className="data">
              <div className="humdity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} style={{paddingTop:"15px"}} alt="" />
            <div className="data">
              <div className="Wind-speed">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
          </div>
    </div>
        
    </div>
    
  )
}