import {createContext} from "react"
import {ACTIONS, VIDEOS} from "./config"

export const GlobalState = createContext(null)

export const initialState = {
    videos: VIDEOS,
    actions: ACTIONS
}

export function reducer(state, action) {
    switch (action.type) {
        default: {
            throw new Error(`Le type ${action.type} n'est pas géré !`)
        }
    }
}