import React, {useReducer} from "react"
import {Pager} from "./Pager"
import {GlobalState, initialState, reducer} from "../state"
import "./App.css"

export function App() {

    const [state, dispatch] = useReducer(reducer, initialState, undefined)

    return (
        <GlobalState.Provider value={{state, dispatch}}>
            <div className="App">
                <Pager/>
            </div>
        </GlobalState.Provider>
    )
}