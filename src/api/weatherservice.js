import {getCurrentPosition} from 'utils/common';
async function getWeather () {
    try {
        const { latitude, longitude } = await getCurrentPosition();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minute&appid=653aaf4bb81bfca368d07eb201116874`
      );
      const data = await response.json()
      return data;
    } catch (error) {
      console.log(error);
    }
}
    export {getWeather};
