import Multiselect from "multiselect-react-dropdown"
import React, { useState } from "react"

export default function CogenerationUnitCalculation() {

    const [fuelConsumption, setFuelConsumption] = useState(0)
    const [fuelType, setFuelType] = useState(null)
    const [cogenerationUnitEfficiencyElectrical, setCogenerationUnitEfficiencyElectrical] = useState(0)
    const [cogenerationUnitEfficiencyHeat, setCogenerationUnitEfficiencyHeat] = useState(0)
    const [coolantConsumption, setCoolantConsumption] = useState(0)
    const [coolantTemperature, setCoolantTemperature] = useState(0)

    const [powerElectricalCalculation, setPowerElectricalCalculation] = useState('')
    const [powerHeatCalculation, setPowerHeatCalculation] = useState('')
    const [temperatureCalculation, setTemperatureCalculation] = useState('')

    const fuelTypes = [
        {name: 'природний газ', Q: 9.5},
        {name: 'вугілля', Q: 7},
        {name: 'пелети з деревини', Q: 4.2},
        {name: 'дизельне паливо', Q: 12},
    ]

    const onSubmitForm = (e) => {
        e.preventDefault()

        const N = fuelConsumption * fuelType.Q * cogenerationUnitEfficiencyElectrical / 100
        const Q = fuelConsumption * fuelType.Q * cogenerationUnitEfficiencyHeat / 100
        const T = coolantTemperature + 100 * Q / (4.187 * coolantConsumption)

        setPowerElectricalCalculation(N.toFixed(6))
        setPowerHeatCalculation(Q.toFixed(6))
        setTemperatureCalculation((+T).toFixed(2))
    }

    return (
        <div>
            <div className="h1">
                Когенеративна установка
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
                        <label htmlFor="cogenerationUnitEfficiencyElectrical" className="form-label">ККД виробництва електричної енергії %</label>
                        <input type="number" step="0.01" className="form-control" id="cogenerationUnitEfficiencyElectrical" onChange={(e) => setCogenerationUnitEfficiencyElectrical(+e.target.value)}/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="cogenerationUnitEfficiencyHeat" className="form-label">ККД виробництва теплової енергії %</label>
                        <input type="number" step="0.01" className="form-control" id="cogenerationUnitEfficiencyHeat" onChange={(e) => setCogenerationUnitEfficiencyHeat(+e.target.value)}/>
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="coolantConsumption" className="form-label">Витрати теплоносія в системі опалення(кг/год)</label>
                        <input type="number" step="0.01" className="form-control" id="coolantConsumption" onChange={(e) => setCoolantConsumption(+e.target.value)}/>
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="coolantTemperature" className="form-label">Температура теплоносія на вході в когенераційну установку(°С)</label>
                        <input type="number" step="0.01" className="form-control" id="coolantTemperature" onChange={(e) => setCoolantTemperature(+e.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Розрахувати</button>
                </div>
            </form>
            {!!powerElectricalCalculation && !!powerHeatCalculation && !!temperatureCalculation &&
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2">
                                <label htmlFor="powerElectricalCalculation" className="form-label">Потужність когенераційної установки електрична</label>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <input type="number" className="form-control" id="powerElectricalCalculation" value={powerElectricalCalculation} disabled/>
                                    </div>
                                    <div className="col-2">
                                        кВт
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-2">
                                <label htmlFor="powerHeatCalculation" className="form-label">Потужність когенераційної установки теплова</label>
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
                                <label htmlFor="temperatureCalculation" className="form-label">Температура теплоносія після нагріву води в когенераційній установці</label>
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