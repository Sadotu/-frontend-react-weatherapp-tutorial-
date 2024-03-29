import React, { useEffect, useState } from 'react';
import './TodayTab.css';
import axios from 'axios';
import WeatherDetail from '../../components/weatherDetail/WeatherDetail';
import createTimeString from '../../helpers/createTimeString';

const apiKey = '7e0199acd689491480a2415b0abe1de2';

function TodayTab({ coordinates }) {
    const [forecasts, setForecasts] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchForecast() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&lang=nl`);
                console.log(response.data);
                setForecasts(response.data.list.slice(0, 3));

            } catch(e) {
                console.error(e);
                toggleError(true);
            }

            toggleLoading(false);
        }
        if (coordinates) {
            fetchForecast();
        }
    }, [coordinates]);

    return(
        <div className="tab-wrapper">
            <div className="chart">
                {forecasts.map((forecast) => {
                    //console.log(forecast.weather[0].main)
                    return <WeatherDetail
                        key={forecast.dt}
                        temp={forecast.main.temp}
                        type={forecast.weather[0].main}
                        description={forecast.weather[0].description}
                    />
                })}
            </div>
            <div className="legend">
                {forecasts.map((forecast) => {
                    return <span key={`${forecast.dt}-timestamp`}>{createTimeString(forecast.dt)}</span>
                })}
            </div>
            {error && <span>Het ophalen van de voorspellingen is mislukt. Probeer het opnieuw.</span>}
            {loading && (<span>Loading...</span>)}
        </div>
    );
}

export default TodayTab;