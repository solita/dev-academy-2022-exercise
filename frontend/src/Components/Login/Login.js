import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { login,  } from "../../actions/login"
import axios from "axios"

import { Container, Box, Typography, TextField, Button } from "@mui/material";

const Login = () => {
    //const loginState = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const submitHandler = async (e) => {
        e.preventDefault()
        

            await axios.post("http://localhost:8081/login", loginData)
            .then(res =>{
                if(res.data){
                    dispatch(login(loginData))
                    setRedirect(true)
                    console.log("You are logged in!")
                }
            }).catch(e =>{
                console.log(e.message)
            })

    }

    /*if(redirect){
        return(
            <Routes>
                <Route exact path="/home" />
            </Routes>

        )
    }*/
    

    return (
        <Container maxWidth="sm">
            <Box>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <TextField
                    margin="normal"
                    required
                    type="email"
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