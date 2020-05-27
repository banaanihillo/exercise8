import React, {useState} from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Notify from "./components/Notify"
import LoginForm from "./components/LoginForm"

const App = () => {
    const [page, setPage] = useState("authors")
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)
    //const client = useApolloClient()

    if (!token) {
        return (
            <div>
                <Notify errorMessage = {errorMessage} />
                <h1> Log in </h1>
                <LoginForm
                    setToken = {setToken}
                    setErrorMessage = {setErrorMessage}
                />
            </div>
        )
    }
    /*
    const logOut = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }
    */

    return (
        <div>
            <h1> Some kind of book catalog </h1>
            <button onClick = {() => setPage("authors")}>
                Authors
            </button>
            <button onClick = {() => setPage("books")}>
                Books
            </button>
            <button onClick = {() => setPage("addNewBook")}>
                Add new book
            </button>

            <Notify errorMessage = {errorMessage} />
            
            <Authors
                showPage = {page === "authors"}
                setErrorMessage = {setErrorMessage}
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
