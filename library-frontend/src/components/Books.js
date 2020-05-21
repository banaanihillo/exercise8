import React, {useState, useEffect} from "react"
import {ALL_BOOKS} from "../queries"
import {useQuery} from "@apollo/client"

const Books = (props) => {
    const {showPage} = props
    const [books, setBooks] = useState([])
    const bookQuery = useQuery(ALL_BOOKS)
    useEffect(() => {
        if (bookQuery.data) {
            setBooks(bookQuery.data.allBooks)
        }
    }, [bookQuery])

    if (!showPage) {
        return null
    }
    
    
    return (
        <div>
            <h2> Books </h2>
            <table style = {{textAlign: "center"}}>
                <tbody>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Publication year
                        </th>
                    </tr>
                    
                    {books.map(book =>
                        <tr key = {book.id}>
                            <td> {book.title} </td>
                            <td> {book.author} </td>
                            <td> {book.published} </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Books
