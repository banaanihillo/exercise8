import React, {useState, useEffect} from "react"
import {CREATE_BOOK, ALL_AUTHORS, CREATE_AUTHOR, EDIT_AUTHOR} from "../queries"
import {useMutation, useQuery} from "@apollo/client"

const NewBook = (props) => {
    const {showPage, setErrorMessage, updateCacheWith} = props
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [published, setPublished] = useState("")
    const [genre, setGenre] = useState("")
    const [genres, setGenres] = useState([])
    const [authors, setAuthors] = useState([])
    const authorQuery = useQuery(ALL_AUTHORS)
    useEffect(() => {
        if (authorQuery.data) {
            setAuthors(authorQuery.data.allAuthors)
        } else {
            console.log("Fetching author data")
        }
    }, [authorQuery.data])
    //
    const [createBook] = useMutation(CREATE_BOOK, {
        
        refetchQueries: [
            {query: ALL_AUTHORS}
        ],
        awaitRefetchQueries: true,
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 8000)
        },
        update: (_store, response) => {
            updateCacheWith(response.data.addBook)
        }
    })

    const [createAuthor] = useMutation(CREATE_AUTHOR, {

        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
        }
    })

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!(authors.some(author => author.name === name))) {
            await createAuthor({
                variables: {
                    name: name,
                    bookCount: 1
                }
            })
        } else {
            const authorToUpdate = authors.find(author => author.name === name)
            await editAuthor({
                variables: {
                    name: name,
                    bookCount: (authorToUpdate.bookCount + 1)
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
