import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Start} from "../Start"
import {Player} from "../Player"

function Pager () {
    return (
        <Router>
            <Switch>
                <Route path="/play/:key" component={Player}/>
                <Route path="/" component={Start}/>
            </Switch>
        </Router>
    )
}

export default Pager