import React, {useState, useEffect} from "react"
import {ALL_BOOKS} from "../queries"
import {useQuery} from "@apollo/client"
import BookTable from "./BookTable"

const Books = (props) => {
    const {showPage} = props
    const [books, setBooks] = useState([])
    
    const [genreToDisplay, setGenreToDisplay] = useState(null)
    const bookQuery = useQuery(ALL_BOOKS, {
        variables: {
            genre: genreToDisplay
        },
        fetchPolicy: "cache-and-network"
    })
    const {data, refetch} = useQuery(ALL_BOOKS, {
        fetchPolicy: "cache-and-network"
    })
    const [uniqueGenres, setUniqueGenres] = useState([])

    useEffect(() => {
        if (bookQuery.data) {
            setBooks(bookQuery.data.allBooks)
        } else {
            console.log("Fetching books")
        }
    }, [bookQuery.data])

    useEffect(() => {
        if (data) {
            const allGenres = data.allBooks.map(book => book.genres)
            const listOfGenres = [].concat(...allGenres)
            setUniqueGenres([...new Set(listOfGenres)])
        } else {
            console.log("Finding genres")
        }
    }, [data])

    if (!showPage) {
        return null
    }

    const handleClick = (genre) => {
        refetch()
        if (genre) {
            setGenreToDisplay(genre)
        } else {
            setGenreToDisplay(null)
        }
    }

    return (
        <div>
            <h2> Books </h2>
            <BookTable genreToDisplay = {genreToDisplay} books = {books} />
            {uniqueGenres.map(genre =>
                <button
                    key = {Math.random() * 100000}
                    onClick = {() => handleClick(genre)}
                >
                    {genre}
                </button>
            )}
            <button onClick = {() => handleClick()}>
                Display all
            </button>
        </div>
    )
}

export default Books
