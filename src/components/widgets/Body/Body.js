import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { getCurrentPosition } from 'utils/common';
import { getWeather } from 'api/weatherservice';
import DailyCard from 'components/widgets/DailyCard';
import moment from 'moment';
import NearMeIcon from '@material-ui/icons/NearMe';

const Body = (props) => {
  const [query, setQuery] = useState('');
  const [daily, setDaily] = useState(null);
  const [tempUnit, setTempUnit] = useState('C');
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState(null);
  const [showLocations, setShowLocations] = useState(false);
  const locationInput = useRef(null);

  const doGetWeather = async (lat, lng) => {
    const weather = await getWeather(lat, lng);
    setDaily(weather.daily);
  };

  const onClick = async (lat, lng) => {
    setLoading(true);
    try {
      if (!lat && !lng) {
        const { latitude, longitude } = await getCurrentPosition();
        doGetWeather(latitude, longitude);
        setLoading(false);
        setShowLocations(false);

        return;
      }
      doGetWeather(lat, lng);
      setLoading(false);
      setShowLocations(false);

    } catch (error) {}
  };

  const search = async (evt) => {
    if (evt.key === 'Enter') {
      try {
        const response = await fetch(
          `http://api.positionstack.com/v1/forward?access_key=03649c9ca4faa75a73e70c796162dab1&query=${query}`
        );
        const { data } = await response.json();
        setLocations(data);
        setShowLocations(true);
        setQuery('');
        return;
      } catch (error) {
        console.log({ error });
      }
    }
  };
  const renderWeek = () => {
    return (
      !!daily && daily.map((day) => <DailyCard day={day} unit={tempUnit} />)
    );
  };
  const DATE_TIME_FORMAT = 'MMMM Do YYYY';
  moment.unix(1608055200).format(DATE_TIME_FORMAT);
  const renderLocations = () => {
    return (
      locations &&
      locations.map((_location) => {
        const { latitude, longitude } = _location;
        return (
          <MenuItem
            onClick={() => onClick(latitude, longitude)}
          >
            {_location.label}
          </MenuItem>
        );
      })
    );
  };
  return (
    <div style={{height: '100vh',}}> 
      <div
        style={{
          alignSelf: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          opacity: 1,
          opacityHover: 1,
          margin: 0,
          color: '#fff',
          fontFamily: 'Roboto',
          backgroundColor: 'rgba(0, 0, 40, 0.1)',
        }}
      >
        <div
          className="location"
          style={{ alignSelf: 'center', margin: 0, color: '#fff', paddingTop: '3rem' }}
        >
          <TextField
            style={styles.searchBar}
            className="search-bar"
            label="LOCATION"
            variant="outlined"
            placeholder="Search..."
            onChange={({ target: { value } }) => setQuery(value)}
            value={query}
            onKeyPress={search}
            ref={locationInput}
          />
          <Menu style={{ color: '#fff ' }} open={showLocations} anchorEl={locationInput.current}>{renderLocations()}</Menu>
        </div>
        <FormControl
          component="fieldset"
          style={{ alignSelf: 'center', margin: 10, color: '#fff' }}
        >
          <RadioGroup
            row
            aria-label="temp-unit"
            name="temp-unit"
            defaultValue="F"
            onChange={({ target: { value } }) => setTempUnit(value)}
            className="temp-unit"
          >
            <FormControlLabel
              value="F"
              control={<Radio color="primary" />}
              label="F"
            />
            <FormControlLabel
              value="C"
              control={<Radio color="primary" />}
              label="C"
            />
          </RadioGroup>
        </FormControl>
        <Button onClick={() => onClick()} style={styles.button}>
          Find current location
        </Button>
      </div>
      {!loading && <div className="Card-Container">{renderWeek()}</div>}
      {loading && <p>LOADING...</p>}
    </div>
  );
};

const styles = {
  searchBar: {
    padding: '15px',
    margin: 10,
    boxShadow: 0,
    boxShadowColor: 'rgba(255, 255, 255, 0.5)',
    outline: 'none',
    borderRadius: 16,
    marginTop: -25,
    textShadow: 3,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    opacity: 1,
  },
  button: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 300,
    textAlign: 'center',
    textShadow: 3,
    color: '#fff',
    display: 'inline',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    fontFamily: 'Roboto',
    opacity: 1,
  },
};

const CurrentLocationButton = (props) => {
  const { location, setLocation, setWeather } = useContext(Location);
  const { form, setLoading } = props;

  const onClick = async () => {
    const { address } = form;
    if (address) {
      return;
    }
    setLoading(true);
    try {
      const { latitude, longitude } = await getCurrentPosition(setLocation);

      const canGetWeather =
        (latitude && longitude) || (location.latitude && location.longitude);
      if (canGetWeather) {
        const weatherResponse = await getWeather(
          latitude ? latitude : location.latitude,
          longitude ? longitude : location.longitude
        );
        setWeather(weatherResponse);
      }
    } catch (error) {
      console.log({ error });
    }
    setLoading(false);
  };

  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="use current location"
        onClick={onClick}
        edge="end"
      >
        <NearMeIcon />
      </IconButton>
    </InputAdornment>
  );
};

export default Body;
        