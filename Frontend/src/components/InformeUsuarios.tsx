import { useEffect, useState } from "react";
import MaterialTable, { Column } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Box } from "@mui/material";

function InformeUsers() {
    const [tableData, setTableData] = useState<itemtype[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    interface itemtype {
        id?: number;
        nombre: string;
        login: string;
        password: string;
        rol: string;
    }

    const getitems = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3030/GetUsers');
            if (!response.ok) throw new Error("Error al obtener datos");
            const data = await response.json();
            setTableData(data.data || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getitems();
    }, []);

    const col: Array<Column<itemtype>> = [
        { title: "Nombre", field: "nombre", filtering: true },
        { title: "Login", field: "login", filtering: false },
        { title: "Password", field: "password", filtering: false },
        { title: "Rol", field: "rol", filtering: true },
    ];

    return (
        <Box sx={{ margin: "20px", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
            <MaterialTable
                columns={col}
                data={tableData}
                title="Informe de Usuarios"
                isLoading={loading}
                options={{
                    headerStyle: {
                        backgroundColor: '#0a2837',
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                    columnsButton: true,
                    filtering: true,
                    exportMenu: [
                        {
                            label: "Exportar a PDF",
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, "Informe_Usuarios"),
                        },
                        {
                            label: "Exportar a CSV",
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, "Informe_Usuarios"),
                        },
                    ],
                    rowStyle: {
                        backgroundColor: '#f5f5f5',
                    },
                }}
                localization={{
                    header: {
                        actions: "Acciones",
                    },
                    toolbar: {
                        searchPlaceholder: "Buscar...",
                    },
                }}
            />
        </Box>
    );
}

export default InformeUsers;
