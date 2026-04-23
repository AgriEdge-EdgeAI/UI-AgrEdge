import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SensorsIcon from '@mui/icons-material/Sensors';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const PRIMARY_GREEN = '#0d6b3a';
const PRIMARY_GREEN_LIGHT = '#1a8549';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Farmer');
  const [userInitial, setUserInitial] = useState('F');

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const name = localStorage.getItem('userName') || 'Farmer';
      setIsLoggedIn(loggedIn);
      setUserName(name);
      setUserInitial(name.charAt(0).toUpperCase());
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
    handleClose();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2, minHeight: { xs: 60, md: 68 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate(isLoggedIn ? '/dashboard' : '/')}>
            <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: `linear-gradient(135deg, ${PRIMARY_GREEN}, ${PRIMARY_GREEN_LIGHT})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AgricultureIcon sx={{ fontSize: 20, color: '#fff' }} />
            </Box>
            <Typography variant="h6" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#0f172a' }}>
              AgriEdge
            </Typography>
          </Box>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1, ml: 4 }}>
              <Button onClick={() => navigate('/dashboard')} startIcon={<DashboardIcon />} sx={{ color: isActive('/dashboard') ? PRIMARY_GREEN : '#475569' }}>Dashboard</Button>
              <Button onClick={() => navigate('/live-feed')} startIcon={<SensorsIcon />} sx={{ color: isActive('/live-feed') ? PRIMARY_GREEN : '#475569' }}>Live Feed</Button>
              <Button onClick={() => navigate('/history')} startIcon={<HistoryIcon />} sx={{ color: isActive('/history') ? PRIMARY_GREEN : '#475569' }}>History</Button>
            </Box>
          )}

          <Box sx={{ ml: 'auto' }}>
            {isLoggedIn ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={handleMenu}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                    <Typography variant="caption" sx={{ color: PRIMARY_GREEN, fontWeight: 600 }}>LIVE</Typography>
                  </Box>
                  <Avatar sx={{ width: 34, height: 34, bgcolor: PRIMARY_GREEN, color: '#fff', fontWeight: 600 }}>{userInitial}</Avatar>
                </Box>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} PaperProps={{ sx: { mt: 1.5, minWidth: 180, borderRadius: 2 } }}>
                  <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}><PersonIcon sx={{ mr: 1, fontSize: 20 }} /> Dashboard</MenuItem>
                  <MenuItem onClick={() => { navigate('/settings'); handleClose(); }}><SettingsIcon sx={{ mr: 1, fontSize: 20 }} /> Settings</MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: '#ef4444' }}><LogoutIcon sx={{ mr: 1, fontSize: 20 }} /> Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button onClick={() => navigate('/login')} sx={{ color: '#475569' }}>Login</Button>
                <Button variant="contained" onClick={() => navigate('/register')} sx={{ background: `linear-gradient(135deg, ${PRIMARY_GREEN}, ${PRIMARY_GREEN_LIGHT})` }}>Get Started</Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
