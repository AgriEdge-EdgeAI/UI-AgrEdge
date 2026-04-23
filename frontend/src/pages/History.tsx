import React, { useState } from 'react';
import {
  Grid, Paper, Typography, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip,
  Avatar, Divider, Container, TablePagination
} from '@mui/material';
import {
  Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from 'recharts';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FilterListIcon from '@mui/icons-material/FilterList';

const PRIMARY_GREEN = '#0d6b3a';

const historyData = [
  { date: 'Jan 15, 2026', time: '10:30 AM', event: 'Irrigation Activated', value: '12 L', insight: '94% need predicted', severity: 'Normal', color: PRIMARY_GREEN },
  { date: 'Jan 15, 2026', time: '08:15 AM', event: 'Alert: Low Moisture', value: '45%', insight: 'Below threshold', severity: 'Moderate', color: '#f97316' },
  { date: 'Jan 15, 2026', time: '06:00 AM', event: 'System Check', value: 'All OK', insight: '—', severity: 'Normal', color: PRIMARY_GREEN },
  { date: 'Jan 14, 2026', time: '05:30 PM', event: 'Irrigation Completed', value: '15 L', insight: '87% need predicted', severity: 'Normal', color: PRIMARY_GREEN },
  { date: 'Jan 14, 2026', time: '02:00 PM', event: 'Manual Override', value: '8 L', insight: 'User triggered', severity: 'Low', color: '#3b82f6' },
  { date: 'Jan 13, 2026', time: '09:10 AM', event: 'Alert: High Temp', value: '38°C', insight: 'Heat stress risk', severity: 'High', color: '#ef4444' },
  { date: 'Jan 13, 2026', time: '07:00 AM', event: 'Irrigation Activated', value: '18 L', insight: '91% need predicted', severity: 'Normal', color: PRIMARY_GREEN },
];

const mlAccuracyData = [
  { week: 'Week 1', predicted: 2850, actual: 2780, accuracy: 97.5 },
  { week: 'Week 2', predicted: 3120, actual: 3050, accuracy: 97.8 },
  { week: 'Week 3', predicted: 2980, actual: 3100, accuracy: 96.1 },
  { week: 'Week 4', predicted: 3550, actual: 3420, accuracy: 96.3 },
];

const totalPredicted = mlAccuracyData.reduce((sum, w) => sum + w.predicted, 0);
const totalActual = mlAccuracyData.reduce((sum, w) => sum + w.actual, 0);
const overallAccuracy = Math.round((totalActual / totalPredicted) * 100);

const SEVERITY_FILTERS = ['All', 'Normal', 'Moderate', 'High', 'Low'];

const History: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = filter === 'All' ? historyData : historyData.filter(r => r.severity === filter);
  const paginatedData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: '#0f172a' }}>Detection History</Typography>
          <Typography variant="body2" sx={{ color: '#475569' }}>Irrigation events, alerts, and ML model performance</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderRadius: 2 }}>Export CSV</Button>
          <Button variant="outlined" startIcon={<PictureAsPdfIcon />} sx={{ borderRadius: 2, borderColor: '#f97316', color: '#f97316' }}>PDF Report</Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, border: '1px solid #e2e8f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ bgcolor: `rgba(13,107,58,0.1)`, width: 40, height: 40 }}><FilterListIcon sx={{ color: PRIMARY_GREEN }} /></Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Irrigation Events</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {SEVERITY_FILTERS.map(f => (
                  <Chip key={f} label={f} onClick={() => { setFilter(f); setPage(0); }} sx={{ cursor: 'pointer', bgcolor: filter === f ? PRIMARY_GREEN : 'transparent', color: filter === f ? '#fff' : '#475569', border: filter === f ? 'none' : '1px solid #e2e8f0' }} />
                ))}
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <TableContainer>
              <Table>
                <TableHead><TableRow sx={{ bgcolor: '#f8fafc' }}><TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell><TableCell sx={{ fontWeight: 600 }}>Event</TableCell><TableCell sx={{ fontWeight: 600 }}>Value</TableCell><TableCell sx={{ fontWeight: 600 }}>ML Insight</TableCell><TableCell sx={{ fontWeight: 600 }}>Severity</TableCell></TableRow></TableHead>
                <TableBody>
                  {paginatedData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell><Typography variant="body2" sx={{ fontWeight: 500 }}>{row.date}</Typography><Typography variant="caption" sx={{ color: '#64748b' }}>{row.time}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{row.event}</Typography></TableCell>
                      <TableCell><Typography variant="body2" sx={{ fontWeight: 600, color: PRIMARY_GREEN }}>{row.value}</Typography></TableCell>
                      <TableCell><Typography variant="caption" sx={{ color: '#475569' }}>{row.insight}</Typography></TableCell>
                      <TableCell><Chip label={row.severity} size="small" sx={{ bgcolor: `${row.color}15`, border: `1px solid ${row.color}30`, color: row.color }} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filtered.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(_, newPage) => setPage(newPage)} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Avatar sx={{ bgcolor: `rgba(13,107,58,0.1)` }}><WaterDropIcon sx={{ color: PRIMARY_GREEN }} /></Avatar>
              <Box><Typography variant="h6" sx={{ fontWeight: 700 }}>ML Prediction vs Actual Usage</Typography><Typography variant="caption">How accurate is our ML model?</Typography></Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={mlAccuracyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis label={{ value: 'Water Usage (Liters)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="predicted" name="ML Predicted" fill={PRIMARY_GREEN} barSize={40} />
                  <Bar dataKey="actual" name="Actual Used" fill="#f97316" barSize={40} />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <Typography variant="caption" sx={{ color: PRIMARY_GREEN, fontWeight: 600 }}>ML Model Accuracy: {overallAccuracy}%</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 3, border: `1px solid ${PRIMARY_GREEN}20`, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${PRIMARY_GREEN}, #f97316)` }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Avatar sx={{ bgcolor: `rgba(13,107,58,0.1)` }}><AutoGraphIcon sx={{ color: PRIMARY_GREEN }} /></Avatar>
              <Box><Typography variant="h6" sx={{ fontWeight: 700 }}>ML Model Performance</Typography><Typography variant="caption">KNN v1.2 · Updated daily</Typography></Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h1" sx={{ fontSize: '3.5rem', fontWeight: 800, background: `linear-gradient(135deg, ${PRIMARY_GREEN}, #f97316)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{overallAccuracy}%</Typography>
              <Typography variant="body2">Prediction Accuracy</Typography>
            </Box>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={6}><Box sx={{ p: 2, borderRadius: 2, bgcolor: `rgba(13,107,58,0.04)` }}><Typography variant="caption">Total Predicted</Typography><Typography variant="h5" sx={{ fontWeight: 700, color: PRIMARY_GREEN }}>{totalPredicted.toLocaleString()} L</Typography></Box></Grid>
              <Grid size={6}><Box sx={{ p: 2, borderRadius: 2, bgcolor: `rgba(249,115,22,0.04)` }}><Typography variant="caption">Total Actual</Typography><Typography variant="h5" sx={{ fontWeight: 700, color: '#f97316' }}>{totalActual.toLocaleString()} L</Typography></Box></Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button fullWidth variant="outlined" startIcon={<DownloadIcon />}>Export CSV</Button>
              <Button fullWidth variant="outlined" startIcon={<PictureAsPdfIcon />} sx={{ borderColor: '#f97316', color: '#f97316' }}>PDF Report</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default History;
