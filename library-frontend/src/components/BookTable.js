import React from "react"

const BookTable = (props) => {
    const {genreToDisplay, booksFilteredByGenre, books} = props

    return (
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
                    
                {(genreToDisplay ? booksFilteredByGenre : books).map(book =>
                    <tr key = {book.id}>
                        <td> {book.title} </td>
                        <td> {book.author.name} </td>
                        <td> {book.published} </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default BookTable
