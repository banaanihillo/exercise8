import React, {useState} from "react"
import {useMutation} from "@apollo/client"
import {CREATE_PERSON} from "../queries/queries.js"

const PersonForm = (props) => {
    const {setError} = props
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")

    const [createPerson] = useMutation(
        CREATE_PERSON,
        {
            onError: (error) => {
                setError(error.graphQLErrors[0].message)
            }
        }
    )

    const handleSubmit = async (event) => {
        event.preventDefault()
        createPerson({
            variables: {
                name,
                phone,
                street,
                city
            }
        })
        setName(""); setPhone(""); setStreet(""); setCity("")
    }

    return (
        <div>
            <h2> Create new person </h2>
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

                Street:
                <input
                    value = {street}
                    onChange = {({target}) => setStreet(target.value)}
                />

                City:
                <input
                    value = {city}
                    onChange = {({target}) => setCity(target.value)}
                />

                <button type = "submit"> Add new person </button>
            </form>
        </div>
    )
}

export default PersonForm
