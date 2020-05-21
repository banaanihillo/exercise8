import {gql as GraphQL} from "@apollo/client"

export const ALL_AUTHORS = GraphQL`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = GraphQL`
    query {
        allBooks {
            title
            published
            author
            id
        }
    }
`

export const CREATE_BOOK = GraphQL`
    mutation createBook(
        $title: String,
        $author: String,
        $published: Int,
        $genres: [String]
    ) {
        addBook (
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author
            published
            genres
        }
    }
`

export const FIND_AUTHOR = GraphQL`
    query findAuthorByName($nameToSearch: String) {
        findAuthor(name: $nameToSearch) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`

export const CREATE_AUTHOR = GraphQL`
    mutation createAuthor(
        $name: String,
        $street: String,
        $city: String,
        $phone: String
    ) {
        addAuthor(
            name: $name,
            street: $street,
            city: $city,
            phone: $phone
        ) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`

export const EDIT_NUMBER = GraphQL`
    mutation editNumber($name: String, $phone: String) {
        editNumber(name: $name, phone: $phone) {
            name
            phone
            address {
                street
                city
            }
            id
        }
    }
`
