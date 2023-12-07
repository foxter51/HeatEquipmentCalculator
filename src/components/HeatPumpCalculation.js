import React, { useState } from "react"
import CitySelectionBlock from "./CitySelectionBlock"
import ForecastFetchBlock from "./ForecastFetchBlock"
import CoefficientTableForm from "./CoefficientTableForm"

export default function HeatPumpCalculation() {

    const [heatPumpPowerElectrical, setHeatPumpPowerElectrical] = useState(0)

    const [coefficientTable, setCoefficientTable] = useState([])

    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [temperatureNow, setTemperatureNow] = useState(0)

    const [coolantConsumption, setCoolantConsumption] = useState(0)
    const [coolantTemperature, setCoolantTemperature] = useState(0)

    const [powerHeatCalculation, setPowerHeatCalculation] = useState('')
    const [temperatureCalculation, setTemperatureCalculation] = useState('')

    const onSubmitForm = (e) => {
        e.preventDefault()

        const deltaT = Math.abs(temperatureNow - coolantTemperature)

        const nearest = coefficientTable.reduce((prev, curr) => {
            return (Math.abs(curr.delta_t - deltaT) < Math.abs(prev.delta_t - deltaT) ? curr : prev)
        })

        const coefficient = nearest.coefficient

        const Q = heatPumpPowerElectrical * coefficient
        const T = coolantTemperature + 3600 * Q / (4.187 * coolantConsumption)
        
        setPowerHeatCalculation(Q.toFixed(6))
        setTemperatureCalculation(T.toFixed(2))
    }

    return (
        <div>
            <div className="h1">
                Тепловий насос
            </div>
            <form onSubmit={onSubmitForm} className="mb-2">
                <div className="form-group">
                    <div className="card mb-2">
                        <div className="card-body">
                            <CitySelectionBlock
                                setLat={setLat}
                                setLon={setLon}
                            />

                            {!!lat && !!lon &&
                                <ForecastFetchBlock
                                    lat={lat}
                                    lon={lon}
                                    setTemperatureNow={setTemperatureNow}
                                />
                            }

                            {!!temperatureNow && <div>Температура в місті: {temperatureNow} °С</div>}
                        </div>
                    </div>

                    <div className="card mb-2">
                        <div className="card-body">
                            <CoefficientTableForm
                                setCoefficientTable={setCoefficientTable}
                            />
                        </div>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="heatPumpPower" className="form-label">Електрична потужність теплового насосу(кВт)</label>
                        <input type="number" step="0.01" className="form-control" id="heatPumpPower" onChange={(e) => setHeatPumpPowerElectrical(+e.target.value)}/>
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="coolantConsumption" className="form-label">Витрати теплоносія в системі опалення(кг/год)</label>
                        <input type="number" step="0.01" className="form-control" id="coolantConsumption" onChange={(e) => setCoolantConsumption(+e.target.value)}/>
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="coolantTemperature" className="form-label">Температура теплоносія на вході в тепловий насос(°С)</label>
                        <input type="number" step="0.01" className="form-control" id="coolantTemperature" onChange={(e) => setCoolantTemperature(+e.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Розрахувати</button>
                </div>
            </form>
            {!!powerHeatCalculation && !!temperatureCalculation &&
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2">
                                <label htmlFor="powerHeatCalculation" className="form-label">Потужність теплового насосу теплова</label>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <input type="number" className="form-control" id="powerHeatCalculation" value={powerHeatCalculation} disabled/>
                                    </div>
                                    <div className="col-2">
                                        кВт
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-2">
                                <label htmlFor="temperatureCalculation" className="form-label">Температура теплоносія після нагріву води в теплообміннику насосу</label>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <input type="number" className="form-control" id="temperatureCalculation" value={temperatureCalculation} disabled/>
                                    </div>
                                    <div className="col-4">
                                        °С
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}