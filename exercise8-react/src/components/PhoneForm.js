import React, {useState, useEffect} from "react"
import {useMutation} from "@apollo/client"
import {EDIT_NUMBER} from "../queries/queries.js"

const PhoneForm = (props) => {
    const {setError} = props
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [changeNumber, result] = useMutation(EDIT_NUMBER)

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            setError("Could not find that person")
        }
    }, [result.data])

    const handleSubmit = async (event) => {
        event.preventDefault()
        changeNumber({
            variables: {
                name,
                phone
            }
        })
        setName(""); setPhone("")
    }

    return (
        <div>
            <h2> Change your number here </h2>
            <form onSubmit = {handleSubmit}>
                Name:
                <input
                    value = {name}
                    onChange = {({target}) => setName(target.value)}
                />
                Phone:
                <input
                    value = {phone}
                    onChange = {({target}) => setPhone(target.value)}
                />
                <button type = "submit"> Change number </button>
            </form>
        </div>
    )
}

export default PhoneForm
