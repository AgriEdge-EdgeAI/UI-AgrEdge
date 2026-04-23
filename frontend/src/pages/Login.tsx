import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box, Alert, InputAdornment, IconButton, Container, Avatar, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', email.split('@')[0]);
        localStorage.setItem('userEmail', email);
        navigate('/dashboard');
      } else {
        setError('Please enter both email and password');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 5, 
          width: '100%', 
          borderRadius: 4,
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          bgcolor: '#ffffff',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: '#1b8c2e', width: 56, height: 56 }}>
            <AgricultureIcon sx={{ fontSize: 28, color: '#fff' }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: '#0f172a' }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', mt: 1 }}>
            Sign in to monitor your farm
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            placeholder="farmer@agriedge.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            placeholder="Enter your password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
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
              background: 'linear-gradient(135deg, #1b8c2e, #2eae40)',
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(27,140,46,0.3)',
              color: '#ffffff',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(27,140,46,0.4)',
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#475569' }}>
              Don't have an account?{' '}
              <Link 
                component="button"
                underline="hover"
                sx={{ color: '#1b8c2e', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => navigate('/register')}
              >
                Create Account
              </Link>
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Demo: Use any email and password
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
