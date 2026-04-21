import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SpeedIcon from '@mui/icons-material/Speed';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section - More padding and spacing */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.dark} 100%)`,
          borderRadius: '32px',
          px: { xs: 4, md: 12 },
          py: { xs: 8, md: 12 },
          mb: 8,
          textAlign: 'center',
        }}
      >
        <WaterDropIcon sx={{ fontSize: 80, color: 'white', mb: 3, opacity: 0.9 }} />
        
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '3rem', md: '4.5rem' },
            fontWeight: 800,
            color: 'white',
            mb: 3,
            letterSpacing: '-0.02em',
          }}
        >
          AgriEdge
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            opacity: 0.95,
            mb: 3,
            fontWeight: 500,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
          }}
        >
          Smart Irrigation System Powered by Edge AI
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            opacity: 0.85,
            maxWidth: 650,
            mx: 'auto',
            mb: 5,
            fontSize: '1.1rem',
          }}
        >
          Real-time soil monitoring with machine learning • Save up to 50% water with intelligent automation
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              px: 5,
              py: 1.8,
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: 3,
              '&:hover': {
                bgcolor: '#f5f5f5',
                transform: 'translateY(-3px)',
              },
              transition: 'transform 0.2s ease',
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              borderColor: 'white',
              color: 'white',
              px: 5,
              py: 1.8,
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: 3,
              borderWidth: 2,
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                transform: 'translateY(-3px)',
              },
              transition: 'transform 0.2s ease',
            }}
          >
            Create Account
          </Button>
        </Box>
      </Box>

      {/* Stats Section - Spread out with more gap */}
      <Grid container spacing={5} sx={{ mb: 10 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: 'center',
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 800, color: theme.palette.success.main, mb: 2 }}>
              50%
            </Typography>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Water Savings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Average reduction in water usage
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: 'center',
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 800, color: theme.palette.info.main, mb: 2 }}>
              94%
            </Typography>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              ML Accuracy
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Edge AI prediction precision
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: 'center',
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Typography variant="h1" sx={{ fontSize: '3.5rem', fontWeight: 800, color: theme.palette.warning.main, mb: 2 }}>
              24/7
            </Typography>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Real-time Monitoring
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Continuous soil and weather tracking
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Features Section - More spacing between cards */}
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          mb: 6,
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 700,
        }}
      >
        <span className="gradient-text">Smart Features</span>
      </Typography>
      
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: 'center',
              height: '100%',
              minHeight: 280,
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              },
            }}
          >
            <AgricultureIcon sx={{ fontSize: 56, color: theme.palette.primary.main, mb: 3 }} />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Smart Irrigation
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
              AI-powered watering decisions based on real-time soil conditions and weather forecasts
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: 'center',
              height: '100%',
              minHeight: 280,
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              },
            }}
          >
            <SpeedIcon sx={{ fontSize: 56, color: theme.palette.primary.main, mb: 3 }} />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Edge AI Processing
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
              Local inference on ESP32 for ultra-low latency decisions without cloud dependency
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: 'center',
              height: '100%',
              minHeight: 280,
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              },
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 56, color: theme.palette.primary.main, mb: 3 }} />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Cloud Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
              Historical data tracking, predictive insights, and comprehensive reporting
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
