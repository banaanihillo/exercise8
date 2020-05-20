import {gql as GraphQL} from "@apollo/client"

export const ALL_PERSONS = GraphQL`
    query {
        allPersons {
            name
            phone
            id
        }
    }
`

export const FIND_PERSON = GraphQL`
    query findPersonByName($nameToSearch: String) {
        findPerson(name: $nameToSearch) {
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

export const CREATE_PERSON = GraphQL`
    mutation createPerson(
        $name: String,
        $street: String,
        $city: String,
        $phone: String
    ) {
        addPerson(
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
