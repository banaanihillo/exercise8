import React, {useState} from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import {useApolloClient} from "@apollo/client"
import Notify from "./components/Notify"
import NewBook from "./components/NewBook"

const App = () => {
    const [page, setPage] = useState("authors")
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)
    const client = useApolloClient()
    const logOut = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }


    return (
        <div>
            <h1> Some kind of book catalog </h1>
            <button onClick = {() => setPage("authors")}>
                Authors
            </button>
            <button onClick = {() => setPage("books")}>
                Books
            </button>
            {!token
                ? null
                : <span>
                    <button onClick = {() => setPage("addNewBook")}>
                        Add new book
                    </button>
                    <button onClick = {() => logOut()}>
                        Log out
                    </button>
                </span>
            }

            <Notify errorMessage = {errorMessage} />
            
            <Authors
                showPage = {page === "authors"}
                setErrorMessage = {setErrorMessage}
                token = {token}
                setToken = {setToken}
            />
            <Books
                showPage = {page === "books"}
            />
            <NewBook
                showPage = {page === "addNewBook"}
                setErrorMessage = {setErrorMessage}
            />
        </div>
    )
}

export default App
