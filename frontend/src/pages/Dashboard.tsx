import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Button, Card, CardContent, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SavingsIcon from '@mui/icons-material/Savings';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface DashboardStats {
  soilMoisture: number;
  waterSaved: number;
  waterSavedPercent: number;
  temperature: number;
  humidity: number;
  pumpStatus: boolean;
  recentEvents: Array<{ time: string; event: string; details: string }>;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    soilMoisture: 58,
    waterSaved: 1240,
    waterSavedPercent: 32,
    temperature: 32,
    humidity: 68,
    pumpStatus: false,
    recentEvents: [
      { time: '10:30 AM', event: 'Irrigation completed', details: '12L used' },
      { time: '08:15 AM', event: 'Soil moisture dropped', details: '45% - Need water' },
      { time: '06:00 AM', event: 'System online', details: 'All sensors OK' },
    ],
  });

  const userName = localStorage.getItem('userName') || 'Farmer';
  const farmName = localStorage.getItem('farmName') || 'Green Valley Estate';
  const location = localStorage.getItem('location') || 'Negombo, Sri Lanka';

  const getMoistureColor = (value: number) => {
    if (value < 30) return '#f44336';
    if (value < 50) return '#ff9800';
    return '#4caf50';
  };

  const getMoistureStatus = (value: number) => {
    if (value < 30) return 'Critical - Water Now!';
    if (value < 50) return 'Low - Consider Watering';
    return 'Good - Optimal Range';
  };

  return (
    <Box>
      {/* Welcome Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" gutterBottom>
          Welcome back, {userName}!
        </Typography>
        <Typography variant="body2">
          Farm: {farmName} | {location}
        </Typography>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Soil Moisture Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <WaterDropIcon sx={{ color: getMoistureColor(stats.soilMoisture) }} />
                <Typography variant="h6">Soil Moisture</Typography>
              </Box>
              <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
                {stats.soilMoisture}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.soilMoisture} 
                sx={{ my: 1, height: 8, borderRadius: 4, bgcolor: '#e0e0e0' }}
              />
              <Typography color={getMoistureColor(stats.soilMoisture)}>
                {getMoistureStatus(stats.soilMoisture)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Water Savings Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <SavingsIcon color="success" />
                <Typography variant="h6">Water Savings</Typography>
              </Box>
              <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 'bold', color: '#4caf50' }}>
                +{stats.waterSavedPercent}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.waterSaved.toLocaleString()}L saved this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Status Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Current Status</Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Temperature:</Typography>
                <Typography variant="body2" fontWeight="bold">{stats.temperature}°C</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Humidity:</Typography>
                <Typography variant="body2" fontWeight="bold">{stats.humidity}%</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Pump Status:</Typography>
                <Typography variant="body2" fontWeight="bold" color={stats.pumpStatus ? '#4caf50' : '#f44336'}>
                  {stats.pumpStatus ? 'RUNNING' : 'OFF'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Events & Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Events</Typography>
            {stats.recentEvents.map((event, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                py: 1.5,
                borderBottom: index < stats.recentEvents.length - 1 ? '1px solid #e0e0e0' : 'none'
              }}>
                <Typography variant="body2" color="text.secondary">{event.time}</Typography>
                <Typography variant="body2" fontWeight="500">{event.event}</Typography>
                <Typography variant="body2" color="text.secondary">{event.details}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  startIcon={<AgricultureIcon />}
                  onClick={() => navigate('/live-feed')}
                >
                  Manual Irrigate
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<PictureAsPdfIcon />}
                  onClick={() => navigate('/history')}
                >
                  View Report
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
