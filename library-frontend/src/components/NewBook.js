import React, {useState, useEffect} from "react"
import {CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS, CREATE_AUTHOR} from "../queries"
import {useMutation, useQuery} from "@apollo/client"

const NewBook = (props) => {
    const {showPage, setErrorMessage} = props
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [published, setPublished] = useState("")
    const [genre, setGenre] = useState("")
    const [genres, setGenres] = useState([])
    const [authors, setAuthors] = useState([])
    const [books, setBooks] = useState([])
    const authorQuery = useQuery(ALL_AUTHORS)
    const bookQuery = useQuery(ALL_BOOKS)

    useEffect(() => {
        if (authorQuery.data) {
            setAuthors(authorQuery.data.allAuthors)
        } else {
            console.log("Fetching author data")
        }
    }, [authorQuery.data])

    useEffect(() => {
        if (bookQuery.data) {
            setBooks(bookQuery.data.allAuthors)
        } else {
            console.log("Fetching book data")
        }
    }, [bookQuery.data])

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [
            {
                query: ALL_BOOKS
            },
            {
                query: ALL_AUTHORS
            }
        ],
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 8000)
        }/*,
        update: (store, response) => {
            const cachedData = store.readQuery({
                query: ALL_BOOKS
            })
            console.log(response.data)
            const updatedCache = cachedData.allBooks.concat(response.data.addBook)
            console.log(updatedCache)
            store.writeQuery({
                query: ALL_BOOKS,
                data: updatedCache
            })
        }*/
    })

    const [createAuthor] = useMutation(CREATE_AUTHOR, {
        refetchQueries: [
            {
                query: ALL_AUTHORS
            } //
        ],
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
        }
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!(authors.some(author => author.name === name))) {
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
            {books ? null : null}
        </div>
    )
}

export default NewBook
