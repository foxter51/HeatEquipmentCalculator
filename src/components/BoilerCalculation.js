import Multiselect from "multiselect-react-dropdown"
import React, { useState } from "react"

export default function BoilerCalculation() {

    const [fuelConsumption, setFuelConsumption] = useState(0)
    const [fuelType, setFuelType] = useState(null)
    const [boilerEfficiency, setBoilerEfficiency] = useState(0)
    const [coolantConsumption, setCoolantConsumption] = useState(0)
    const [coolantTemperature, setCoolantTemperature] = useState(0)

    const [powerCalculation, setPowerCalculation] = useState('')
    const [temperatureCalculation, setTemperatureCalculation] = useState('')

    const fuelTypes = [
        {name: 'природний газ', Q: 9.5},
        {name: 'вугілля', Q: 7},
        {name: 'пелети з деревини', Q: 4.2},
        {name: 'дизельне паливо', Q: 12},
    ]

    const onSubmitForm = (e) => {
        e.preventDefault()

        const Q = fuelConsumption * fuelType.Q * boilerEfficiency / 100 / 3600
        const T = coolantTemperature + 3600 * Q / (4.187 * coolantConsumption)

        setPowerCalculation(Q.toFixed(6))
        setTemperatureCalculation((+T).toFixed(2))
    }

    return (
        <div>
            <div className="h1">
                Котел
            </div>
            <form onSubmit={onSubmitForm} className="mb-2">
                <div className="form-group">
                    <div className="mb-2">
                        <label htmlFor="fuelConsumption" className="form-label">Витрата палива(кг/год, м3/год, л/год)</label>
                        <input type="number" step="0.01" className="form-control" id="fuelConsumption" onChange={(e) => setFuelConsumption(+e.target.value)}/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="fuelType" className="form-label">Тип палива</label>
                        <Multiselect className="mb-2" id="fuelType"
                            options={fuelTypes}
                            singleSelect={true}
                            selectedValues={[]}
                            onSelect={(selectedList, selectedItem) => { setFuelType(selectedItem) }}
                            displayValue="name"
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="boilerEfficiency" className="form-label">ККД котла %</label>
                        <input type="number" step="0.01" className="form-control" id="boilerEfficiency" onChange={(e) => setBoilerEfficiency(+e.target.value)}/>
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="coolantConsumption" className="form-label">Витрати теплоносія в системі опалення(кг/год)</label>
                        <input type="number" step="0.01" className="form-control" id="coolantConsumption" onChange={(e) => setCoolantConsumption(+e.target.value)}/>
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="coolantTemperature" className="form-label">Температура теплоносія на вході в котел(°С)</label>
                        <input type="number" step="0.01" className="form-control" id="coolantTemperature" onChange={(e) => setCoolantTemperature(+e.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Розрахувати</button>
                </div>
            </form>
            {!!powerCalculation && !!temperatureCalculation &&
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2">
                                <label htmlFor="powerCalculation" className="form-label">Потужність котла</label>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <input type="number" className="form-control" id="powerCalculation" value={powerCalculation} disabled/>
                                    </div>
                                    <div className="col-2">
                                        кВт
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-2">
                                <label htmlFor="temperatureCalculation" className="form-label">Температура теплоносія після нагріву води в котлі</label>
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