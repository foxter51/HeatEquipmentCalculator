import React, { useState } from "react"
import CitySelectionBlock from "./CitySelectionBlock"
import ForecastFetchBlock from "./ForecastFetchBlock"

export default function RegenerativeHeatExchanger() {

    const [peopleCount, setPeopleCount] = useState(0)
    const [airExchangePerPerson, setAirExchangePerPerson] = useState(0)
    const [regenerativeHeatExchangerEfficiency, setRegenerativeHeatExchangerEfficiency] = useState(0)

    const [insideTemperature, setInsideTemperature] = useState(0)

    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [temperatureOutsideNow, setTemperatureOutsideNow] = useState(0)

    const [airExchangeInsideCalculation, setAirExchangeInsideCalculation] = useState('')
    const [powerHeatCalculation, setPowerHeatCalculation] = useState('')
    const [decreaseHeatCalculation, setDecreaseHeatCalculation] = useState('')

    const onSubmitForm = (e) => {
        e.preventDefault()

        const airExchange = airExchangePerPerson * peopleCount
        const Qair = (insideTemperature - temperatureOutsideNow) * airExchange / 3600
        const Qrhe = Qair * regenerativeHeatExchangerEfficiency / 100
        const Qdecr = Qair - Qrhe

        setAirExchangeInsideCalculation(airExchange.toFixed(6))
        setPowerHeatCalculation(Qrhe.toFixed(6))
        setDecreaseHeatCalculation(Qdecr.toFixed(6))
    }

    return (
        <div>
            <div className="h1">
                Рекуперативний теплообмінник
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
                                    setTemperatureNow={setTemperatureOutsideNow}
                                />
                            }

                            {!!temperatureOutsideNow && <div>Температура в місті: {temperatureOutsideNow} °С</div>}
                        </div>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="peoplesCount" className="form-label">Кількість людей, що проживає в помешканні</label>
                        <input type="number" className="form-control" id="peoplesCount" onChange={(e) => setPeopleCount(+e.target.value)}/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="airExchangePerPerson" className="form-label">Нормативний повітряобмін на одну людину(м3)</label>
                        <input type="number" step="0.01" className="form-control" id="airExchangePerPerson" onChange={(e) => setAirExchangePerPerson(+e.target.value)}/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="regenerativeHeatExchangerEfficiency" className="form-label">ККД рекуператора %</label>
                        <input type="number" step="0.01" className="form-control" id="regenerativeHeatExchangerEfficiency" onChange={(e) => setRegenerativeHeatExchangerEfficiency(+e.target.value)}/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="insideTemperature" className="form-label">Температура в приміщенні(°С)</label>
                        <input type="number" step="0.01" className="form-control" id="insideTemperature" onChange={(e) => setInsideTemperature(+e.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Розрахувати</button>
                </div>
            </form>
            {!!airExchangeInsideCalculation && !!powerHeatCalculation && decreaseHeatCalculation &&
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2">
                                <label htmlFor="airExchangeCalculation" className="form-label">Нормативний повітряобмін для даного помешкання</label>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <input type="number" className="form-control" id="airExchangeCalculation" value={airExchangeInsideCalculation} disabled/>
                                    </div>
                                    <div className="col-2">
                                        м3
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-2">
                                <label htmlFor="rhePowerCalculation" className="form-label">Теплова потужність рекуператора</label>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <input type="number" className="form-control" id="rhePowerCalculation" value={powerHeatCalculation} disabled/>
                                    </div>
                                    <div className="col-4">
                                        кВт
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-2">
                                <label htmlFor="heatDecreaseCalculation" className="form-label">Зменшення споживання енергії</label>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <input type="number" className="form-control" id="heatDecreaseCalculation" value={decreaseHeatCalculation} disabled/>
                                    </div>
                                    <div className="col-4">
                                        кВт
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