import ReactDOM from "react-dom"
import React from "react"
import "./Modal.css"

function Modal({children}) {
    const el = (
        <div className="Modal">
            {children}
        </div>
    )
    return ReactDOM.createPortal(el, document.body)
}

export default Modal