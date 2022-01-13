import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/login"
import axios from "axios"

import { Container, Box, Typography, TextField, Button, Alert, Stack } from "@mui/material";

const Login = () => {
    //const loginState = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState('')

    const [loginData, setLoginData] = useState({
        email: null,
        password: null
    })

    const submitHandler = async (e) => {
        if(loginData.email == null || loginData.password == null){
            setError("Login information is needed")
        }
        e.preventDefault()
        
        //TO-DO redux login function
            await axios.post("http://localhost:8081/login", loginData)
            .then(res =>{
                if(res.data){
                    dispatch(login(loginData))
                    setRedirect(true)
                    console.log(res.data.message)
                    //redirects to farms route
                    window.location.href = "/farms"
                }
            }).catch(e =>{
                console.log(e.message)
                if(loginData.email && loginData.password != null){
                    setError("Check your login information!")
                }
            })

    }
    

    return (
        <Container maxWidth="sm">
            <Box>
                <form>
                <Typography component="h1" variant="h5" sx={{textAlign: "center"}}>
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
                    onChange={(e) => setLoginData({...loginData, email: e.target.value}, setError(null))}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                    />
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            onClick={submitHandler}
                        >Sign in</Button>
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={()=> {window.location.href = "/signup"}}
                            sx={{background: "skyblue", minWidth: "30%"}}
                        >Register</Button>
                    </Stack>
                </form>
                {error ? (
                    <Stack sx={{width: "100%"}} spacing={2}>
                        <Alert severity="error" onClick={() => setError(null)}>
                            {error}
                        </Alert>
                    </Stack>
                ) : (null)}
            </Box>
        </Container>
    )
}

export default Login