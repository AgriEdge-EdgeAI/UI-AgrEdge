import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, Typography, Box, Button, LinearProgress,
  Chip, Divider, Avatar, Container, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
  Bar, ComposedChart
} from 'recharts';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SummarizeIcon from '@mui/icons-material/Summarize';

const PRIMARY_GREEN = '#0d6b3a';
const PRIMARY_GREEN_LIGHT = '#1a8549';

// Historical data (last 4 weeks - actual)
const historicalWeeklyData = [
  { week: 'Week 1', actual: 2750 },
  { week: 'Week 2', actual: 3050 },
  { week: 'Week 3', actual: 2950 },
  { week: 'Week 4', actual: 3100 },
];

// Forecast data (next 4 weeks - predicted)
const forecastWeeklyData = [
  { week: 'Week 5', predicted: 2980 },
  { week: 'Week 6', predicted: 3050 },
  { week: 'Week 7', predicted: 3120 },
  { week: 'Week 8', predicted: 3080 },
];

// Combined for chart display - weekly
const weeklyChartData = [
  { week: 'Week 1', actual: 2750, predicted: null },
  { week: 'Week 2', actual: 3050, predicted: null },
  { week: 'Week 3', actual: 2950, predicted: null },
  { week: 'Week 4', actual: 3100, predicted: null },
  { week: 'Week 5', actual: null, predicted: 2980 },
  { week: 'Week 6', actual: null, predicted: 3050 },
  { week: 'Week 7', actual: null, predicted: 3120 },
  { week: 'Week 8', actual: null, predicted: 3080 },
];

// Monthly data
const monthlyChartData = [
  { month: 'Jan', actual: 11200, predicted: null },
  { month: 'Feb', actual: 10800, predicted: null },
  { month: 'Mar', actual: 11500, predicted: null },
  { month: 'Apr', actual: 11800, predicted: null },
  { month: 'May', actual: null, predicted: 11600 },
  { month: 'Jun', actual: null, predicted: 11400 },
  { month: 'Jul', actual: null, predicted: 11900 },
  { month: 'Aug', actual: null, predicted: 12100 },
];

// Calculations for summary
const totalActual4Weeks = historicalWeeklyData.reduce((sum, d) => sum + d.actual, 0);
const totalPredicted4Weeks = forecastWeeklyData.reduce((sum, d) => sum + d.predicted, 0);
const avgActualWeekly = Math.round(totalActual4Weeks / 4);
const avgPredictedWeekly = Math.round(totalPredicted4Weeks / 4);
const projectedChangePercent = Math.round(((totalPredicted4Weeks - totalActual4Weeks) / totalActual4Weeks) * 100);

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

const LiveFeed: React.FC = () => {
  const [moistureData] = useState(generate24hMoisture);
  const [view, setView] = useState<'weekly' | 'monthly' | 'summary'>('weekly');
  const [sensorReadings, setSensorReadings] = useState({ soilMoisture: 58, temperature: 32, humidity: 68 });
  const [pumpStatus, setPumpStatus] = useState(false);
  const [pumpSeconds, setPumpSeconds] = useState(0);
  const [espStatus] = useState({ cpu: 12, ram: 34, flash: 28, lastInference: '2s ago', model: 'KNN v1.2', temperature: 42, uptime: '14d 8h' });

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
    if (!pumpStatus) { setPumpSeconds(0); return; }
    const t = setInterval(() => setPumpSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [pumpStatus]);

  const fmtTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const chartTitle = view === 'weekly' ? '4 Week Average Water Level Prediction' : 
                     view === 'monthly' ? 'Monthly Water Level Prediction' : 'Water Usage Summary';
  const yAxisLabel = view === 'weekly' ? 'Water Usage (Liters per Week)' : 'Water Usage (Liters per Month)';

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Real-Time Monitoring</Typography>
        <Typography variant="body2" sx={{ color: '#475569' }}>Live sensor data, edge device status & ML predictions</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Soil Moisture Chart */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5 }}>Soil Moisture Trend</Typography>
            <Typography variant="caption" sx={{ color: '#475569', display: 'block', mb: 2 }}>Last 24 hours</Typography>
            <Box sx={{ height: 300, width: '100%', minHeight: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moistureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#475569', fontSize: 11 }} label={{ value: 'Moisture (%)', angle: -90, position: 'insideLeft', fill: '#475569' }} />
                  <Tooltip />
                  <ReferenceLine y={50} stroke="#f97316" strokeDasharray="4 4" />
                  <Area type="monotone" dataKey="moisture" stroke={PRIMARY_GREEN} strokeWidth={2} fill="rgba(13,107,58,0.08)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>

          {/* ML Water Usage Forecast Panel */}
          <Paper sx={{ p: 3, border: '1px solid rgba(13,107,58,0.12)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(13,107,58,0.1)', width: 48, height: 48 }}><AutoGraphIcon sx={{ color: PRIMARY_GREEN }} /></Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>{chartTitle}</Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Last 4 weeks actual + Next 4 weeks forecast</Typography>
                </Box>
              </Box>
              
              <ToggleButtonGroup value={view} exclusive onChange={(_, val) => val && setView(val)} size="small" sx={{ bgcolor: '#f8fafc' }}>
                <ToggleButton value="weekly"><CalendarViewWeekIcon sx={{ fontSize: 16, mr: 0.5 }} />Weekly</ToggleButton>
                <ToggleButton value="monthly"><CalendarMonthIcon sx={{ fontSize: 16, mr: 0.5 }} />Monthly</ToggleButton>
                <ToggleButton value="summary"><SummarizeIcon sx={{ fontSize: 16, mr: 0.5 }} />Summary</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {view !== 'summary' ? (
              <>
                <Box sx={{ height: 320, width: '100%', minHeight: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {view === 'weekly' ? (
                      <ComposedChart data={weeklyChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="week" tick={{ fill: '#475569', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#475569', fontSize: 11 }} label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#475569' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="actual" name="Actual Usage" fill="#f97316" barSize={40} radius={[6, 6, 0, 0]} />
                        <Bar dataKey="predicted" name="ML Forecast" fill={PRIMARY_GREEN} barSize={40} radius={[6, 6, 0, 0]} />
                      </ComposedChart>
                    ) : (
                      <ComposedChart data={monthlyChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#475569', fontSize: 11 }} label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#475569' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="actual" name="Actual Usage" fill="#f97316" barSize={40} radius={[6, 6, 0, 0]} />
                        <Bar dataKey="predicted" name="ML Forecast" fill={PRIMARY_GREEN} barSize={40} radius={[6, 6, 0, 0]} />
                      </ComposedChart>
                    )}
                  </ResponsiveContainer>
                </Box>
                
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 16, height: 16, bgcolor: '#f97316', borderRadius: 1 }} /><Typography variant="caption" sx={{ color: '#475569' }}>Historical (Weeks 1-4 / Months Jan-Apr)</Typography></Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 16, height: 16, bgcolor: PRIMARY_GREEN, borderRadius: 1, opacity: 0.7 }} /><Typography variant="caption" sx={{ color: '#475569' }}>Forecast (Weeks 5-8 / Months May-Aug)</Typography></Box>
                </Box>
              </>
            ) : (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'rgba(13,107,58,0.05)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>Last 4 Weeks (Actual)</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: PRIMARY_GREEN }}>{totalActual4Weeks.toLocaleString()} L</Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>~{avgActualWeekly} L/week average</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'rgba(249,115,22,0.05)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>Next 4 Weeks (Forecast)</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#f97316' }}>{totalPredicted4Weeks.toLocaleString()} L</Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>~{avgPredictedWeekly} L/week expected</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ p: 3, borderRadius: 2, bgcolor: projectedChangePercent >= 0 ? 'rgba(13,107,58,0.05)' : 'rgba(239,68,68,0.05)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>Projected Change</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: projectedChangePercent >= 0 ? PRIMARY_GREEN : '#ef4444' }}>
                        {projectedChangePercent >= 0 ? '+' : ''}{projectedChangePercent}%
                      </Typography>
                      {projectedChangePercent >= 0 ? <TrendingUpIcon sx={{ color: PRIMARY_GREEN }} /> : <TrendingDownIcon sx={{ color: '#ef4444' }} />}
                    </Box>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      {projectedChangePercent >= 0 ? 'Higher' : 'Lower'} usage than previous 4-week period
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, p: 1.5, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <InfoOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
              <Typography variant="caption" sx={{ color: '#64748b' }}>Forecast generated by KNN v1.2 model using last 90 days of sensor data. Confidence interval: 92%</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>Current Readings</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><OpacityIcon sx={{ color: PRIMARY_GREEN }} /><Typography variant="body2">Soil Moisture</Typography></Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: PRIMARY_GREEN }}>{sensorReadings.soilMoisture}%</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><ThermostatIcon sx={{ color: '#ef4444' }} /><Typography variant="body2">Temperature</Typography></Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ef4444' }}>{sensorReadings.temperature}°C</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><OpacityIcon sx={{ color: '#3b82f6' }} /><Typography variant="body2">Humidity</Typography></Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#3b82f6' }}>{sensorReadings.humidity}%</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: '#475569' }}>Last reading</Typography>
              <Chip label="Just now" size="small" sx={{ bgcolor: 'rgba(13,107,58,0.08)', color: PRIMARY_GREEN }} />
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ bgcolor: 'rgba(13,107,58,0.08)' }}><DeveloperBoardIcon sx={{ color: PRIMARY_GREEN }} /></Avatar>
                <Box><Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>ESP32 Edge Device</Typography><Typography variant="caption">On-device ML inference</Typography></Box>
              </Box>
              <Chip icon={<CheckCircleIcon />} label="Online" size="small" sx={{ bgcolor: 'rgba(13,107,58,0.08)', color: PRIMARY_GREEN }} />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}><Typography variant="caption">CPU: {espStatus.cpu}%</Typography><LinearProgress variant="determinate" value={espStatus.cpu} sx={{ mt: 0.5 }} /></Grid>
              <Grid size={{ xs: 4 }}><Typography variant="caption">RAM: {espStatus.ram}%</Typography><LinearProgress variant="determinate" value={espStatus.ram} sx={{ mt: 0.5 }} /></Grid>
              <Grid size={{ xs: 4 }}><Typography variant="caption">Flash: {espStatus.flash}%</Typography><LinearProgress variant="determinate" value={espStatus.flash} sx={{ mt: 0.5 }} /></Grid>
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', flex: 1 }}><Typography variant="caption">Chip Temp</Typography><Typography variant="body2" sx={{ fontWeight: 600, color: '#f97316' }}>{espStatus.temperature}°C</Typography></Box>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', flex: 1 }}><Typography variant="caption">Uptime</Typography><Typography variant="body2" sx={{ fontWeight: 600, color: PRIMARY_GREEN }}>{espStatus.uptime}</Typography></Box>
            </Box>
            <Box sx={{ mt: 2, p: 1.5, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <Typography variant="caption">Last inference: <strong style={{ color: PRIMARY_GREEN }}>{espStatus.lastInference}</strong> · Model: <strong style={{ color: '#f97316' }}>{espStatus.model}</strong></Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar sx={{ bgcolor: 'rgba(13,107,58,0.08)' }}><WaterDropIcon sx={{ color: PRIMARY_GREEN }} /></Avatar>
              <Box><Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>Manual Pump Control</Typography><Typography variant="caption">Override automatic irrigation</Typography></Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button fullWidth variant="contained" startIcon={<PlayArrowIcon />} onClick={() => setPumpStatus(true)} disabled={pumpStatus} sx={{ background: `linear-gradient(135deg, ${PRIMARY_GREEN}, ${PRIMARY_GREEN_LIGHT})` }}>Start Pump</Button>
              <Button fullWidth variant="outlined" startIcon={<StopIcon />} onClick={() => setPumpStatus(false)} disabled={!pumpStatus} sx={{ borderColor: '#ef4444', color: '#ef4444' }}>Stop Pump</Button>
            </Box>
            {pumpStatus ? (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(13,107,58,0.06)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><span className="pulse-dot" style={{ width: 6, height: 6 }} /><Typography variant="body2" sx={{ color: PRIMARY_GREEN, fontWeight: 600 }}>Pump Running</Typography></Box><Typography variant="h6" sx={{ color: PRIMARY_GREEN, fontWeight: 700 }}>{fmtTime(pumpSeconds)}</Typography></Box>
                <Typography variant="caption">Flow rate: 2.5 L/min · Est. used: {(pumpSeconds / 60 * 2.5).toFixed(1)} L</Typography>
              </Box>
            ) : (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}><Typography variant="caption">Pump is idle · Last run: 10:30 AM (6 min, 15 L used)</Typography></Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LiveFeed;
