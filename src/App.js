import "./App.css";
import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import keys from "./key";
import axios from "axios";

//weather sample hot: kenya cold: russia

const api = {
  key: keys.API_KEY,
  url: keys.BASE_URL,
};

const today = dateFormat(new Date(), "fullDate");

function App() {
  const [country, setCountry] = useState("Thailand");
  const [weather, setWeather] = useState({});

  const showWeather = async (e) => {
    if (e.key === "Enter") {
      await getWeather();
    }
  };

  const getWeather = () => {
    axios
      .get(`${api.url}weather?q=${country}&appid=${api.key}&units=metric`)
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          setWeather(data);
          setCountry("");
        }
      });
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div
      className={
        weather.id
          ? weather.main.temp < 5
            ? "App cold"
            : weather.main.temp > 30
            ? "App hot"
            : "App"
          : "App"
      }
    >
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="search..."
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          onKeyPress={showWeather}
        ></input>
      </div>
      {weather.id && (
        <div className="content-container">
          <div className="country"> {weather.name}</div>
          <div className="date">{today}</div>
          <div className="temperature"> {Math.round(weather.main.temp)}°C </div>
          <div className="description">{weather.weather[0].description}</div>
        </div>
      )}
    </div>
  );
}

export default App;
