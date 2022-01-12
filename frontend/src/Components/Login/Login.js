import React, {useState} from "react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/login"

import { Container, Box, Typography, TextField, Button } from "@mui/material";

const Login = () => {
    const loginState = useSelector(state => state.authReducer)
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const url = "http://localhost:8081/login"

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(loginData)
        console.log("AuthReducer: " + loginState)
    }
    /*const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    useEffect(() => {
        dispatch(getUsers())
        console.log(getUsers())
    }, [dispatch]) */

    return (
        <Container maxWidth="sm">
            <Box>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email address"
                    name="email"
                    autoFocus
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})} />

                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    onClick={submitHandler}
                >Sign in</Button>
            </Box>
        </Container>
    )
}

export default Login