import React, {useState, useEffect} from "react"
import {useMutation} from "@apollo/client"
import {LOG_IN} from "../queries"

const LoginForm = (props) => {
    const {setErrorMessage, setToken} = props
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const [login, result] = useMutation(LOG_IN, {
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 8000)
        }
    })
    
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(result.data.login.value)
            localStorage.setItem("User Token", token)
        }
    }, [result.data, setToken])

    const handleLogin = async (event) => {
        event.preventDefault()
        login({
            variables: {
                userName,
                password
            }
        })
    }

    return (
        <div>
            <form onSubmit = {handleLogin}>
                <div>
                    User name:
                    <input
                        value = {userName}
                        onChange = {({target}) => setUserName(target.value)}
                    />
                    <br />
                    Password:
                    <input
                        type = "password"
                        value = {password}
                        onChange = {({target}) => setPassword(target.value)}
                    />
                    <br />
                    <button type = "submit"> Log in </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
