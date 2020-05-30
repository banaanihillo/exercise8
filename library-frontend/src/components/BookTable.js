import React from "react"

const BookTable = (props) => {
    const {genreToDisplay, books} = props

    return (
        <div>
            {genreToDisplay
                ? <h3> Currently viewing {genreToDisplay} </h3>
                : <h3> Viewing all books </h3>
            }
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
                            <td> {book.author.name} </td>
                            <td> {book.published} </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default BookTable
