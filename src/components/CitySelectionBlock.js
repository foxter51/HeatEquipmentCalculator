import React, { useState, useEffect } from "react"
import LoadingEffect from "./LoadingEffect"
import weatherService from "../service/weatherService"
import Multiselect from 'multiselect-react-dropdown'

export default function CitySelectionBlock({setLat, setLon}) {

    const [selectedCity, setSelectedCity] = useState('')

    const [citiesList, setCitiesList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getCitiesList = async () => {
            try {
                setLoading(true)
                const response = await weatherService.getCitiesList()
                setCitiesList(response.data)
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        getCitiesList()
    }, [])

    if(loading) {
        return <LoadingEffect/>
    }

    return (
        <div className="mb-2">
            <div className="h3">
                Оберіть місто
            </div>
            {error}
            <Multiselect className="mb-2"
                options={citiesList.toSorted((a, b) => a.city.localeCompare(b.city))}
                singleSelect={true}
                selectedValues={[]}
                loading={loading}
                onSelect={(selectedList, selectedItem) => {
                    setSelectedCity(selectedItem.city)
                    setLat(selectedItem.lat)
                    setLon(selectedItem.lng)
                    }
                }
                displayValue="city"
            />
            {selectedCity && <div className="h4">Обране місто: {selectedCity}</div>}
        </div>
    )
}