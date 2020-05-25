import React from "react"

const Notify = (props) => {
    const {errorMessage} = props
    if (!errorMessage) {
        return null
    } else {
        return (
            <div style = {{color: "tomato"}}>
                {errorMessage}
            </div>
        )
    }
}

export default Notify
