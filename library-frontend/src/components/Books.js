import React from "react"

const Books = (props) => {
    const {showPage} = props
    if (!showPage) {
        return null
    }
    const books = []
    
    return (
        <div>
            <h2> Books </h2>
            <table>
                <tbody>
                    <tr>
                        <th>
                            Author
                        </th>
                        <th>
                            Publication year
                        </th>
                    </tr>
                    
                    {books.map(book =>
                        <tr key = {book.title}>
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
