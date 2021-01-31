import logo from './logo.svg';
import './App.css';
import { Header, Body } from './components/widgets';
import  getCurrentPosition  from 'utils/common';
import DailyCard from 'components/widgets/DailyCard';
function App() {

  return (
    
    <div className="App">
      <div className="location-box\">
      </div>
      <div className="weather-box"></div>
      <div className="temp-min-max-daily-description-icon"></div>

      <Header />
      <Body />
    </div>
  );
}

export default App;
