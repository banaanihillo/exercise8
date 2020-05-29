import React, {useState, useEffect} from "react"
import {ALL_BOOKS} from "../queries"
import {useQuery} from "@apollo/client"
import BookTable from "./BookTable"

const Books = (props) => {
    const {showPage} = props
    const [books, setBooks] = useState([])
    const allBooks = useQuery(ALL_BOOKS)
    const [booksFilteredByGenre, setBooksFilteredByGenre] = useState([])
    const [genreToDisplay, setGenreToDisplay] = useState(null)
    const filteredBookQuery = useQuery(ALL_BOOKS, {
        variables: {
            genre: genreToDisplay
        }
    })
    useEffect(() => {
        if (filteredBookQuery.data) {
            setBooksFilteredByGenre(filteredBookQuery.data.allBooks)
        } else {
            console.log("Fetching books by genre")
        }
    }, [filteredBookQuery.data])

    useEffect(() => {
        if (allBooks.data) {
            setBooks(allBooks.data.allBooks)
        } else {
            console.log("Fetching all books")
        }
    }, [allBooks.data])

    if (!showPage) {
        return null
    }
    
    const allGenres = books.map(book => book.genres)
    const listOfGenres = [].concat(...allGenres)
    const uniqueGenres = [...new Set(listOfGenres)]
    
    
    return (
        <div>
            <h2> Books </h2>
            <BookTable
                genreToDisplay = {genreToDisplay}
                booksFilteredByGenre = {booksFilteredByGenre}
                books = {books}
            />
            {uniqueGenres.map(genre =>
                <button
                    key = {Math.random() * 100000}
                    onClick = {() => setGenreToDisplay(genre)}
                >
                    {genre}
                </button>
            )}
            <button onClick = {() => setGenreToDisplay(null)}>
                Display all
            </button>
        </div>
    )
}

export default Books
