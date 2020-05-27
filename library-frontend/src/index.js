import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink} from "@apollo/client"
import {setContext} from "apollo-link-context"

const authorizationLink = setContext((_emptyparameter, {headers}) => {
    const token = localStorage.getItem("User Token")
    return {
        headers: {
            ...headers,
            authorization: (token) ? `Bearer ${token}` : null
        }
    }
})

const httpLink = new HttpLink({uri: "http://localhost:4000"})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authorizationLink.concat(httpLink)
})

ReactDOM.render(
    <ApolloProvider client = {client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
)
