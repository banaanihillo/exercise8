import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    gql as GraphQL,
    ApolloProvider
} from "@apollo/client"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        url: "http://localhost:4000"
    })
})

const query = GraphQL`
    query {
        allPersons {
            name,
            phone,
            address {
                street,
                city
            },
            id
        }
    }
`

client.query({query})
    .then((response) => {
        console.log(response.data)
    })

ReactDOM.render(
    <ApolloProvider client = {client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
)
