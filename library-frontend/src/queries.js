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
            genres
            author {
                name
                born
                bookCount
            }
            id
        }
    }
`

export const CREATE_BOOK = GraphQL`
    mutation createBook(
        $title: String,
        $name: String,
        $published: Int,
        $genres: [String]
    ) {
        addBook(
            title: $title,
            name: $name,
            published: $published,
            genres: $genres
        ) {
            title,
            published,
            genres,
            id
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
    mutation createAuthor($name: String) {
        addAuthor(
            name: $name
        ) {
            name,
            id,
            born
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

export const EDIT_AUTHOR = GraphQL`
    mutation editAuthor(
        $name: String,
        $setBornTo: Int
    ) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
        }
    }
`

export const LOG_IN = GraphQL`
    mutation login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
            value
        }
    }
`
