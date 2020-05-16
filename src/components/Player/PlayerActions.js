import React, {useContext} from "react"
import PropTypes from "prop-types"
import {GlobalState} from "../../state"
import "./PlayerActions.css"
import Button from "../common/Button"

function PlayerActions({actionsKeys}) {

    const {state: {actions}} = useContext(GlobalState)

    return (
        <div className="PlayerActions">
            <span className="PlayerActions-title">Faire un choix :</span>
            <ul className="PlayerActions-list">
                {actionsKeys.map(key => {
                    if (!actions[key]) {
                        throw new Error(`L'action ${key} n'existe pas !`)
                    }
                    const {label} = actions[key]
                    return (
                        <li key={key} className="PlayerActions-item">
                            <Button to={`/play/${key}`}>{label}</Button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

PlayerActions.propTypes = {
    actionsKeys: PropTypes.array
}

export default PlayerActions