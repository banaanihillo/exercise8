import React, {useState, useEffect} from "react"
import {ALL_AUTHORS, EDIT_AUTHOR} from "../queries"
import {useQuery, useMutation} from "@apollo/client"

const Authors = (props) => {
    const {showPage} = props
    const result = useQuery(ALL_AUTHORS)
    const [authors, setAuthors] = useState([])
    const [name, setName] = useState("")
    const [birthYear, setBirthYear] = useState("")

    useEffect(() => {
        if (result.data) {
            setAuthors(result.data.allAuthors)
        } else {
            console.log("Yup, still waitin'")
        }
    }, [result.data])

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [
            {
                query: ALL_AUTHORS
            }
        ]
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        editAuthor({
            variables: {
                name,
                setBornTo: birthYear
            }
        })
        setName("")
        setBirthYear("")
    }

    if (!showPage) {
        return null
    }

    if (result.loading) {
        return (
            <div> Still in the midst of some stuff here </div>
        )
    }
    
    return (
        <div>
            <h2> Authors </h2>
                <table style = {{textAlign: "center"}}>
                    <tbody>
                        <tr>
                            <th> Author </th>
                            <th>
                                Birth year
                            </th>
                            <th>
                                Number of books
                            </th>
                        </tr>
                        
                        {authors.map(author =>
                            <tr key = {author.id}>
                                <td> {author.name} </td>
                                <td> {author.born} </td>
                                <td> {author.bookCount} </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            <h3> Edit authors here </h3>
            <form onSubmit = {handleSubmit}>
                Author name:
                <input
                    type = {name}
                    onChange = {({target}) => setName(target.value)}
                />
                <br />
                Birth year:
                <input
                    type = {birthYear}
                    onChange = {({target}) => setBirthYear(Number(target.value))}
                />
                <br />
                <button type = "submit">
                    Set birth year
                </button>
            </form>
        </div>
    )
}

export default Authors
