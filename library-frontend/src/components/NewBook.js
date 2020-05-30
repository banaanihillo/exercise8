import React, {useState, useEffect} from "react"
import {CREATE_BOOK, ALL_AUTHORS, CREATE_AUTHOR} from "../queries"
import {useMutation, useQuery} from "@apollo/client"

const NewBook = (props) => {
    const {showPage, setErrorMessage} = props
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [published, setPublished] = useState("")
    const [genre, setGenre] = useState("")
    const [genres, setGenres] = useState([])
    const [authors, setAuthors] = useState([])
//
    const authorQuery = useQuery(ALL_AUTHORS, {
        fetchPolicy: "cache-and-network"
    })
//
    useEffect(() => {
        if (authorQuery.data) {
            setAuthors(authorQuery.data.allAuthors)
        } else {
            console.log("Fetching author data")
        }
    }, [authorQuery.data])
    //
    const [createBook] = useMutation(CREATE_BOOK, {
        /*
        refetchQueries: [
            {
                query: ALL_BOOKS
            },
            {
                query: ALL_AUTHORS
            }
        ],
        awaitRefetchQueries: true,*/
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 8000)
        },/*
        update: (cache, response) => {
            const bookCache = cache.readQuery({
                query: ALL_BOOKS
            })
            console.log(response.data)

            cache.writeQuery({
                query: ALL_BOOKS,
                data: {bookCache: bookCache.allBooks.concat([response.data.addBook])}
            })
        }*/
    })

    const [createAuthor] = useMutation(CREATE_AUTHOR, {
        /*
        refetchQueries: [
            {
                query: ALL_AUTHORS
            }
        ],
        awaitRefetchQueries: true,*/
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
        },/*
        update: (cache, response) => {
            const authorCache = cache.readQuery({
                query: ALL_AUTHORS
            })
            cache.writeQuery({
                query: ALL_AUTHORS,
                data: {authorCache: authorCache.allAuthors.concat([response.data.addAuthor])}
            })
        }*/
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

        </div>
    )
}

export default NewBook
