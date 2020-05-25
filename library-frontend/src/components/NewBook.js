import React, {useState, useEffect} from "react"
import {CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS, CREATE_AUTHOR} from "../queries"
import {useMutation, useQuery} from "@apollo/client"

const NewBook = (props) => {
    const {showPage} = props
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [published, setPublished] = useState("")
    const [genre, setGenre] = useState("")
    const [genres, setGenres] = useState([])
    const [authors, setAuthors] = useState([])
    const result = useQuery(ALL_AUTHORS)

    useEffect(() => {
        if (result.data) {
            setAuthors(result.data.allAuthors)
        } else {
            console.log("Stuff in progress")
        }
    }, [result.data])

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

    const [createAuthor] = useMutation(CREATE_AUTHOR)

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!(authors.includes(name))) {
            await createAuthor({
                variables: {
                    name: name
                }
            })
        }
        createBook({
            variables: {
                title,
                name,
                published,
                genres
            }
        })
        setTitle(""); setPublished(""); setName(""); setGenres([]); setGenre("")
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
                        value = {name}
                        onChange={({target}) => setName(target.value)}
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
