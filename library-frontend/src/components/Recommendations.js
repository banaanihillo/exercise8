import React, {useEffect, useState} from "react"
import {USER_INFO, ALL_BOOKS} from "../queries"
import {useQuery} from "@apollo/client"
import BookTable from "./BookTable"

const Recommendations = (props) => {
    const {showPage} = props
    const userQuery = useQuery(USER_INFO)
    const [userInfo, setUserInfo] = useState({
        favoriteGenre: ""
    })
    const bookQuery = useQuery(ALL_BOOKS, {
        variables: {
            genre: userInfo.favoriteGenre
        }
    })
    const [booksByGenre, setBooksByGenre] = useState([])

    useEffect(() => {
        if (userQuery.data) {
            setUserInfo(userQuery.data.me)
        } else {
            console.log("Fetching user data")
        }
    }, [userQuery])

    useEffect(() => {
        if (bookQuery.data) {
            setBooksByGenre(bookQuery.data.allBooks)
        } else {
            console.log("Fetching book recommendations")
        }
    }, [bookQuery])

    if (!showPage) {
        return null
    }

    return (
        <div>
            <h2> Recommendations </h2>
            <h3> Based on your favorite genre: {userInfo.favoriteGenre} </h3>
            <BookTable books = {booksByGenre} />
        </div>
    )

}

export default Recommendations
