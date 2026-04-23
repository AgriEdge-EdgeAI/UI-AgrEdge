import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Typography, Box, Grid, Switch, Button,
  FormControl, InputLabel, Select, MenuItem, Divider,
  Slider, Chip, Alert, Snackbar, Avatar, Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RefreshIcon from '@mui/icons-material/Refresh';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const PRIMARY_GREEN = '#0d6b3a';
const PRIMARY_GREEN_LIGHT = '#1a8549';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Watering Schedule State
  const [wateringStartHour, setWateringStartHour] = useState('08:00');
  const [wateringEndHour, setWateringEndHour] = useState('18:00');
  const [activeDays, setActiveDays] = useState({
    mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false
  });

  // Reading Frequency State
  const [readingFrequency, setReadingFrequency] = useState('5');
  
  // Additional Settings
  const [autoMode, setAutoMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [lowMoistureAlert, setLowMoistureAlert] = useState(30);

  // Load saved settings from localStorage
  useEffect(() => {
    const savedStart = localStorage.getItem('wateringStartHour');
    const savedEnd = localStorage.getItem('wateringEndHour');
    const savedFrequency = localStorage.getItem('readingFrequency');
    const savedAutoMode = localStorage.getItem('autoMode');
    const savedNotifications = localStorage.getItem('notificationsEnabled');
    const savedLowMoisture = localStorage.getItem('lowMoistureAlert');
    const savedDays = localStorage.getItem('activeDays');

    if (savedStart) setWateringStartHour(savedStart);
    if (savedEnd) setWateringEndHour(savedEnd);
    if (savedFrequency) setReadingFrequency(savedFrequency);
    if (savedAutoMode) setAutoMode(savedAutoMode === 'true');
    if (savedNotifications) setNotificationsEnabled(savedNotifications === 'true');
    if (savedLowMoisture) setLowMoistureAlert(parseInt(savedLowMoisture));
    if (savedDays) setActiveDays(JSON.parse(savedDays));
  }, []);

  const handleDayToggle = (day: string) => {
    setActiveDays({ ...activeDays, [day]: !activeDays[day as keyof typeof activeDays] });
  };

  const handleSaveSettings = () => {
    localStorage.setItem('wateringStartHour', wateringStartHour);
    localStorage.setItem('wateringEndHour', wateringEndHour);
    localStorage.setItem('readingFrequency', readingFrequency);
    localStorage.setItem('autoMode', String(autoMode));
    localStorage.setItem('notificationsEnabled', String(notificationsEnabled));
    localStorage.setItem('lowMoistureAlert', String(lowMoistureAlert));
    localStorage.setItem('activeDays', JSON.stringify(activeDays));
    
    setSnackbar({ open: true, message: 'Settings saved successfully!' });
  };

  const handleResetDefaults = () => {
    setWateringStartHour('08:00');
    setWateringEndHour('18:00');
    setReadingFrequency('5');
    setAutoMode(true);
    setNotificationsEnabled(true);
    setLowMoistureAlert(30);
    setActiveDays({ mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false });
    setSnackbar({ open: true, message: 'Settings reset to defaults!' });
  };

  const daysList = [
    { key: 'mon', label: 'M', full: 'Monday' },
    { key: 'tue', label: 'T', full: 'Tuesday' },
    { key: 'wed', label: 'W', full: 'Wednesday' },
    { key: 'thu', label: 'T', full: 'Thursday' },
    { key: 'fri', label: 'F', full: 'Friday' },
    { key: 'sat', label: 'S', full: 'Saturday' },
    { key: 'sun', label: 'S', full: 'Sunday' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: '#0f172a', mb: 1 }}>
          ⚙️ Settings
        </Typography>
        <Typography variant="body2" sx={{ color: '#475569' }}>
          Configure your irrigation system preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 7 }}>
          {/* Watering Schedule Card */}
          <Paper sx={{ p: 3, mb: 3, border: '1px solid #e2e8f0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar sx={{ bgcolor: `rgba(13,107,58,0.1)`, width: 40, height: 40 }}>
                <ScheduleIcon sx={{ color: PRIMARY_GREEN }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Watering Schedule
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ color: '#0f172a', mb: 1, fontWeight: 600 }}>
                  Start Time
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Select time</InputLabel>
                  <Select
                    value={wateringStartHour}
                    onChange={(e) => setWateringStartHour(e.target.value)}
                    label="Select time"
                  >
                    <MenuItem value="06:00">06:00 AM (Early Morning)</MenuItem>
                    <MenuItem value="07:00">07:00 AM</MenuItem>
                    <MenuItem value="08:00">08:00 AM</MenuItem>
                    <MenuItem value="09:00">09:00 AM</MenuItem>
                    <MenuItem value="10:00">10:00 AM</MenuItem>
                    <MenuItem value="16:00">04:00 PM</MenuItem>
                    <MenuItem value="17:00">05:00 PM</MenuItem>
                    <MenuItem value="18:00">06:00 PM (Evening)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ color: '#0f172a', mb: 1, fontWeight: 600 }}>
                  End Time
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Select time</InputLabel>
                  <Select
                    value={wateringEndHour}
                    onChange={(e) => setWateringEndHour(e.target.value)}
                    label="Select time"
                  >
                    <MenuItem value="16:00">04:00 PM</MenuItem>
                    <MenuItem value="17:00">05:00 PM</MenuItem>
                    <MenuItem value="18:00">06:00 PM</MenuItem>
                    <MenuItem value="19:00">07:00 PM</MenuItem>
                    <MenuItem value="20:00">08:00 PM</MenuItem>
                    <MenuItem value="21:00">09:00 PM</MenuItem>
                    <MenuItem value="22:00">10:00 PM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={12}>
                <Typography variant="subtitle2" sx={{ color: '#0f172a', mb: 1.5, fontWeight: 600 }}>
                  Active Days
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {daysList.map((day) => (
                    <Tooltip title={day.full} key={day.key}>
                      <Chip
                        label={day.label}
                        onClick={() => handleDayToggle(day.key)}
                        sx={{
                          width: 40,
                          fontWeight: 600,
                          bgcolor: activeDays[day.key as keyof typeof activeDays] ? PRIMARY_GREEN : '#f1f5f9',
                          color: activeDays[day.key as keyof typeof activeDays] ? '#fff' : '#64748b',
                          cursor: 'pointer',
                          '&:hover': { 
                            bgcolor: activeDays[day.key as keyof typeof activeDays] ? PRIMARY_GREEN_LIGHT : '#e2e8f0' 
                          }
                        }}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Sensor Settings Card */}
          <Paper sx={{ p: 3, mb: 3, border: '1px solid #e2e8f0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar sx={{ bgcolor: `rgba(13,107,58,0.1)`, width: 40, height: 40 }}>
                <RefreshIcon sx={{ color: PRIMARY_GREEN }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Sensor Settings
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ color: '#0f172a', mb: 1, fontWeight: 600 }}>
                  Readings Frequency
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Update interval</InputLabel>
                  <Select
                    value={readingFrequency}
                    onChange={(e) => setReadingFrequency(e.target.value)}
                    label="Update interval"
                  >
                    <MenuItem value="1">Every 1 second (Real-time)</MenuItem>
                    <MenuItem value="5">Every 5 seconds (Default)</MenuItem>
                    <MenuItem value="10">Every 10 seconds</MenuItem>
                    <MenuItem value="30">Every 30 seconds</MenuItem>
                    <MenuItem value="60">Every 1 minute</MenuItem>
                    <MenuItem value="300">Every 5 minutes</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ color: '#0f172a', mb: 1, fontWeight: 600 }}>
                  Low Moisture Alert (%)
                </Typography>
                <Box sx={{ px: 1 }}>
                  <Slider
                    value={lowMoistureAlert}
                    onChange={(_, val) => setLowMoistureAlert(val as number)}
                    min={10}
                    max={50}
                    step={5}
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 10, label: '10%' },
                      { value: 20, label: '20%' },
                      { value: 30, label: '30%' },
                      { value: 40, label: '40%' },
                      { value: 50, label: '50%' },
                    ]}
                    sx={{ color: PRIMARY_GREEN, mt: 2 }}
                  />
                  <Typography variant="caption" sx={{ color: '#64748b', mt: 1, display: 'block' }}>
                    Alert when moisture drops below {lowMoistureAlert}%
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 5 }}>
          {/* Preferences Card */}
          <Paper sx={{ p: 3, mb: 3, border: '1px solid #e2e8f0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar sx={{ bgcolor: `rgba(13,107,58,0.1)`, width: 40, height: 40 }}>
                <AgricultureIcon sx={{ color: PRIMARY_GREEN }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Preferences
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#0f172a' }}>
                  Automatic Mode
                </Typography>
                <Switch
                  checked={autoMode}
                  onChange={(e) => setAutoMode(e.target.checked)}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: PRIMARY_GREEN } }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                {autoMode ? 'System waters automatically based on soil conditions' : 'Manual control only'}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#0f172a' }}>
                  Push Notifications
                </Typography>
                <Switch
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: PRIMARY_GREEN } }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Receive alerts about moisture levels and irrigation events
              </Typography>
            </Box>
          </Paper>

          {/* System Info Card */}
          <Paper sx={{ p: 3, mb: 3, border: `1px solid ${PRIMARY_GREEN}20`, bgcolor: `rgba(13,107,58,0.02)` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <WaterDropIcon sx={{ color: PRIMARY_GREEN, fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                System Summary
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>Device</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: PRIMARY_GREEN }}>ESP32-S3</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>Firmware</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>v2.1.0</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>ML Model</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>KNN v1.2</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>Last Sync</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>{new Date().toLocaleTimeString()}</Typography>
            </Box>
          </Paper>

          {/* Action Buttons */}
          <Paper sx={{ p: 3, border: '1px solid #e2e8f0' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveSettings}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${PRIMARY_GREEN}, ${PRIMARY_GREEN_LIGHT})`,
                  '&:hover': { transform: 'translateY(-2px)' }
              }}>
                Save Changes
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={handleResetDefaults}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  borderColor: '#e2e8f0',
                  color: '#64748b',
                  '&:hover': { borderColor: PRIMARY_GREEN, color: PRIMARY_GREEN, transform: 'translateY(-2px)' }
              }}>
                Reset
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ bgcolor: PRIMARY_GREEN }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;
