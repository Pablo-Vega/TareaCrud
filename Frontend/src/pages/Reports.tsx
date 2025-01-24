import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Menu from '../components/Menu'; 

const Reports: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Menu /> 
      <Container sx={{ marginTop: 3 }}>
        <Paper sx={{ padding: 3, boxShadow: 3 }}>
          <Typography variant="h3" color="primary" align="center" gutterBottom>
            Reports de Pablo Vega Álamo
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" paragraph>
            Tarea CRUD
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Reports;

/*import { Button, Tooltip, Box } from "@mui/material";
import Menu from "../components/Menu";
import EjemploInforme from "../components/InformeColeccion";
import InformeUsers from "../components/InformeUsuarios";
import { useState } from "react";

function Reports() {
  const [mostrarInformeColeccion, setMostrarInformeColeccion] = useState(false);
  const [mostrarInformeUsuarios, setMostrarInformeUsuarios] = useState(false);

  const handleMostrarInformeColeccion = () => {
    setMostrarInformeColeccion(true);
    setMostrarInformeUsuarios(false);
  };

  const handleMostrarInformeUsuarios = () => {
    setMostrarInformeUsuarios(true);
    setMostrarInformeColeccion(false);
  };

  return (
    <>
      <Menu />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        marginTop={4}
      >
        <Tooltip title="Generar informe de Colección" arrow placement="bottom">
          <Button
            variant="contained"
            onClick={handleMostrarInformeColeccion}
          >
            Generar informe de Colección
          </Button>
        </Tooltip>

        <Tooltip title="Generar informe de Usuarios" arrow placement="bottom">
          <Button
            variant="contained"
            onClick={handleMostrarInformeUsuarios}
          >
            Generar informe de Usuarios
          </Button>
        </Tooltip>
      </Box>

      <Box marginTop={4}>
        {mostrarInformeColeccion && <EjemploInforme />}
        {mostrarInformeUsuarios && <InformeUsers />}
      </Box>
    </>
  );
}

export default Reports;*/