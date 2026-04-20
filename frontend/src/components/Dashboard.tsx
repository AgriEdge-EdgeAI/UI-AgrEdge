import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Paper, Snackbar } from '@mui/material';
import { Opacity as MoistureIcon, Thermostat as TempIcon, PowerSettingsNew as PumpIcon } from '@mui/icons-material';
import SensorChart from './SensorChart';

const Dashboard: React.FC = () => {
  const [moisture, setMoisture] = useState(42);
  const [temperature, setTemperature] = useState(24);
  const [pumpOn, setPumpOn] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handlePump = (on: boolean) => {
    setPumpOn(on);
    setSnackbar({ open: true, message: `Pump turned ${on ? 'ON' : 'OFF'}` });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        🌱 AgriEdge Irrigation System
      </Typography>
      
      <Grid container spacing={3}>
        {/* Soil Moisture Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <MoistureIcon color="primary" />
                <Typography variant="h6">Soil Moisture</Typography>
              </Box>
              <Typography variant="h2" sx={{ fontSize: '3rem' }}>{moisture}%</Typography>
              <Typography color={moisture < 30 ? 'error' : 'success'}>
                {moisture < 30 ? '⚠️ Needs water' : '✓ Optimal'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Temperature Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <TempIcon color="secondary" />
                <Typography variant="h6">Temperature</Typography>
              </Box>
              <Typography variant="h2" sx={{ fontSize: '3rem' }}>{temperature}°C</Typography>
              <Typography color={temperature > 35 ? 'warning' : 'success'}>
                {temperature > 35 ? '⚠️ High' : '✓ Normal'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Chart Section - Full Width */}
        <Grid item xs={12}>
          <SensorChart />
        </Grid>
        
        {/* Pump Control Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <PumpIcon color="primary" />
                <Typography variant="h6">Pump Control</Typography>
              </Box>
              <Typography>
                Status: <strong style={{ color: pumpOn ? '#4caf50' : '#f44336' }}>
                  {pumpOn ? 'RUNNING' : 'OFF'}
                </strong>
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={() => handlePump(true)} 
                  disabled={pumpOn}
                >
                  Turn ON
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handlePump(false)} 
                  disabled={!pumpOn}
                >
                  Turn OFF
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Alerts Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#fff8e1' }}>
            <CardContent>
              <Typography variant="h6">⚠️ System Alerts</Typography>
              <Typography color="text.secondary">✅ No active alerts</Typography>
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Last checked: {new Date().toLocaleTimeString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Edge AI Status Footer */}
      <Paper sx={{ mt: 3, p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary">
          🤖 Edge AI running on ESP32 | TensorFlow Lite Micro
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Last inference: {new Date().toLocaleTimeString()}
        </Typography>
      </Paper>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ open: false, message: '' })} 
        message={snackbar.message} 
      />
    </Container>
  );
};

export default Dashboard;
