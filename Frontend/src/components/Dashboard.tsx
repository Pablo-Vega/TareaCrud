import { Box, Typography, TextField, Button, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function Dashboard() {
    const [tableData, setTableData] = useState<itemtype[]>([]);
    const [useEffectRefresh, setUseEffectRefresh] = useState(false);

    const userData = useSelector((state: RootState) => state.authenticator);
    const rol = userData.userRol;

    const getItems = async () => {
        try {
            const response = await fetch('http://localhost:3030/GetItems');
            const data = await response.json();
            setTableData(data.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    useEffect(() => {
        if (useEffectRefresh) {
            getItems();
            setUseEffectRefresh(false);
        }
    }, [useEffectRefresh]);

    interface itemtype {
        id?: number;
        nombre: string;
        marca: string;
        tipo: string;
        precio: number;
    }

    const itemInitialState: itemtype = {
        nombre: '',
        marca: '',
        tipo: '',
        precio: 0,
    };
    const [item, setItem] = useState<itemtype>(itemInitialState);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`);
            const result = await response.json();

            if (result.success) {
                setUseEffectRefresh(true);
                setItem(itemInitialState);
            } else {
                console.error("Error al insertar el item:", result.message);
            }
        } catch (error) {
            console.error("Error al insertar:", error);
        }
    };

    const handleDeleteItem = async (itemId: number) => {
        try {
            const response = await fetch(`http://localhost:3030/deleteItem?id=${itemId}`);
            const result = await response.json();

            if (result.success) {

                setTableData(tableData.filter(item => item.id !== itemId));
                setUseEffectRefresh(true);
            } else {
                console.error("Error al eliminar el item:", result.message);
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    return (
        <>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto', flexDirection: 'column' }} component="form" onSubmit={handleSubmit}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}><Typography>INTRODUCCIÓN DE DATOS</Typography></Grid2>
                    <Grid2 size={6}><TextField label="Marca" value={item.marca} onChange={(e) => setItem({ ...item, marca: e.target.value })} required fullWidth /></Grid2>
                    <Grid2 size={6}><TextField label="Nombre" value={item.nombre} onChange={(e) => setItem({ ...item, nombre: e.target.value })} required fullWidth /></Grid2>
                    <Grid2 size={6}><TextField label="Tipo" value={item.tipo} onChange={(e) => setItem({ ...item, tipo: e.target.value })} required fullWidth /></Grid2>
                    <Grid2 size={6}><TextField label="Precio" value={item.precio} onChange={(e) => setItem({ ...item, precio: parseFloat(e.target.value) || 0 })} required fullWidth /></Grid2>

                    <Grid2 size={12}>
                        {rol === 'user' ? (
                            <Button variant="contained" disabled fullWidth type="submit">Insertar datos</Button>
                        ) : (
                            <Tooltip title="Insertar datos" arrow>
                                <Button variant="contained" fullWidth type="submit">Insertar datos</Button>
                            </Tooltip>
                        )}
                    </Grid2>
                </Grid2>
            </Box>

            <Box>

                <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#0a2837" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                                <TableCell sx={{ color: "white" }}>Marca</TableCell>
                                <TableCell sx={{ color: "white" }}>Tipo</TableCell>
                                <TableCell sx={{ color: "white" }}>Precio</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.nombre}</TableCell>
                                    <TableCell>{row.marca}</TableCell>
                                    <TableCell>{row.tipo}</TableCell>
                                    <TableCell>{row.precio}</TableCell>
                                    {rol === 'admin' && (
                                        <TableCell>
                                            <Tooltip title="Borrar registro" arrow>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() => handleDeleteItem(row.id!)}
                                                >
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

            </Box>
        </>
    );
}

export default Dashboard;
