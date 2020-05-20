import React, {useState} from "react"

const NewBook = (props) => {
    const {showPage} = props
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [published, setPublished] = useState("")
    const [genre, setGenre] = useState("")
    const [genres, setGenres] = useState([])
    
    if (!showPage) {
        return null
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setTitle(""); setPublished(""); setAuthor(""); setGenres([]); setGenre("")
    }
    
    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre("")
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
                        onChange={({target}) => setPublished(target.value)}
                    />
                </div>
                <div>
                    Genre:
                    <input
                        value = {genre}
                        onChange={({target}) => setGenre(target.value)}
                    />
                    <button onClick = {addGenre} type = "button">
                        Add new genre
                    </button>
                </div>

                <div>
                    Genres: {genres.join(" ")}
                </div>

                <button type = "submit">
                    Create book
                </button>
            </form>
        </div>
    )
}

export default NewBook
