import React, {useState, useEffect} from "react"
import {ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS} from "../queries"
import {useQuery, useMutation} from "@apollo/client"
import LoginForm from "../components/LoginForm"

const Authors = (props) => {
    const {showPage, setErrorMessage, token, setToken} = props
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
            },
            {
                query: ALL_BOOKS
            }
        ],
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
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
            {!token
                ? <div>
                    Log in to create new books, or to edit authors.
                    <LoginForm
                        setToken = {setToken}
                        setErrorMessage = {setErrorMessage}
                    />
                </div>
                : null
            }
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
            {!token
                ? <div>
                    You must be logged in to edit authors.
                </div>
                : <div>
                    <form onSubmit = {handleSubmit}>
                        Author name:
                        <select
                            value = {name}
                            onChange = {({target}) => setName(target.value)
                        }>
                            <option value = "" disabled hidden> Select a name </option>
                            {authors.map(author =>
                                <option key = {author.id} value = {author.name}>
                                    {author.name}
                                </option>
                            )}
                        </select>
                        <br />
                        Birth year:
                        <input
                            type = "number"
                            value = {birthYear}
                            onChange = {({target}) => setBirthYear(Number(target.value))}
                        />
                        <br />
                        <button type = "submit">
                            Set birth year
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Authors
