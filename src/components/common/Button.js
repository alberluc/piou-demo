import React from "react"
import PropTypes from "prop-types"
import "./Button.css"
import {Link} from "react-router-dom"

function Button({to = null, children, ...props}) {
    return !!to
        ? (
            <Link {...props} className="Button" to={to}>{children}</Link>
        )
        : (
            <button {...props} className="Button">{children}</button>
        )
}

Button.propTypes = {
    to: PropTypes.string || PropTypes.object
}

export default Button