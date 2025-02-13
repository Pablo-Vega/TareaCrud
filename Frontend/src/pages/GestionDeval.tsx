import { Box, Grid, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import { RootState } from '../store';
import { useSelector } from 'react-redux';

function GestionDeval() {
    interface itemtype {
        id?: number;
        articulo: string;
        meses: number;
        devaluacion: number;
    }
    const userData = useSelector((state: RootState) => state.authenticator);
    const rol = userData.userRol;
    const [tableData, setTableData] = useState<itemtype[]>([]);
    const [item, setItem] = useState<itemtype>({
        articulo: "",
        meses: 0,
        devaluacion: 0,
    });

    const getitems = async () => {
        try {
            const response = await fetch("http://localhost:3030/GetDeval");
            if (!response.ok) throw new Error("Error al obtener datos");
            const data = await response.json();
            setTableData(data.data || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch(
                `http://localhost:3030/addDeval?articulo=${item.articulo}&meses=${item.meses}&devaluacion=${item.devaluacion}`
            );
            setItem({ articulo: "", meses: 0, devaluacion: 0});
            getitems();
        } catch (error) {
            console.error("Error al insertar datos:", error);
        }
    };

    useEffect(() => {
        getitems();
    }, []);

    const boxStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "20px auto",
        gap: "20px",
        width: "90%",
    };

    return (
        <>
            <Menu />
            {rol === 'admin' && (
            <Box style={boxStyle} component="form" onSubmit={handleSubmit}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Gestión de Devaluaciones
                </Typography>
                <Grid container spacing={3} sx={{ width: "100%" }}>
                    <Grid item xs={12} md={6}>
                        <TextField required fullWidth label="Articulo" value={item.articulo} onChange={(e) => setItem({ ...item, articulo: e.target.value })}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required fullWidth label="meses" type="meses" value={item.meses} onChange={(e) => setItem({ ...item, meses: parseFloat(e.target.value) || 0 })}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required fullWidth label="devaluacion" type="devaluacion" value={item.devaluacion} onChange={(e) => setItem({ ...item, devaluacion: parseFloat(e.target.value) || 0 })}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Tooltip title="Insertar datos" arrow>
                            <Button variant="contained" fullWidth type="submit">
                                Insertar datos
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
                )}
            <Box style={boxStyle}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Registros de Devaluaciones
                </Typography>
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#0a2837" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Articulo</TableCell>
                                <TableCell sx={{ color: "white" }}>Meses</TableCell>
                                <TableCell sx={{ color: "white" }}>Devaluacion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.length > 0 ? (
                                tableData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.articulo}</TableCell>
                                        <TableCell>{row.meses}</TableCell>
                                        <TableCell>{row.devaluacion}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No hay datos disponibles.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default GestionDeval;