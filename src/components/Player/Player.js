import React, {useContext, useEffect, useRef, useState} from "react"
import Loader from "react-loader-spinner"
import {Modal, Button} from "./../common"
import {GlobalState} from "../../state"
import PlayerActions from "./PlayerActions"
import "./Player.css"

function Player({match}) {

    const {state} = useContext(GlobalState)
    const videoRef = useRef()

    const [video, setVideo] = useState(state.videos[match.params.key])
    const [include, setInclude] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isVideoEnded, setIsVideoEnded] = useState(false)
    const [progress, setProgress] = useState(0)
    const [needUserInteract, setNeedUserInteract] = useState(false)

    if (!video) {
        throw new Error(`La video ${match.params.key} n'existe pas !`)
    }
    if (!video.actionsKeys) {
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

    function pauseVideo() {
        videoRef.current.pause()
    }

    function watchIncludes(currentTime) {
        const include = video.includes[0]
        if (currentTime > include.at) {
            video.includes = video.includes.splice(0, 1)
            pauseVideo()
            setInclude(include)
            setVideo(video)
            setIsLoading(true)
        }
    }

    function onVideoTimeUpdate(e) {
        if (video.includes.length > 0) {
            watchIncludes(e.target.currentTime)
        }
        setProgress(e.target.currentTime / e.target.duration * 100)
    }

    function onVideoEnded() {
        setIsVideoEnded(true)
    }

    function onChangeVideo() {
        const newVideo = state.videos[match.params.key]
        if (newVideo.includes) newVideo.includes.sort((a, b) => {
            if (a.at < b.at) return -1
            if (a.at > b.at) return 1
            return 0
        })

        setVideo(newVideo)
        setIsLoading(true)
        setIsVideoEnded(false)
        setProgress(0)
        playVideo()
    }

    function onIframeLoad(e) {
        setIsLoading(false)
    }

    function receiveMessageFromIframe(e) {
        if (e.origin !== "https://westfrstudio.ddns.net:80")
            return;

        const [type, action, value] = e.data.split(':')
        if (type === 'demo') switch (action) {
            case 'continue': {
                setInclude(false)
                playVideo()
                break;
            }
            default: {
                throw new Error(`La valeur ${value} de [data-demo] n'est pas gérée !`)
            }
        }
    }

    function onMounted() {
        window.addEventListener('message', receiveMessageFromIframe, false)
        return () => {
            window.removeEventListener('message', receiveMessageFromIframe, false)
        }
    }

    useEffect(onMounted, [])
    useEffect(onChangeVideo, [match.params.key])

    return (
        <div className="Player">
            <video
                ref={videoRef}
                className="Player-video"
                src={video.mediaUrl}
                onTimeUpdate={onVideoTimeUpdate}
                onCanPlay={e => setIsLoading(false)}
                onEnded={onVideoEnded}
            />
            <span className="Player-progress" style={{width: `${progress}%`}}/>
            {include && (
                <Modal>
                    <div className="Player-include-container">
                        <iframe
                            className="Player-include"
                            title="Ecran du nichoir"
                            width={800}
                            height={480}
                            src={include.url}
                            allow="camera;microphone"
                            onLoad={onIframeLoad}
                        />
                    </div>
                </Modal>
            )}
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
            {!isLoading && needUserInteract && (
                <Modal>
                    <Button onClick={playVideo}>Commencer</Button>
                </Modal>
            )}
            {isVideoEnded && (
                <Modal>
                    <PlayerActions actionsKeys={video.actionsKeys}/>
                </Modal>
            )}
        </div>
    )
}

export default Player