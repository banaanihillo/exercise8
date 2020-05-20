import React, {useState} from "react"
import {useLazyQuery} from "@apollo/client"
import {FIND_PERSON} from "../queries/queries.js"

const Persons = (props) => {
    const {persons} = props
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)

    const showPerson = (name) => {
        getPerson({variables: {
            nameToSearch: name
        }
        })
    }

    useEffect(() => {
        if (result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result.data])

    if (person) {
        return (
            <div>
                <h2> {person.name} </h2>
                <p> {person.address.street}, {person.address.city} </p>
                <p> {person.phone} </p>
                <button onClick = {() => setPerson(null)}>
                    Close
                </button>
            </div>
        )
    }

    return (
        <div>
            <h2> Persons </h2>
            {persons.map(person =>
                <li key = {person.id}>
                    {person.name}: {person.phone}
                    <button onClick = {() => showPerson(person.name)}>
                        Display address
                    </button>
                </li>
            )}
        </div>
    )
}

export default Persons
