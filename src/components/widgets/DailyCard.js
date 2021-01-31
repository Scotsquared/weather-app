import React from 'react';
import date from './Body/Body'
import moment from 'moment'
import { StyleSheet, Text, View } from "react-dom"
import { SportsRugbySharp } from '@material-ui/icons';
const DailyCard = props => {
    const { day } = props;
    const { temp, weather } = day
    const DATE_TIME_FORMAT = 'MMMM Do YYYY';
    const iconurl = "http://openweathermap.org/img/w/" + `${weather[0].icon}` + ".png"
    moment.unix().format(DATE_TIME_FORMAT);
    const formatedDateTime =(dt)=> moment.unix(1608038225).format(DATE_TIME_FORMAT);
    return <div className="Daily-Card">

        {/* <p>{id}</p> */}
        <img src={iconurl} className="weather-icon" alt="" />
        <div style={styles.container}>{temp.day}<sup>o</sup></div>
        <div style={styles.date}>{moment.unix(day.dt).format('dddd MMM YYYY')}</div>
        <p>{weather[0].description}</p>
        <div style={styles.minMax}>      {temp.min}<sup>o</sup>/{temp.max}<sup>o</sup></div>



    </div>
};
let styles = {
    container: {
        position: 'realative',
        display: 'inline-block',
        margin: 10,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 16,

        paddingHorizontal: 15,
        paddingVertical: 10,

        color: '#fff',
        fontSize: 102,
        fontWeight: 900,

        textShadow: 3,
        textShadow: "rgba(50, 50, 70, 0.5)",
        textAlign: 'center',
    },
    minMax: {
        position: 'realative',
        fontSize: 32,
        fontWeight: 300,
        textAlign: 'center',
        textShadow: 3,
    },
    date: {
        position: 'absoulte',
        paddingHorizontal: 100,
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: 300,
    }
}
export default DailyCard;