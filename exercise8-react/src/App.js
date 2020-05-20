import React from "react"
import {useQuery} from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import {ALL_PERSONS} from "./queries/queries.js"
import Notify from "./components/Notify"

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null)

    const result = useQuery(
        ALL_PERSONS,
        {
            pollInterval: 2000
        }
    )

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    if (result.loading) {
        return (
            <div>
                Something is going on here
            </div>
        )
    } else {
        return (
            <div>
                <h1> Some kind of application with persons and stuff </h1>
                <Persons persons = {result.data.allPersons} />
                <PersonForm setError = {notify} />
                <Notify errorMessage = {errorMessage} />
            </div>
        )
    }
}

export default App
