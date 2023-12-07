import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"

export default function TableRow({ tableRows, setTableRows, id}) {

    const [coefficient, setCoefficient] = useState("")
    const [deltaT, setDeltaT] = useState("")

    const addTableRow = () => {
        const indexOfExistingRow = tableRows.findIndex(row => row.id === id)

        if(indexOfExistingRow !== -1) {
            setTableRows(prevState => {
                prevState[indexOfExistingRow].coefficient = coefficient
                prevState[indexOfExistingRow].delta_t = deltaT
                return [...prevState]
            })
        } else {
            setTableRows([...tableRows,
                {
                    id: id,
                    coefficient: coefficient,
                    delta_t: deltaT
                }
            ])
        }
    }

    return (
        <div className="mb-2">
            <div className="row">
                <div className="col">
                    <label htmlFor="windSpeed" className="form-label">Коефіцієнт трансформації теплового насосу</label>
                    <input type="number"
                           id="epsilon"
                           value={coefficient}
                           className="form-control"
                           onChange={(e) => setCoefficient(e.target.value)}
                    />
                </div>

                <div className="col">
                    <label htmlFor="power" className="form-label">Різниця температури води на вході
                        та виході з теплообмінника</label>
                    <input type="number"
                           id="deltaTemperature"
                           value={deltaT}
                           className="form-control"
                           onChange={(e) => setDeltaT(e.target.value)}
                    />
                </div>

                <div className="col-1 d-flex align-items-center">
                    <div className="d-flex justify-content-between">
                        {coefficient !== "" && deltaT !== "" &&
                            <FontAwesomeIcon icon={faPlus} onClick={addTableRow}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}