import React, {useContext, useEffect, useState} from "react"
import {GlobalState} from "../../state"
import "./Start.css"
import Button from "../common/Button"

function Start() {

    const {state: {videos}} = useContext(GlobalState)
    const [isPermissionsAccepted, setIsPermissionsAccepted] = useState(false)

    const firstVideo = Object.keys(videos).find(key => videos[key].isFirst)

    useEffect(() => {
        async function getPermissions() {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                setIsPermissionsAccepted(true)
            } catch (e) {
                console.log(e)
            }
        }
        getPermissions()
    }, [])

    return (
        <div className="Start">
            {!isPermissionsAccepted && (
                <div className="Start-indications">
                    <p>Veuillez accepter les permissions d'enregistrement audio et vidéo</p>
                    <p>pour pouvoir correctement vivre l'expérience.</p>
                </div>
            )}
            <div>
                <Button disabled={!isPermissionsAccepted} to={`/play/${firstVideo}`}>Commencer</Button>
            </div>
        </div>
    )
}

export default Start