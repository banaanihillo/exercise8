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
