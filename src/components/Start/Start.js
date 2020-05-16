import React, {useContext} from "react"
import {GlobalState} from "../../state"
import "./Start.css"
import Button from "../common/Button"

function Start() {

    const {state: {videos}} = useContext(GlobalState)

    const firstVideo = Object.keys(videos).find(key => videos[key].isFirst)

    return (
        <div className="Start">
            <Button to={`/play/${firstVideo}`}>Commencer</Button>
        </div>
    )
}

export default Start