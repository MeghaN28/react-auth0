import React from 'react';
import { BrowserRouter, Link as RouterLink, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Profile from './Profile';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Login from './Login';
import './App.css';

function App() {
  const { isAuthenticated, logout } = useAuth0();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Container maxWidth="xl" sx={{ p: '0px !important' }}>
      <BrowserRouter basename="/react-auth0">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                React Auth0
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="navigation menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {!isAuthenticated ? (
                    <>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Button component={RouterLink} to="/login">Log In</Button>
                      </MenuItem>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Button component={RouterLink} to="/signIn">Sign Up</Button>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Button component={RouterLink} to="/profile">Profile</Button>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleCloseNavMenu();
                          logout({
                            logoutParams: { returnTo: window.location.origin + '/react-auth0' },
                          });
                        }}
                      >
                        <Button>Sign Out</Button>
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {!isAuthenticated ? (
                  <>
                    <Button component={RouterLink} to="/login" sx={{ my: 2, color: 'white', display: 'block' }}>
                      Log In
                    </Button>
                    <Button component={RouterLink} to="/signIn" sx={{ my: 2, color: 'white', display: 'block' }}>
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <>
                    <Button component={RouterLink} to="/profile" sx={{ my: 2, color: 'white', display: 'block' }}>
                      Profile
                    </Button>
                    <Button
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin + '/react-auth0' },
                        })
                      }
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      Sign Out
                    </Button>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/signIn" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
