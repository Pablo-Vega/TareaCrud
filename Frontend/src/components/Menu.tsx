import React, { useEffect, useState } from 'react';
import { Typography, IconButton, Container, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Drawer } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { RootState } from '../store';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HelpIcon from '@mui/icons-material/Help';


const Menu: React.FC = () => {
  const userData = useSelector((state: RootState) => state.authenticator);
  const isLoggedin = userData.isAutenticated
  const userRole = userData?.userRol;

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/');
    }
  }, [isLoggedin, navigate]);


  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>
        </Link>
        {userRole === 'admin' && (
          <Link to="/reports" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SummarizeIcon />
                </ListItemIcon>
                <ListItemText primary="Informes" />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        <List>
          {userRole == 'admin' ? (
            <ListItem disablePadding>
              <Link to='/GestionUsuarios' style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gestión usuarios" />
                </ListItemButton>
              </Link>
            </ListItem>
          ) : null}
        </List>
        {/*Estos es del examen*/}
        <List>
          <ListItem disablePadding>
            <Link to='/GestionDeval' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Gestión Deval" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Link to="/Ayuda" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Ayuda" />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <><Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
              {userData.userName || 'Usuario'}
            </Typography>
            <IconButton color="inherit">
              {userRole === 'admin' ? <AdminPanelSettingsIcon /> : <AccountCircle />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </Container></>

  );
};

export default Menu;