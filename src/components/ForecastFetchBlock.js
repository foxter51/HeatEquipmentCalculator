import React, { useState } from "react"
import LoadingEffect from "./LoadingEffect"
import weatherService from "../service/weatherService"

export default function ForecastFetchBlock({ lat, lon, setTemperatureNow }) {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchForecast = async (lat, lon) => {
        try{
            setLoading(true)

            const response = await weatherService.getsCurrentWeather(lat, lon)

            setTemperatureNow(response.data.main.temp)
        } catch (error) {
            setError(error.response.data.message)
        }
        setLoading(false)
    }

    if(loading) {
        return <LoadingEffect/>
    }

    return (
        <div className="mb-2">
            {error}
            <button className="btn btn-primary"
                    onClick={() => fetchForecast(lat, lon)}>
                Отримати прогноз погоди
            </button>
        </div>
    )
}