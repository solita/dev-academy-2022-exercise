import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./DataVisualization.css"
import { Table, TableContainer, TableCell, Paper, TableBody, TableHead, TableRow, Grid, Typography, Select, Input, InputLabel, MenuItem } from "@mui/material"
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDrop from "./waterDrop.png"
import RainFall from "./rainFall.png"



function DataVisualization() {
    const [farm, setFarm] = useState([])
    const [menu, setMenu] = useState([])
    const [selection, setSelection] = useState('')

    const array = ["Hey", "famous"]

    const classes = {
        table: {
            minWidth: 650,
            width: 1000,
        },
        tableContainer: {
            borderRadius: "15px",
            margin: "10px 15px",
            maxWidth: "1200px"
        },
        tableHeaderCell: {
            fontWeight: "bold",
            backgroundColor: "orange"
        }
    }

    const handleSelection = (e) => {
        e.preventDefault()

        setSelection(e.target.value)
    }

    const getAllFarms = () => {
        setMenu([])
        axios.get(`http://localhost:8081/farms`)
            .then(res => {

                const result = res.data

                //extract names for the selection
                for (var i in result) {
                    const farmName = result[i]["farmName"]
                    const foo = {
                        farmName: farmName,
                        id: result[i]["_id"]
                    }

                    setMenu(prev => [...prev, foo])
                }

            }).catch(e => {
                console.log({ message: e })
            })
    }

    //fetch a farm and it's data
    const fetchFarm = async (id) => {
        await axios.get(`http://localhost:8081/farms/${id}`)
            .then(res => {
                setFarm([])
                const results = res.data
                console.log(results)
                console.log(results["data"])
                results["data"].forEach(row => {
                    setFarm(prev => [...prev, row])
                });
            }).catch(e => {
                console.log({ message: e })
            })
    }

    useEffect(() => {
        fetchFarm(selection)
        getAllFarms()
    }, [selection])

    return (
        <div className="container">
            <h2>Data visualization</h2>
            <div>
                <InputLabel htmlFor="selector">Select a farm</InputLabel>
                <Select
                    label="Farms"
                    variant="outlined"
                    input={<Input name="Farm" />}
                    id="selector"
                    defaultValue=""
                    fullWidth
                    onChange={handleSelection}
                    sx={{ background: "#e3e3e3", marginBottom: 5 }}
                >
                    {menu.map(farm => {
                        return (
                            <MenuItem key={farm.id} value={farm.id}>{farm.farmName}</MenuItem>
                        )
                    })}

                </Select>
            </div>
            <TableContainer component={Paper} sx={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead sx={classes.tableHeaderCell}>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Sensor type</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {farm.map((row) => (
                            <TableRow key={row.datetime}>
                                <TableCell>{row.datetime}</TableCell>
                                <TableCell>{
                                    row.sensorType == "rainFall" ? "Rainfall"
                                        : row.sensorType == "pH" ? "PH"
                                            : "Temperature"}
                                </TableCell>
                                <TableCell>
                                    <Grid container>
                                        <Grid item sm={6}>
                                            {row.value}
                                        </Grid>
                                        <Grid item sm={2}>
                                            {row.sensorType == "rainFall" ? <img src={RainFall} style={{ width: "20px" }} />
                                                : row.sensorType == "pH" ? <img src={WaterDrop} style={{ width: "20px" }} />
                                                    : <ThermostatIcon sx={{ width: "20px" }} />}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DataVisualization
