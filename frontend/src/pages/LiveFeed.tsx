import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, Typography, Box, Button, LinearProgress,
  Chip, Divider, Avatar, Container
} from '@mui/material';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import ComputerIcon from '@mui/icons-material/Computer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

// Generate 24h moisture data
const generate24hMoisture = () => {
  const data = [];
  for (let i = 0; i <= 24; i += 2) {
    data.push({
      time: `${String(i).padStart(2, '0')}:00`,
      moisture: Math.round(45 + Math.sin(i / 5) * 14 + (Math.random() - 0.5) * 4)
    });
  }
  return data;
};

// Generate 30-day ML prediction
const generateMLPrediction = () => {
  const data = [];
  for (let d = 1; d <= 30; d++) {
    let predicted = 18;
    if (d < 12) predicted = 18;
    else if (d < 18) predicted = 14;
    else if (d < 24) predicted = 19;
    else predicted = 20;
    predicted = predicted + (Math.random() - 0.5) * 3;
    predicted = Math.max(8, Math.round(predicted * 10) / 10);
    
    let dayLabel = '';
    if (d <= 6) dayLabel = `May ${25 + d - 1}`;
    else if (d <= 12) dayLabel = `Jun ${d - 6}`;
    else dayLabel = `Jun ${d - 6}`;
    
    data.push({ day: dayLabel, predicted });
  }
  return data;
};

const mlData = generateMLPrediction();
const totalPredicted = mlData.reduce((s, d) => s + d.predicted, 0);
const lastMonthTotal = 512;
const savingsDelta = Math.round(((lastMonthTotal - totalPredicted) / lastMonthTotal) * 100);

const LiveFeed: React.FC = () => {
  const [moistureData] = useState(generate24hMoisture);
  const [sensorReadings, setSensorReadings] = useState({
    soilMoisture: 58,
    temperature: 32,
    humidity: 68
  });
  const [pumpStatus, setPumpStatus] = useState(false);
  const [pumpSeconds, setPumpSeconds] = useState(0);
  const [espStatus] = useState({
    cpu: 12,
    ram: 34,
    flash: 28,
    lastInference: '2s ago',
    model: 'KNN v1.2',
    temperature: 42,
    uptime: '14d 8h'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorReadings(prev => ({
        soilMoisture: Math.max(30, Math.min(80, +(prev.soilMoisture + (Math.random() - 0.5) * 3).toFixed(1))),
        temperature: Math.max(25, Math.min(40, +(prev.temperature + (Math.random() - 0.5) * 0.4).toFixed(1))),
        humidity: Math.max(50, Math.min(85, +(prev.humidity + (Math.random() - 0.5) * 1.5).toFixed(1))),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!pumpStatus) {
      setPumpSeconds(0);
      return;
    }
    const t = setInterval(() => setPumpSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [pumpStatus]);

  const fmtTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
          Real-Time Monitoring
        </Typography>
        <Typography variant="body2" sx={{ color: '#475569' }}>
          Live sensor data, edge device status & ML predictions
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* LEFT COLUMN */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Soil Moisture Chart */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5 }}>
              Soil Moisture Trend
            </Typography>
            <Typography variant="caption" sx={{ color: '#475569', display: 'block', mb: 2 }}>
              Last 24 hours
            </Typography>
            <Box sx={{ height: 300, width: '100%', minHeight: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moistureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#475569', fontSize: 11 }} />
                  <Tooltip />
                  <ReferenceLine y={50} stroke="#f97316" strokeDasharray="4 4" />
                  <Area type="monotone" dataKey="moisture" stroke="#1b8c2e" strokeWidth={2} fill="rgba(27,140,46,0.08)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>

          {/* ML Forecast Panel */}
          <Paper sx={{ p: 3, border: '1px solid rgba(27,140,46,0.12)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: 'rgba(27,140,46,0.1)', width: 48, height: 48 }}>
                <AutoGraphIcon sx={{ color: '#1b8c2e' }} />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>ML Water Usage Forecast</Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>Predicted daily water usage for the next 30 days</Typography>
              </Box>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(27,140,46,0.04)' }}>
                  <Typography variant="caption" sx={{ color: '#475569' }}>Predicted Total (Next 30 Days)</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1b8c2e' }}>{Math.round(totalPredicted)} L</Typography>
                  <Typography variant="caption" sx={{ color: '#475569' }}>~{Math.round(totalPredicted / 30)} L/day</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(59,130,246,0.04)' }}>
                  <Typography variant="caption" sx={{ color: '#475569' }}>Last Month Actual</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#3b82f6' }}>{lastMonthTotal} L</Typography>
                  <Typography variant="caption" sx={{ color: '#475569' }}>~{Math.round(lastMonthTotal / 30)} L/day</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: savingsDelta >= 0 ? 'rgba(27,140,46,0.04)' : 'rgba(239,68,68,0.04)' }}>
                  <Typography variant="caption" sx={{ color: '#475569' }}>Projected Change</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: savingsDelta >= 0 ? '#1b8c2e' : '#ef4444' }}>
                      {savingsDelta >= 0 ? '-' : '+'}{Math.abs(savingsDelta)}%
                    </Typography>
                    {savingsDelta >= 0 ? <TrendingDownIcon sx={{ color: '#1b8c2e' }} /> : <TrendingUpIcon sx={{ color: '#ef4444' }} />}
                  </Box>
                  <Typography variant="caption" sx={{ color: '#475569' }}>{savingsDelta >= 0 ? 'Less' : 'More'} usage</Typography>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ height: 300, width: '100%', minHeight: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mlData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10 }} interval={4} />
                  <YAxis tick={{ fill: '#475569', fontSize: 11 }} tickFormatter={(v) => `${v}L`} />
                  <Tooltip />
                  <Area type="monotone" dataKey="predicted" stroke="#1b8c2e" strokeWidth={2} fill="rgba(27,140,46,0.08)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, p: 1.5, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <InfoOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Predictions generated by on-device KNN model using last 90 days of data.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Current Readings */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>Current Readings</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <OpacityIcon sx={{ color: '#1b8c2e' }} />
                <Typography variant="body2" sx={{ color: '#475569' }}>Soil Moisture</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1b8c2e' }}>{sensorReadings.soilMoisture}%</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThermostatIcon sx={{ color: '#ef4444' }} />
                <Typography variant="body2" sx={{ color: '#475569' }}>Temperature</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ef4444' }}>{sensorReadings.temperature}°C</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <OpacityIcon sx={{ color: '#3b82f6' }} />
                <Typography variant="body2" sx={{ color: '#475569' }}>Humidity</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#3b82f6' }}>{sensorReadings.humidity}%</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: '#475569' }}>Last reading</Typography>
              <Chip label="Just now" size="small" sx={{ bgcolor: 'rgba(27,140,46,0.08)', color: '#1b8c2e' }} />
            </Box>
          </Paper>

          {/* ESP32 Edge Device */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ bgcolor: 'rgba(27,140,46,0.08)' }}>
                  <DeveloperBoardIcon sx={{ color: '#1b8c2e' }} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>ESP32 Edge Device</Typography>
                  <Typography variant="caption" sx={{ color: '#475569' }}>On-device ML inference</Typography>
                </Box>
              </Box>
              <Chip icon={<CheckCircleIcon />} label="Online" size="small" sx={{ bgcolor: 'rgba(27,140,46,0.08)', color: '#1b8c2e' }} />
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}>
                <Typography variant="caption" sx={{ color: '#475569' }}>CPU: {espStatus.cpu}%</Typography>
                <LinearProgress variant="determinate" value={espStatus.cpu} sx={{ mt: 0.5, height: 4 }} />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Typography variant="caption" sx={{ color: '#475569' }}>RAM: {espStatus.ram}%</Typography>
                <LinearProgress variant="determinate" value={espStatus.ram} sx={{ mt: 0.5, height: 4 }} />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Typography variant="caption" sx={{ color: '#475569' }}>Flash: {espStatus.flash}%</Typography>
                <LinearProgress variant="determinate" value={espStatus.flash} sx={{ mt: 0.5, height: 4 }} />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', flex: 1 }}>
                <Typography variant="caption" sx={{ color: '#475569' }}>Chip Temp</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#f97316' }}>{espStatus.temperature}°C</Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', flex: 1 }}>
                <Typography variant="caption" sx={{ color: '#475569' }}>Uptime</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1b8c2e' }}>{espStatus.uptime}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ mt: 2, p: 1.5, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <Typography variant="caption" sx={{ color: '#475569' }}>
                Last inference: <strong style={{ color: '#1b8c2e' }}>{espStatus.lastInference}</strong> · Model: <strong style={{ color: '#f97316' }}>{espStatus.model}</strong>
              </Typography>
            </Box>
          </Paper>

          {/* Manual Pump Control */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar sx={{ bgcolor: 'rgba(27,140,46,0.08)' }}>
                <WaterDropIcon sx={{ color: '#1b8c2e' }} />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>Manual Pump Control</Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>Override automatic irrigation</Typography>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button 
                fullWidth 
                variant="contained" 
                startIcon={<PlayArrowIcon />} 
                onClick={() => setPumpStatus(true)} 
                disabled={pumpStatus}
              >
                Start Pump
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<StopIcon />} 
                onClick={() => setPumpStatus(false)} 
                disabled={!pumpStatus}
                sx={{ borderColor: '#ef4444', color: '#ef4444' }}
              >
                Stop Pump
              </Button>
            </Box>
            
            {pumpStatus ? (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(27,140,46,0.06)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                    <Typography variant="body2" sx={{ color: '#1b8c2e', fontWeight: 600 }}>Pump Running</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: '#1b8c2e', fontWeight: 700 }}>{fmtTime(pumpSeconds)}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#475569', mt: 1, display: 'block' }}>
                  Flow rate: 2.5 L/min · Est. used: {(pumpSeconds / 60 * 2.5).toFixed(1)} L
                </Typography>
              </Box>
            ) : (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Pump is idle · Last run: 10:30 AM (6 min, 15 L used)
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LiveFeed;
