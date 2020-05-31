import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
    split
} from "@apollo/client"
import {setContext} from "apollo-link-context"
import {getMainDefinition} from "@apollo/client/utilities"
import {WebSocketLink} from "@apollo/link-ws"

const authorizationLink = setContext((_emptyparameter, {headers}) => {
    const token = localStorage.getItem("User Token")
    return {
        headers: {
            ...headers,
            authorization: (token) ? `Bearer ${token}` : null
        }
    }
})

const httpLink = new HttpLink({
    uri: "http://localhost:4000"
})

const webSocketLink = new WebSocketLink({
    uri: "ws://localhost:4000/graphql",
    options: {
        reconnect: true
    }
})

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query)
        return (
            (definition.kind === "OperationDefinition"
            && definition.operation === "subscription")
        )
    },
    webSocketLink,
    authorizationLink.concat(httpLink)
)

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
})

ReactDOM.render(
    <ApolloProvider client = {client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
)
