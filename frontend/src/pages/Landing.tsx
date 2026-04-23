import React from 'react';
import { Box, Typography, Button, Grid, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SpeedIcon from '@mui/icons-material/Speed';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const PRIMARY_GREEN = '#0d6b3a';
const PRIMARY_GREEN_LIGHT = '#1a8549';

const STATS = [
  { value: '50%', label: 'Water Savings', sub: 'Average reduction vs manual irrigation', icon: <WaterDropIcon sx={{ fontSize: 42, color: PRIMARY_GREEN }} />, color: PRIMARY_GREEN },
  { value: '94%', label: 'ML Accuracy', sub: 'Edge AI prediction precision', icon: <TrendingUpIcon sx={{ fontSize: 42, color: '#3b82f6' }} />, color: '#3b82f6' },
  { value: '24/7', label: 'Monitoring', sub: 'Continuous sensor data collection', icon: <ScheduleIcon sx={{ fontSize: 42, color: '#f97316' }} />, color: '#f97316' },
  { value: '<2s', label: 'Response Time', sub: 'From detection to pump activation', icon: <FlashOnIcon sx={{ fontSize: 42, color: '#8b5cf6' }} />, color: '#8b5cf6' },
];

const FEATURES = [
  { icon: <AgricultureIcon sx={{ fontSize: 44, color: PRIMARY_GREEN }} />, title: 'Smart Irrigation', desc: 'AI-powered watering decisions based on real-time soil conditions and weather forecasts.', color: PRIMARY_GREEN },
  { icon: <SpeedIcon sx={{ fontSize: 44, color: '#3b82f6' }} />, title: 'Edge AI Processing', desc: 'On-device inference on ESP32. No cloud dependency.', color: '#3b82f6' },
  { icon: <CloudUploadIcon sx={{ fontSize: 44, color: '#f97316' }} />, title: 'Cloud Analytics', desc: 'Historical data tracking and predictive insights.', color: '#f97316' },
  { icon: <WaterDropIcon sx={{ fontSize: 44, color: '#8b5cf6' }} />, title: 'Water Conservation', desc: 'Save up to 50% water through intelligent scheduling.', color: '#8b5cf6' },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 10 }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 4, px: 3, py: 1, borderRadius: '99px', border: `1px solid rgba(13,107,58,0.3)`, bgcolor: `rgba(13,107,58,0.08)` }}>
          <span className="pulse-dot" style={{ width: 8, height: 8 }} />
          <Typography variant="overline" sx={{ color: PRIMARY_GREEN, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.75rem' }}>EDGE AI IRRIGATION SYSTEM</Typography>
        </Box>

        <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, lineHeight: 1.2, mb: 3, letterSpacing: '-0.03em', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#0f172a' }}>
          Grow Smarter,<br />
          <Box component="span" className="gradient-text">Waste Nothing</Box>
        </Typography>

        <Typography variant="h6" sx={{ color: '#475569', maxWidth: 650, mx: 'auto', mb: 5, fontSize: '1.1rem', fontWeight: 400 }}>
          Real-time soil monitoring with machine learning. AgriEdge automates irrigation decisions at the edge — saving water, time, and crops.
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" onClick={() => navigate('/register')} endIcon={<ArrowForwardIcon />} sx={{ px: 5, py: 1.5, borderRadius: 60, background: `linear-gradient(135deg, ${PRIMARY_GREEN}, ${PRIMARY_GREEN_LIGHT})` }}>Start for Free</Button>
          <Button variant="outlined" size="large" onClick={() => navigate('/login')} sx={{ px: 5, py: 1.5, borderRadius: 60, borderColor: PRIMARY_GREEN, color: PRIMARY_GREEN }}>Sign In</Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 10 }}>
        {STATS.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Paper sx={{ p: 3, textAlign: 'center', height: '100%', minHeight: 200 }}>
              <Box sx={{ width: 70, height: 70, mx: 'auto', mb: 2, borderRadius: '20px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.icon}</Box>
              <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 800, color: stat.color, mb: 1 }}>{stat.value}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5 }}>{stat.label}</Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem' }}>{stat.sub}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 800, color: '#0f172a' }}>Smart Features</Typography>
      
      <Grid container spacing={3}>
        {FEATURES.map((feature, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Paper sx={{ p: 3, textAlign: 'center', height: '100%', minHeight: 260 }}>
              <Box sx={{ width: 80, height: 80, mx: 'auto', mb: 2, borderRadius: '24px', background: `${feature.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{feature.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 1.5 }}>{feature.title}</Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>{feature.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Landing;
