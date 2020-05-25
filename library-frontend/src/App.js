import React, {useState} from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Notify from "./components/Notify"

const App = () => {
    const [page, setPage] = useState("authors")
    const [errorMessage, setErrorMessage] = useState(null)

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
