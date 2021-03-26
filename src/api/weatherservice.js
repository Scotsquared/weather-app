
async function getWeather(lat,lng) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,minute&appid=653aaf4bb81bfca368d07eb201116874`
    );
    const data = await response.json()
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getWeather };
