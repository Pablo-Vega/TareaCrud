import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';

const Ayuda: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Menu />
      <Container sx={{ marginTop: 3 }}>
        <Paper sx={{ padding: 3, boxShadow: 3, textAlign: 'center' }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Manual de Usuario
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Para acceder al manual de usuario, haz clic en el siguiente enlace:
          </Typography>
          <Link to="/ManualDeUsuarioDePabloVegaAlamo.pdf" target="_blank" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Abrir Manual de Usuario
            </Button>
          </Link>
        </Paper>
      </Container>
    </Box>
  );
};

export default Ayuda;
