import React, { useState } from 'react'
import { parse } from "papaparse"
import { Container, Box, Typography, TextField, Button, Stack, Select, MenuItem, InputLabel, Input } from "@mui/material"

function Farm() {

    const [selection, setSelection] = useState('')
    const [farm, setFarm] = useState([{
        location: null,
        datetime: null,
        sensorType: null,
        value: null
    }])

    const handleChange = (e) => {
        e.preventDefault()

        setSelection(e.target.value)

    }

    const handleDrop = (e) => {
        e.preventDefault()

        //TO-DO validate filetype
        Array.from(e.dataTransfer.files)
            .filter(file => file.type === "text/csv")
            .forEach(async (file) => {
                const data = await file.text()
                const result = parse(data, { header: true })
                console.log(result)
                setFarm(...selection, result.data)
            })
        console.log(e.dataTransfer.files)
    }

    return (
        <Container maxWidth="sm">
            <Box>
                <Typography component="h1"
                    variant="h5"
                    sx={{ textAlign: "center", margin: 3 }}
                >
                    Input a farm's CSV file
                </Typography>
                <InputLabel htmlFor="selector">age</InputLabel>
                <Select
                    label="Farms"
                    variant="outlined"
                    input={<Input name="age" id="age-helper" />}
                    id="selector"
                    value={selection}
                    fullWidth
                    onChange={handleChange}
                    sx={{ background: "#e3e3e3", marginBottom: 5 }}
                >
                    <MenuItem value={"Farm1"}>Farm</MenuItem>
                    <MenuItem value={"Farm1"}>Farm1</MenuItem>
                    <MenuItem value={"Farm1"}>Farm2</MenuItem>
                </Select>
                <TextField
                    label="Drop it here"
                    variant="outlined"
                    fullWidth
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                        e.preventDefault()
                    }}
                    sx={{ background: "#e3e3e3" }}
                />
            </Box>
            <Box>
                {farm.map((farm) => (
                    <li>
                        <ul>
                            <strong>{farm.location}</strong>
                            <p>{farm.datetime}</p>
                            <p>{farm.sensorType}</p>
                            <p>{farm.value}</p>
                        </ul>
                    </li>
                ))}
            </Box>
        </Container>
    )
}

export default Farm
