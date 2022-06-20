import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [date, setDate] = useState(new Date());
  const [localDate, setLocalDate] = useState();
  const [isActive, setIsActive] = useState(true);
  const [isActiveLocal, setIsActiveLocal] = useState(true);
  const [location, setLocation] = useState();

  useEffect(() => {
    fetchDate()
  }, [])

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setDate(new Date());
      }, 1000)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive])

  useEffect(() => {
    let interval = null;
    if (isActiveLocal) {
      interval = setInterval(() => {
        setLocalDate(new Date().toLocaleTimeString('en-US', {
          timeZone: location,
        }))
      }, 1000)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActiveLocal])

  const toggle = () => {
    setIsActive(!isActive);
  }
  const toggleLocal = () => {
    setIsActiveLocal(!isActiveLocal);
  }

  const fetchDate = async () => {
    let data = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Hong_Kong')
    if (data.status === 200) {
      let localTime = new Date()
      setLocalDate( localTime.toLocaleTimeString('en-US', {
        timeZone: data.data.timezone,
      }))
      setLocation(data.data.timezone)
    }
  }

  return (
    <div className="App">
      <h1>
        {date.toLocaleTimeString()}
      </h1>
      <button onClick={() => toggle()}>{isActive ? 'stop' : 'start'}</button>
      <h1>
        {localDate}
      </h1>
      <button onClick={() => toggleLocal()}>{isActiveLocal ? 'stop' : 'start'}</button>
    </div>
  );
}

export default App;
