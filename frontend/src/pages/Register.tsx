import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box, Alert, Grid, InputAdornment, IconButton, Container, Avatar, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const PRIMARY_GREEN = '#0d6b3a';
const PRIMARY_GREEN_LIGHT = '#1a8549';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    fullName: '', farmName: '', location: '', email: '', phoneNumber: '', password: '', confirmPassword: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { 
      setError('Passwords do not match'); 
      return; 
    }
    if (formData.password.length < 6) { 
      setError('Password must be at least 6 characters'); 
      return; 
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', formData.fullName.split(' ')[0]);
      localStorage.setItem('farmName', formData.farmName);
      localStorage.setItem('location', formData.location);
      localStorage.setItem('userEmail', formData.email);
      navigate('/dashboard');
      setLoading(false);
    }, 800);
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          width: '100%', 
          borderRadius: 4,
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          bgcolor: '#ffffff',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: PRIMARY_GREEN, width: 56, height: 56 }}>
            <AgricultureIcon sx={{ fontSize: 28, color: '#fff' }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: '#0f172a' }}>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', mt: 1 }}>
            Join AgriEdge and start saving water today
          </Typography>
        </Box>
        
        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField 
                fullWidth 
                label="Full Name" 
                name="fullName" 
                onChange={handleChange} 
                required 
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: '#94a3b8' }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField 
                fullWidth 
                label="Farm Name" 
                name="farmName" 
                onChange={handleChange} 
                required 
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AgricultureIcon sx={{ color: '#94a3b8' }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={12}>
              <TextField 
                fullWidth 
                label="Location" 
                name="location" 
                onChange={handleChange} 
                required 
                placeholder="e.g., Colombo, Sri Lanka"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LocationOnOutlinedIcon sx={{ color: '#94a3b8' }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField 
                fullWidth 
                label="Email Address" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange} 
                required 
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ color: '#94a3b8' }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField 
                fullWidth 
                label="Phone Number" 
                name="phoneNumber" 
                onChange={handleChange} 
                required 
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon sx={{ color: '#94a3b8' }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField 
                fullWidth 
                label="Password" 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                onChange={handleChange} 
                required 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField 
                fullWidth 
                label="Confirm Password" 
                name="confirmPassword" 
                type={showPassword ? 'text' : 'password'} 
                onChange={handleChange} 
                required 
              />
            </Grid>
          </Grid>
          
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            size="large" 
            disabled={loading} 
            sx={{ 
              mt: 4, 
              py: 1.5, 
              borderRadius: 2,
              background: `linear-gradient(135deg, ${PRIMARY_GREEN}, ${PRIMARY_GREEN_LIGHT})`,
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: `0 4px 15px rgba(13,107,58,0.3)`,
              color: '#ffffff',
              '&:hover': { 
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 20px rgba(13,107,58,0.4)`,
              }
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#475569' }}>
              Already have an account?{' '}
              <Link 
                component="button"
                underline="hover"
                sx={{ color: PRIMARY_GREEN, fontWeight: 600, cursor: 'pointer' }}
                onClick={() => navigate('/login')}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
