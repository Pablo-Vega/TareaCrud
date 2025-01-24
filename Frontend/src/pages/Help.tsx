import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Menu from '../components/Menu';

const Ayuda: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Menu />
      <Container sx={{ marginTop: 3 }}>
        <Paper sx={{ padding: 3, boxShadow: 3, textAlign: 'center' }}>
          <Typography variant="h4" color="error" gutterBottom>
            Página no disponible
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Actualmente la página de ayuda no está disponible.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Ayuda;
