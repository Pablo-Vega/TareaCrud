import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
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
            Para acceder al manual de usuario, haz clic en el siguiente botón:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="Aqui va el pdf"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Abrir Manual de Usuario
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Ayuda;
