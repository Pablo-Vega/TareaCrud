import { Box, Grid, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";

function GestionUsuarios() {
    interface itemtype {
        id?: number;
        nombre: string;
        login: string;
        password: string;
        rol: string;
    }

    const [tableData, setTableData] = useState<itemtype[]>([]);
    const [item, setItem] = useState<itemtype>({
        nombre: "",
        login: "",
        password: "",
        rol: "",
    });

    const getitems = async () => {
        try {
            const response = await fetch("http://localhost:3030/GetUsers");
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
                `http://localhost:3030/addUsuario?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`
            );
            setItem({ nombre: "", login: "", password: "", rol: "" });
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
            <Box style={boxStyle} component="form" onSubmit={handleSubmit}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Gestión de Usuarios
                </Typography>
                <Grid container spacing={3} sx={{ width: "100%" }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            label="Nombre"
                            value={item.nombre}
                            onChange={(e) => setItem({ ...item, nombre: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            label="Login"
                            value={item.login}
                            onChange={(e) => setItem({ ...item, login: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            value={item.password}
                            onChange={(e) => setItem({ ...item, password: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Rol</InputLabel>
                            <Select
                                value={item.rol}
                                onChange={(e) => setItem({ ...item, rol: e.target.value })}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </Select>
                        </FormControl>
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

            <Box style={boxStyle}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Usuarios Registrados
                </Typography>
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#0a2837" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                                <TableCell sx={{ color: "white" }}>Login</TableCell>
                                <TableCell sx={{ color: "white" }}>Password</TableCell>
                                <TableCell sx={{ color: "white" }}>Rol</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.length > 0 ? (
                                tableData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.login}</TableCell>
                                        <TableCell>{row.password}</TableCell>
                                        <TableCell>{row.rol}</TableCell>
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

export default GestionUsuarios;
