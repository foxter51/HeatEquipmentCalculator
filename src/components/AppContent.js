import React, {useState} from "react"
import classNames from "classnames"
import BoilerCalculation from "./BoilerCalculation"
import CogenerationUnitCalculation from "./CogenerationUnitCalculation"
import HeatPumpCalculation from "./HeatPumpCalculation"
import RegenerativeHeatExchanger from "./RegenerativeHeatExchanger"

export default function AppContent() {

    const [activeTab, setActiveTab] = useState('')

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item rounded-top">
                    <button className={classNames("nav-link", activeTab === "boiler" ? "active" : "")}
                            onClick={() => setActiveTab('boiler')} id="board-tab">Котел
                    </button>
                </li>
                <li className="nav-item rounded-top">
                    <button className={classNames("nav-link", activeTab === "cogenerationUnit" ? "active" : "")}
                            onClick={() => setActiveTab('cogenerationUnit')} id="board-tab">Когенераційна установка
                    </button>
                </li>
                <li className="nav-item rounded-top">
                    <button className={classNames("nav-link", activeTab === "heatPump" ? "active" : "")}
                            onClick={() => setActiveTab('heatPump')} id="board-tab">Тепловий насос
                    </button>
                </li>
                <li className="nav-item rounded-top">
                    <button className={classNames("nav-link", activeTab === "regenerativeHeatExchanger" ? "active" : "")}
                            onClick={() => setActiveTab('regenerativeHeatExchanger')} id="board-tab">Рекуперативний теплообмінник
                    </button>
                </li>
            </ul>
            <div className="tab-content">
                <div className={classNames("tab-pane fade", activeTab === "boiler" ? "show active" : "")}>
                    <BoilerCalculation/>
                </div>
                <div className={classNames("tab-pane fade", activeTab === "cogenerationUnit" ? "show active" : "")}>
                    <CogenerationUnitCalculation/>
                </div>
                <div className={classNames("tab-pane fade", activeTab === "heatPump" ? "show active" : "")}>
                    <HeatPumpCalculation/>
                </div>
                <div className={classNames("tab-pane fade", activeTab === "regenerativeHeatExchanger" ? "show active" : "")}>
                    <RegenerativeHeatExchanger/>
                </div>
            </div>
        </div>
    )
}