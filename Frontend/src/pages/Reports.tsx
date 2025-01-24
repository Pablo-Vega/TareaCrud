import { Button, Tooltip } from "@mui/material";
import Menu from '../components/Menu';
import EjemploInforme from "../components/InformeColeccion";
import InformeUsers from "../components/InformeUsuarios"
import { useState } from "react";

function Reports() {
    const [mostrar, setMostrar] = useState(false);
    const [mostrarusers, setMostrarusers] = useState(false);

    const settrue = () => {
        setMostrar(true);
        console.log(mostrar);
    }

    const settrueusers = () => {
        setMostrarusers(true);
        console.log(mostrar);
    }

    return (
        <>
            <Menu />

            <Tooltip title="Generar informe Colección" arrow placement="bottom">
                <Button variant="contained" style={{ marginTop: '50px' }} onClick={settrue}>
                    Generar informe Colección
                </Button>
            </Tooltip>

            <Tooltip title="Generar informe Usuarios" arrow placement="bottom">
                <Button variant="contained" style={{ marginTop: '50px' }} onClick={settrueusers}>
                    Generar informe Usuarios
                </Button>
            </Tooltip>

            {mostrar ? (
                <EjemploInforme />
            ) : null}

            {mostrarusers ? (
                <InformeUsers />
            ) : null}
        </>
    )
}

export default Reports;