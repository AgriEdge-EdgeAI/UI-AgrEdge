import { createTheme } from '@mui/material';

// ============================================
// EXACT SHADE FROM YOUR IMAGE - Rich Emerald Green
// ============================================
const PRIMARY_GREEN = '#0d6b3a';
const PRIMARY_GREEN_LIGHT = '#1a8549';
const PRIMARY_GREEN_DARK = '#094d29';
// ============================================

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY_GREEN,
      light: PRIMARY_GREEN_LIGHT,
      dark: PRIMARY_GREEN_DARK,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f97316',
      light: '#ff9f4a',
      dark: '#ea580c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    success: { main: PRIMARY_GREEN, light: PRIMARY_GREEN_LIGHT, dark: PRIMARY_GREEN_DARK },
    warning: { main: '#f97316', light: '#ff9f4a', dark: '#ea580c' },
    error: { main: '#ef4444', light: '#f87171', dark: '#dc2626' },
    info: { main: '#3b82f6', light: '#60a5fa', dark: '#2563eb' },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      disabled: '#94a3b8',
    },
    divider: '#e2e8f0',
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 700, letterSpacing: '-0.03em', fontSize: '3.5rem' },
    h2: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 700, fontSize: '2.5rem' },
    h3: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 700, fontSize: '2rem' },
    h4: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 700, fontSize: '1.5rem' },
    h5: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 600, fontSize: '1.25rem' },
    h6: { fontFamily: '"Space Grotesk", "Inter", sans-serif', fontWeight: 600, fontSize: '1rem' },
    button: { fontFamily: '"Inter", sans-serif', fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 30%, #f1f5f9 70%, #fef3c7 100%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 30px -12px rgba(13,107,58,0.15)',
            borderColor: PRIMARY_GREEN,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 40,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${PRIMARY_GREEN}, ${PRIMARY_GREEN_LIGHT})`,
          boxShadow: `0 4px 15px rgba(13,107,58,0.3)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${PRIMARY_GREEN_LIGHT}, ${PRIMARY_GREEN})`,
            boxShadow: `0 8px 20px rgba(13,107,58,0.4)`,
          },
        },
        outlined: {
          borderColor: PRIMARY_GREEN,
          color: PRIMARY_GREEN,
          '&:hover': {
            borderColor: PRIMARY_GREEN_LIGHT,
            backgroundColor: `rgba(13,107,58,0.04)`,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          borderBottom: `1px solid rgba(13,107,58,0.1)`,
          boxShadow: 'none',
          color: '#0f172a',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 99,
          backgroundColor: '#e2e8f0',
          height: 6,
        },
        bar: {
          borderRadius: 99,
          background: `linear-gradient(90deg, ${PRIMARY_GREEN}, ${PRIMARY_GREEN_LIGHT})`,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: `rgba(13,107,58,0.1)`,
          color: PRIMARY_GREEN,
        },
      },
    },
  },
});
