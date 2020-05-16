import skyVideo from "./assets/videos/ciel.mp4"
import forestVideo from "./assets/videos/foret.mp4"
import eatingVideo from "./assets/videos/manger.mp4"
import musicVideo from "./assets/videos/musique.mp4"
import birdVideo from "./assets/videos/piou.mp4"
import butterflyVideo from "./assets/videos/papillon.mp4"
import sportVideo from "./assets/videos/sport.mp4"

const KEYS = {
    SKY: "sky",
    FOREST: "forest",
    EATING: "eating",
    MUSIC: "music",
    BUTTERFLY: "butterfly",
    BIRD: "bird",
    SPORT: "sport",
}

export const VIDEOS = {
    [KEYS.SKY]: {
        isFirst: true,
        mediaUrl: skyVideo,
        actionsKeys: [
            KEYS.SPORT,
            KEYS.BIRD,
        ]
    },
    [KEYS.FOREST]: {
        mediaUrl: forestVideo,
        actionsKeys: [
            KEYS.SKY,
            KEYS.SPORT
        ]
    },
    [KEYS.EATING]: {
        mediaUrl: eatingVideo,
        actionsKeys: [
            KEYS.SPORT,
            KEYS.BUTTERFLY
        ]
    },
    [KEYS.MUSIC]: {
        mediaUrl: musicVideo,
        actionsKeys: [
            KEYS.EATING,
            KEYS.FOREST
        ]
    },
    [KEYS.BUTTERFLY]: {
        mediaUrl: butterflyVideo,
        actionsKeys: [
            KEYS.MUSIC,
            KEYS.BIRD
        ]
    },
    [KEYS.BIRD]: {
        mediaUrl: birdVideo,
        actionsKeys: [
            KEYS.MUSIC,
            KEYS.BUTTERFLY
        ]
    },
    [KEYS.SPORT]: {
        mediaUrl: sportVideo,
        actionsKeys: [
            KEYS.FOREST,
            KEYS.EATING,
        ]
    },
}

export const ACTIONS = {
    [KEYS.SKY]: {
        label: "Regarder le ciel"
    },
    [KEYS.MUSIC]: {
        label: "Jouer de la musique"
    },
    [KEYS.BUTTERFLY]: {
        label: "Regarder un papillon"
    },
    [KEYS.EATING]: {
        label: "Manger en famille"
    },
    [KEYS.BIRD]: {
        label: "Voir un petit oiseau"
    },
    [KEYS.FOREST]: {
        label: "Se promener en forêt"
    },
    [KEYS.SPORT]: {
        label: "Faire du sport"
    }
}