const Notify = (props) => {
    const {errorMessage} = props
    if (!errorMessage) {
        return null
    } else {
        return (
            <div style = {{backgroundColor: "red", color: "silver"}}>
                {errorMessage}
            </div>
        )
    }
}

export default Notify
