import React from 'react';
import moment from 'moment'

import { temperature } from 'utils/common';
const DailyCard = props => {
    const { day, unit } = props;
    const { temp, weather } = day
    const DATE_TIME_FORMAT = 'dddd MMM YYYY';
    const iconurl = "http://openweathermap.org/img/w/" + `${weather[0].icon}` + ".png"

    return <div className="Daily-Card">

        <img src={iconurl} className="weather-icon" alt="" />
        <div style={styles.container}>{temperature(temp.day, unit)}<sup>o</sup></div>
        <div style={styles.date}>{moment.unix(day.dt).format(DATE_TIME_FORMAT)}</div>
        <p>{weather[0].description}</p>
        <div style={styles.minMax}>{temperature(temp.min, unit)}<sup>o</sup>/{temperature(temp.max, unit)}<sup>o</sup></div>



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

        textShadow: "rgba(50, 50, 70, 0.5)",
        textAlign: 'center',
        paddingRight: 10,
        paddingLeft: 10,
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