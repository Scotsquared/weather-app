import { Button, StylesProvider } from "@material-ui/core";
import { getCurrentPosition } from "utils/common";
import React, { useEffect, useState } from 'react';
import { getWeather } from "api/weatherservice";
import DailyCard from "components/widgets/DailyCard";
import { blue } from "@material-ui/core/colors";
import moment  from 'moment';

const MOCK_WEATHER = require("mocks/weather.json");
const dateBuilder = (d)=> {
  let months= ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
  "Saturday"];
  
  let day= days[d.getDay()];
  let date= d.getDate();
  let month= months[d.getMonth()];
  let year = d.getFullYear();
  
  return `${day} ${date} ${month} ${year}`
  }

const Body = props => {
  // const { daily } = MOCK_WEATHER;
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true)
    try{
      const weather = await getWeather();
         setDaily(weather.daily);
     } catch (error) {
     }
    const weather = await getWeather();
    setDaily(weather.daily);
    setLoading(false);
  }
  const renderWeek = () => {
    return !!daily && daily.map(day => <DailyCard day={day} />);
  }
  const DATE_TIME_FORMAT = 'MMMM Do YYYY';
  moment.unix(1608055200).format(DATE_TIME_FORMAT);
  
  return (
    
    <div>
      <Button onClick={onClick} style = {styles.Button}>

        Find location
        </Button>
        {!loading && <div className= "Card-Container">{renderWeek()}</div>}
      {loading && <p>LOADING...</p>}
      <div className="location-box">
      </div>
    </div>
  );
};
let styles = {
  Button: {
    position: 'absolute',
    Alignself: 'center',
    bottom: '15%',
    right: '41.9%',
        fontSize: 40,
        fontWeight: 300,
        textAlign: 'center',
        textShadow: 3,
        color: '#fff',
        display: 'inline',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 50,
        fontFamily: 'Roboto',
  },
}
export default Body;