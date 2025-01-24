import { Box, Button, TextField, Typography, Paper, Alert, useTheme } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authSlice';
import { RootState } from "../store";

function Login() {
    const dispatch = useDispatch();
    const [data, setData] = useState({ usuario: '', contrasena: '' });
    const [alert, setAlert] = useState({ message: '', severity: '' });
    const navigate = useNavigate();
    const theme = useTheme();
    const userData = useSelector((state: RootState) => state.authenticator);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch(`http://localhost:3030/login?user=${data.usuario}&password=${data.contrasena}`)
            .then(response => response.json())
            .then(response => {
                if (response.data.length !== 0) {
                    dispatch(authActions.login({
                        name: response.data.nombre,
                        rol: response.data.rol
                    }));
                    navigate('/Home');
                } else {
                    setAlert({ message: 'Acceso denegado.', severity: 'error' });
                }
            })
            .catch(() => {
                setAlert({ message: 'Error al conectarse al servidor.', severity: 'error' });
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(2),
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    padding: theme.spacing(4),
                    borderRadius: theme.spacing(2),
                    maxWidth: 400,
                    width: '100%',
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: theme.spacing(2),
                    }}
                >
                    <LockIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
                    <Typography variant="h5" align="center" gutterBottom>
                        SISTEMA DE ACCESO
                    </Typography>

                    <TextField
                        required
                        fullWidth
                        id="usuario"
                        label="Usuario"
                        placeholder="Ingresa tu usuario"
                        value={data.usuario}
                        onChange={(e) => setData({ ...data, usuario: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        required
                        fullWidth
                        id="contrasena"
                        label="Contraseña"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={data.contrasena}
                        onChange={(e) => setData({ ...data, contrasena: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                    />

                    <Button variant="contained" fullWidth type="submit" size="large">
                        Acceder
                    </Button>

                    {alert.message && (
                        <Alert severity={alert.severity as any} sx={{ width: '100%' }}>
                            {alert.message}
                        </Alert>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;
