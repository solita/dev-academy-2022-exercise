import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/login"
import axios from "axios"

import { Container, Box, Typography, TextField, Button, Alert, Stack } from "@mui/material";

const Signup = () => {
    //const SignupState = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [error, setError] = useState('')

    const [SignupData, setSignupData] = useState({
        email: null,
        username: null,
        password: null
    })

    const submitHandler = async (e) => {
        if(SignupData.email == null || SignupData.password == null){
            setError("Please fill all the required values!")
        }
        e.preventDefault()
        
            //TO-DO redux signup logic
            await axios.post("http://localhost:8081/Signup", SignupData)
            .then(res =>{
                if(res.data){
                    //dispatch(Signup(SignupData))
                    console.log(res.data.message)
                    //redirects to farms route
                    window.location.href = "/"
                }
            }).catch(e =>{
                console.log(e.message)
                if(SignupData.email && SignupData.password && SignupData.username != null){
                    setError("Check your Signup information!")
                }
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
                <form>
                <Typography component="h1" variant="h5" sx={{textAlign: "center"}}>
                    Register
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
                    onChange={(e) => setSignupData({...SignupData, email: e.target.value}, setError(null))}
                />
                <TextField
                    margin="normal"
                    required
                    type="email"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    onChange={(e) => setSignupData({...SignupData, username: e.target.value}, setError(null))}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    onChange={(e) => setSignupData({...SignupData, password: e.target.value})} 
                    />
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            onClick={submitHandler}
                        >Register</Button>
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={()=> {window.location.href = "/"}}
                            sx={{background: "skyblue", minWidth: "30%"}}
                        >Back</Button>
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

export default Signup