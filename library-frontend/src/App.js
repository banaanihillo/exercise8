import React, {useState} from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"

const App = () => {
    const [page, setPage] = useState("authors")

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
            
            <Authors
                showPage = {page === "authors"}
            />
            <Books
                showPage = {page === "books"}
            />
            <NewBook
                showPage = {page === "addNewBook"}
            />
        </div>
    )
}

export default App
