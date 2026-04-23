import React from 'react';
import { Grid, Paper, Typography, Box, Button, LinearProgress, Avatar, Divider, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SavingsIcon from '@mui/icons-material/Savings';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Chip from '@mui/material/Chip';

const PRIMARY_GREEN = '#0d6b3a';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Farmer';
  const farmName = localStorage.getItem('farmName') || 'THEMIYA';
  const location = localStorage.getItem('location') || 'Baththaramulla';
  
  const stats = { 
    soilMoisture: 58, 
    waterSavedPercent: 32, 
    waterSavedLiters: 1240, 
    temperature: 32, 
    humidity: 68, 
    pumpStatus: false 
  };
  
  const recentEvents = [
    { time: '10:30 AM', event: 'Irrigation completed', details: '12 L used', type: 'success' },
    { time: '08:15 AM', event: 'Low moisture alert', details: 'Soil at 45%', type: 'warning' },
    { time: '06:00 AM', event: 'System check', details: 'All sensors OK', type: 'info' },
  ];

  const systemHealth = [
    { label: 'ESP32 Edge Device', status: 'online', metric: '98%', color: PRIMARY_GREEN },
    { label: 'Soil Moisture Sensor', status: 'online', metric: 'Active', color: PRIMARY_GREEN },
    { label: 'Temperature Sensor', status: 'online', metric: 'Active', color: PRIMARY_GREEN },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Banner - FIXED with NEW GREEN */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        background: `linear-gradient(135deg, ${PRIMARY_GREEN} 0%, #1a8549 100%)`, 
        borderRadius: 3,
        boxShadow: `0 4px 20px rgba(13,107,58,0.2)`,
      }}>
        <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: '#ffffff', mb: 1 }}>
          Good morning, {userName} 🌿
        </Typography>
        <Typography variant="body1" sx={{ color: '#e8f5e9' }}>
          {farmName} · {location}
        </Typography>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Soil Moisture Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              height: '100%', 
              minHeight: 210,
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: `0 20px 30px -12px rgba(13,107,58,0.2)`,
                borderColor: PRIMARY_GREEN,
              }
            }}
          >
            <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: `rgba(13,107,58,0.1)`, width: 56, height: 56 }}>
              <WaterDropIcon sx={{ color: PRIMARY_GREEN, fontSize: 32 }} />
            </Avatar>
            <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 800, color: PRIMARY_GREEN, mb: 1 }}>
              {stats.soilMoisture}%
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a', mb: 1 }}>
              Soil Moisture
            </Typography>
            <LinearProgress variant="determinate" value={stats.soilMoisture} sx={{ height: 6, borderRadius: 3, mb: 1 }} />
            <Chip 
              label="✓ Optimal range" 
              size="small" 
              sx={{ bgcolor: `rgba(13,107,58,0.1)`, color: PRIMARY_GREEN, fontWeight: 600, fontSize: '0.7rem' }}
            />
          </Paper>
        </Grid>
        
        {/* Water Savings Card - ORANGE */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              height: '100%', 
              minHeight: 210,
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 20px 30px -12px rgba(249,115,22,0.2)',
                borderColor: '#f97316',
              }
            }}
          >
            <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(249,115,22,0.1)', width: 56, height: 56 }}>
              <SavingsIcon sx={{ color: '#f97316', fontSize: 32 }} />
            </Avatar>
            <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 800, color: '#f97316', mb: 1 }}>
              +{stats.waterSavedPercent}%
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a', mb: 0.5 }}>
              Water Savings
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
              {stats.waterSavedLiters.toLocaleString()} L saved this month
            </Typography>
            <Chip 
              label="↑ 12% vs last month" 
              size="small" 
              sx={{ mt: 1, bgcolor: 'rgba(249,115,22,0.1)', color: '#f97316', fontWeight: 600, fontSize: '0.7rem' }}
            />
          </Paper>
        </Grid>
        
        {/* Field Conditions Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              height: '100%', 
              minHeight: 210,
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 20px 30px -12px rgba(59,130,246,0.2)',
                borderColor: '#3b82f6',
              }
            }}
          >
            <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(59,130,246,0.1)', width: 56, height: 56 }}>
              <DeviceThermostatIcon sx={{ color: '#3b82f6', fontSize: 32 }} />
            </Avatar>
            <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 800, color: '#3b82f6', mb: 1 }}>
              {stats.temperature}°C
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a', mb: 0.5 }}>
              Field Conditions
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
              Humidity: {stats.humidity}%
            </Typography>
            <Chip 
              label={stats.pumpStatus ? "Pump: RUNNING" : "Pump: IDLE"} 
              size="small" 
              sx={{ mt: 1, bgcolor: stats.pumpStatus ? 'rgba(239,68,68,0.1)' : 'rgba(100,116,139,0.1)', color: stats.pumpStatus ? '#ef4444' : '#64748b', fontWeight: 600 }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, border: '1px solid #e2e8f0' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>
              Recent Events
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {recentEvents.map((event, i) => (
              <Box key={i} sx={{ transition: 'all 0.2s ease', '&:hover': { bgcolor: '#f8fafc', transform: 'translateX(4px)' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {event.type === 'success' && <CheckCircleIcon sx={{ color: PRIMARY_GREEN }} />}
                    {event.type === 'warning' && <WarningAmberIcon sx={{ color: '#f97316' }} />}
                    {event.type === 'info' && <InfoOutlinedIcon sx={{ color: '#3b82f6' }} />}
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a' }}>{event.event}</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>{event.details}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>{event.time}</Typography>
                </Box>
                {i < recentEvents.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, border: '1px solid #e2e8f0' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button 
                fullWidth 
                variant="contained" 
                startIcon={<AgricultureIcon />} 
                endIcon={<ArrowForwardIcon />} 
                onClick={() => navigate('/live-feed')} 
                sx={{ 
                  py: 1.5, 
                  justifyContent: 'space-between', 
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${PRIMARY_GREEN}, #1a8549)`,
                  color: '#ffffff',
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                Manual Irrigate
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<HistoryIcon />} 
                endIcon={<ArrowForwardIcon />} 
                onClick={() => navigate('/history')} 
                sx={{ 
                  py: 1.5, 
                  justifyContent: 'space-between', 
                  borderRadius: 2,
                  borderColor: PRIMARY_GREEN,
                  color: PRIMARY_GREEN,
                  '&:hover': { borderColor: '#1a8549', backgroundColor: `rgba(13,107,58,0.04)`, transform: 'translateY(-2px)' }
                }}
              >
                View Full History
              </Button>
            </Box>
            
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #e2e8f0' }}>
              <Typography variant="subtitle2" sx={{ color: '#0f172a', mb: 2, fontWeight: 700 }}>
                System Health
              </Typography>
              {systemHealth.map((item, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, p: 1, borderRadius: 1, transition: 'all 0.2s ease', '&:hover': { bgcolor: '#f8fafc' } }}>
                  <Typography variant="body2" sx={{ color: '#475569' }}>{item.label}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant="caption" sx={{ color: item.color, fontWeight: 600 }}>{item.metric}</Typography>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
