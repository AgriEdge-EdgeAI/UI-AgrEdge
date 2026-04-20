import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          borderRadius: 4,
          p: 6,
          mb: 6,
          textAlign: 'center',
        }}
      >
        <WaterDropIcon sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h2" gutterBottom fontWeight="bold">
          AgriEdge
        </Typography>
        <Typography variant="h5" gutterBottom>
          Smart Irrigation System
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Real-time soil monitoring with Edge AI • Save up to 50% water with smart irrigation
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'white' }}
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
            <AgricultureIcon sx={{ fontSize: 50, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h6" gutterBottom>Smart Irrigation</Typography>
            <Typography variant="body2" color="text.secondary">
              AI-powered watering decisions based on real-time soil conditions
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
            <SpeedIcon sx={{ fontSize: 50, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h6" gutterBottom>Edge AI Processing</Typography>
            <Typography variant="body2" color="text.secondary">
              Local inference on ESP32 for low-latency decisions
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
            <CloudUploadIcon sx={{ fontSize: 50, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h6" gutterBottom>Cloud Analytics</Typography>
            <Typography variant="body2" color="text.secondary">
              Historical data tracking and predictive insights
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
