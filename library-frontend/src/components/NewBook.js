import React, {useState} from "react"
import {CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS} from "../queries"
import {useMutation} from "@apollo/client"

const NewBook = (props) => {
    const {showPage} = props
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [published, setPublished] = useState("")
    const [genre, setGenre] = useState("")
    const [genres, setGenres] = useState([])

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [
            {
                query: ALL_BOOKS
            },
            {
                query: ALL_AUTHORS
            }
        ]
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        createBook({
            variables: {
                title,
                author,
                published,
                genres
            }
        })
        setTitle(""); setPublished(""); setAuthor(""); setGenres([]); setGenre("")
    }
    
    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre("")
    }

    if (!showPage) {
        return null
    }
    
    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <div>
                    Title:
                    <input
                        value = {title}
                        onChange = {({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                        value = {author}
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Publication year:
                    <input
                        type = "number"
                        value = {published}
                        onChange={({target}) => setPublished(Number(target.value))}
                    />
                </div>
                <div>
                    Genres:
                    <input
                        value = {genre}
                        onChange={({target}) => setGenre(target.value)}
                    />
                    <button onClick = {addGenre} type = "button">
                        Add new genre
                    </button>
                </div>

                <div>
                    Genres added: {genres.join(", ")}
                </div>

                <button type = "submit">
                    Create book
                </button>
            </form>
        </div>
    )
}

export default NewBook
