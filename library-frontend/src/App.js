import React, {useState} from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import {useApolloClient, useSubscription} from "@apollo/client"
import Notify from "./components/Notify"
import NewBook from "./components/NewBook"
import Recommendations from "./components/Recommendations"
import {BOOK_ADDED, ALL_BOOKS} from "./queries"

const App = () => {
    const [page, setPage] = useState("authors")
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    const updateCacheWith = (addedBook) => {
        const alreadyExists = (set, object) => (
            set.map(book => book.id).includes(object.id)
        )

        const bookCache = client.readQuery({
            query: ALL_BOOKS
        })
        if (!alreadyExists(bookCache.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: {
                    allBooks: bookCache.allBooks.concat(addedBook) 
                }
            })
        }
    }

    const logOut = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }
    
    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({subscriptionData}) => {
            const addedBook = subscriptionData.data.bookAdded
            updateCacheWith(addedBook)
            console.log("Cache updated:")
            console.log(addedBook)
        }
    })

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
                    <button onClick = {() => setPage("recommendations")}>
                        Recommendations
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
                updateCacheWith = {updateCacheWith}
            />
            <Recommendations
                showPage = {page === "recommendations"}
            />
        </div>
    )
}

export default App
