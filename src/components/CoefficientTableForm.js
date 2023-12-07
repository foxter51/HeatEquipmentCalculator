import React, { useEffect, useState } from "react"
import TableRow from "./TableRow"

export default function CoefficientTableForm({ setCoefficientTable }) {

    const [tableRows, setTableRows] = useState([])

    useEffect(() => {
        if(tableRows.length === 0) {
            setTableRows([
                {
                    id: -1,
                    coefficient: "",
                    delta_t: ""
                }
            ])
        }
        setCoefficientTable(tableRows)
    }, [setCoefficientTable, tableRows, tableRows.length])

    return (
        <div className="mb-3">
            <div className="h2">Таблиця залежності коефіцієнту трансформації теплового насосу від різниці температур
                навколишнього середовища і кінцевої температури води на виході з теплообмінника
                теплового насосу</div>

            {tableRows.map((tableRow, index) => (
                <TableRow
                    key={tableRow.id}
                    tableRows={tableRows}
                    setTableRows={setTableRows}
                    id={index}
                />
            ))}
        </div>
    )
}