import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button, Card, CardContent, LinearProgress, Chip, Alert, IconButton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import ComputerIcon from '@mui/icons-material/Computer';
import MemoryIcon from '@mui/icons-material/Memory';
import PowerIcon from '@mui/icons-material/Power';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ScheduleIcon from '@mui/icons-material/Schedule';

// Mock historical data for the chart
const generateMockData = () => {
  const data = [];
  for (let i = 0; i <= 24; i++) {
    data.push({
      time: `${i}`,
      moisture: 45 + Math.sin(i / 6) * 15 + Math.random() * 5,
      temp: 25 + Math.sin(i / 12) * 5 + Math.random() * 2,
    });
  }
  return data;
};

const LiveFeed: React.FC = () => {
  const [moistureData, setMoistureData] = useState(generateMockData());
  const [sensorReadings, setSensorReadings] = useState({
    soilMoisture: 58,
    temperature: 32,
    humidity: 68,
    lastReading: '2 seconds ago',
  });
  const [pumpStatus, setPumpStatus] = useState(false);
  const [edgeStatus, setEdgeStatus] = useState({
    piOnline: true,
    cpu: 12,
    ram: 34,
    disk: 28,
    lastInference: '2s ago',
    model: 'KNN v1.2',
    arduinoConnected: true,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorReadings(prev => ({
        soilMoisture: Math.max(30, Math.min(80, prev.soilMoisture + (Math.random() - 0.5) * 3)),
        temperature: Math.max(25, Math.min(40, prev.temperature + (Math.random() - 0.5) * 0.5)),
        humidity: Math.max(50, Math.min(85, prev.humidity + (Math.random() - 0.5) * 2)),
        lastReading: 'just now',
      }));
      
      setEdgeStatus(prev => ({
        ...prev,
        cpu: Math.max(5, Math.min(30, prev.cpu + (Math.random() - 0.5) * 2)),
        ram: Math.max(30, Math.min(45, prev.ram + (Math.random() - 0.5) * 1)),
        lastInference: 'just now',
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getMoistureStatus = (value: number) => {
    if (value < 30) return { text: 'Critical - Water Now!', color: '#f44336' };
    if (value < 50) return { text: 'Low - Consider Watering', color: '#ff9800' };
    return { text: 'Optimal', color: '#4caf50' };
  };

  const moistureStatus = getMoistureStatus(sensorReadings.soilMoisture);

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Real-Time Monitoring
      </Typography>

      <Grid container spacing={3}>
        {/* Soil Moisture Trend Chart */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Soil Moisture Trend (Last 24h)
            </Typography>
            <Box sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moistureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" label={{ value: 'Hour', position: 'bottom' }} />
                  <YAxis domain={[0, 100]} label={{ value: 'Moisture (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="moisture" stroke="#2e7d32" fill="#2e7d32" fillOpacity={0.3} name="Soil Moisture" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Temperature & Humidity Card */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Temperature & Humidity</Typography>
              <Box textAlign="center" py={2}>
                <ThermostatIcon sx={{ fontSize: 48, color: '#f44336' }} />
                <Typography variant="h3" fontWeight="bold">{sensorReadings.temperature}°C</Typography>
                <Typography variant="body2" color="text.secondary">Temperature</Typography>
              </Box>
              <Box textAlign="center" py={2}>
                <OpacityIcon sx={{ fontSize: 48, color: '#2196f3' }} />
                <Typography variant="h3" fontWeight="bold">{sensorReadings.humidity}%</Typography>
                <Typography variant="body2" color="text.secondary">Humidity</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sensor Readings Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Sensor Readings</Typography>
            
            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Soil Moisture Sensor:</Typography>
                <Typography variant="body2" fontWeight="bold" color={moistureStatus.color}>
                  {sensorReadings.soilMoisture}% ({moistureStatus.text})
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={sensorReadings.soilMoisture} 
                sx={{ height: 8, borderRadius: 4, bgcolor: '#e0e0e0' }}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">Temperature Sensor:</Typography>
              <Typography variant="body2" fontWeight="bold">{sensorReadings.temperature}°C</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">Humidity Sensor:</Typography>
              <Typography variant="body2" fontWeight="bold">{sensorReadings.humidity}%</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="caption" color="text.secondary">Last Reading:</Typography>
              <Chip label={sensorReadings.lastReading} size="small" color="success" />
            </Box>
          </Paper>
        </Grid>

        {/* Edge Device Status Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Edge Device Status</Typography>
            
            <Box mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <ComputerIcon color={edgeStatus.piOnline ? 'success' : 'error'} />
                  <Typography variant="body2" fontWeight="bold">Raspberry Pi 4</Typography>
                </Box>
                <Chip label={edgeStatus.piOnline ? 'Online' : 'Offline'} size="small" color={edgeStatus.piOnline ? 'success' : 'error'} />
              </Box>
              
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="caption">CPU: {edgeStatus.cpu}%</Typography>
                  <LinearProgress variant="determinate" value={edgeStatus.cpu} sx={{ height: 4 }} />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption">RAM: {edgeStatus.ram}%</Typography>
                  <LinearProgress variant="determinate" value={edgeStatus.ram} sx={{ height: 4 }} />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption">Disk: {edgeStatus.disk}%</Typography>
                  <LinearProgress variant="determinate" value={edgeStatus.disk} sx={{ height: 4 }} />
                </Grid>
              </Grid>
              
              <Box mt={1}>
                <Typography variant="caption" display="block">Last Inference: {edgeStatus.lastInference}</Typography>
                <Typography variant="caption" display="block">Model: {edgeStatus.model}</Typography>
              </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={1}>
                <MemoryIcon color={edgeStatus.arduinoConnected ? 'success' : 'error'} />
                <Typography variant="body2">Arduino Node</Typography>
              </Box>
              <Chip label={edgeStatus.arduinoConnected ? 'Connected' : 'Disconnected'} size="small" color={edgeStatus.arduinoConnected ? 'success' : 'error'} />
            </Box>
          </Paper>
        </Grid>

        {/* Manual Pump Control Card */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Manual Pump Control</Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <Button 
                variant="contained" 
                color="success" 
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={() => setPumpStatus(true)}
                disabled={pumpStatus}
              >
                Start Pump
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                size="large"
                startIcon={<StopIcon />}
                onClick={() => setPumpStatus(false)}
                disabled={!pumpStatus}
              >
                Stop Pump
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                startIcon={<ScheduleIcon />}
              >
                Schedule
              </Button>
            </Box>
            {pumpStatus && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Pump is currently RUNNING. Water flow: 2.5 L/min
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LiveFeed;
