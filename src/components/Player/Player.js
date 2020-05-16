import React, {useContext, useEffect, useRef, useState} from "react"
import {GlobalState} from "../../state"
import "./Player.css"
import PlayerActions from "./PlayerActions"
import Button from "../common/Button"
import Modal from "../common/Modal"
import Loader from 'react-loader-spinner'

function Player({match}) {

    const {state} = useContext(GlobalState)
    const videoRef = useRef()
    const [isLoading, setIsLoading] = useState(true)
    const [isVideoEnded, setIsVideoEnded] = useState(false)
    const [progress, setProgress] = useState(0)
    const [needUserInteract, setNeedUserInteract] = useState(false)

    const currentVideo = state.videos[match.params.key]

    if (!currentVideo) {
        throw new Error(`La video ${match.params.key} n'existe pas !`)
    }
    if (!currentVideo.actionsKeys) {
        throw new Error(`La video ${match.params.key} n'a pas d'actions !`)
    }

    async function playVideo() {
        try {
            setNeedUserInteract(false)
            await videoRef.current.play()
        } catch (e) {
            setNeedUserInteract(true)
        }
    }

    function onVideoTimeUpdate(e) {
        setProgress(e.target.currentTime / e.target.duration * 100)
    }

    function onVideoEnded() {
        setIsVideoEnded(true)
    }

    function onChangeVideo() {
        setIsLoading(true)
        setIsVideoEnded(false)
        setProgress(0)
        playVideo()
    }

    useEffect(onChangeVideo, [match.params.key])

    return (
        <div className="Player">
            <video
                ref={videoRef}
                className="Player-video"
                src={currentVideo.mediaUrl}
                onTimeUpdate={onVideoTimeUpdate}
                onCanPlay={e => setIsLoading(false)}
                onEnded={onVideoEnded}
            />
            <span className="Player-progress" style={{width: `${progress}%`}}/>
            {isLoading && (
                <Modal>
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                </Modal>
            )}
            {isVideoEnded && (
                <Modal>
                    <PlayerActions actionsKeys={currentVideo.actionsKeys}/>
                </Modal>
            )}
            {!isLoading && needUserInteract && (
                <Modal>
                    <Button onClick={playVideo}>Commencer</Button>
                </Modal>
            )}
        </div>
    )
}

export default Player