import React, {useState, useEffect} from "react"
import {ALL_AUTHORS} from "../queries"
import {useQuery} from "@apollo/client"

const Authors = (props) => {
    const {showPage} = props
    const result = useQuery(ALL_AUTHORS)
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        if (result.data) {
            setAuthors(result.data.allAuthors)
        } else {
            console.log("Yup, still waitin'")
        }
    }, [result.data])

    if (!showPage) {
        return null
    }

    if (result.loading) {
        return (
            <div> Still in the midst of some stuff here </div>
        )
    }
    
    return (
        <div>
            <h2> Authors </h2>
                <table style = {{textAlign: "center"}}>
                    <tbody>
                        <tr>
                            <th> Author </th>
                            <th>
                                Birth year
                            </th>
                            <th>
                                Number of books
                            </th>
                        </tr>
                        
                        {authors.map(author =>
                            <tr key = {author.id}>
                                <td> {author.name} </td>
                                <td> {author.born} </td>
                                <td> {author.bookCount} </td>
                            </tr>
                        )}
                    </tbody>
                </table>
        </div>
    )
}

export default Authors
