import { Button, Tooltip, Box } from "@mui/material";
import Menu from "../components/Menu";
import EjemploInforme from "../components/InformeColeccion";
import InformeUsers from "../components/InformeUsuarios";
import InformeDeval from '../components/InformeDeval';
import { useState } from "react";

function Reports() {
  const [mostrarInformeColeccion, setMostrarInformeColeccion] = useState(false);
  const [mostrarInformeUsuarios, setMostrarInformeUsuarios] = useState(false);
  const [mostrarInformeDeval, setMostrarInformeDeval] = useState(false);

  const handleMostrarInformeColeccion = () => {
    setMostrarInformeColeccion(true);
    setMostrarInformeUsuarios(false);
    setMostrarInformeDeval(false);
  };

  const handleMostrarInformeUsuarios = () => {
    setMostrarInformeUsuarios(true);
    setMostrarInformeColeccion(false);
    setMostrarInformeDeval(false);
  };

  const handleMostrarInformeDeval = () => {
    setMostrarInformeDeval(true);
    setMostrarInformeColeccion(false);
    setMostrarInformeUsuarios(false);
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

        <Tooltip title="Generar informe de Devaluacion" arrow placement="bottom">
          <Button
            variant="contained"
            onClick={handleMostrarInformeDeval}
          >
            Generar informe de Devaluacion
          </Button>
        </Tooltip>
      </Box>

      <Box marginTop={4}>
        {mostrarInformeColeccion && <EjemploInforme />}
        {mostrarInformeUsuarios && <InformeUsers />}
        {mostrarInformeDeval && <InformeDeval />}
      </Box>
    </>
  );
}

export default Reports;