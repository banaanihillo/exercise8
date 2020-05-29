import React, {useState, useEffect} from "react"
import {ALL_BOOKS} from "../queries"
import {useQuery} from "@apollo/client"
import BookTable from "./BookTable"

const Books = (props) => {
    const {showPage} = props
    const [books, setBooks] = useState([])
    const bookQuery = useQuery(ALL_BOOKS)
    const [genreToDisplay, setGenreToDisplay] = useState(null)
    useEffect(() => {
        if (bookQuery.data) {
            setBooks(bookQuery.data.allBooks)
        }
    }, [bookQuery.data])

    if (!showPage) {
        return null
    }
    
    const allGenres = books.map(book => book.genres)
    const listOfGenres = [].concat(...allGenres)
    const uniqueGenres = [...new Set(listOfGenres)]
    const booksFilteredByGenre = books.filter(book => {
        return book.genres.includes(genreToDisplay)
    })
    
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
