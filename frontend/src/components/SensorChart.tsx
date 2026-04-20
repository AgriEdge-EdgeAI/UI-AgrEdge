import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', moisture: 45, temp: 22 },
  { time: '04:00', moisture: 48, temp: 21 },
  { time: '08:00', moisture: 42, temp: 23 },
  { time: '12:00', moisture: 38, temp: 26 },
  { time: '16:00', moisture: 35, temp: 27 },
  { time: '20:00', moisture: 40, temp: 24 },
  { time: '24:00', moisture: 43, temp: 23 },
];

const SensorChart: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📊 Sensor Readings (Last 24 Hours)
        </Typography>
        <Box sx={{ height: 350, width: '100%' }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" domain={[0, 100]} label={{ value: 'Moisture (%)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 50]} label={{ value: 'Temperature (°C)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="moisture" stroke="#2e7d32" name="Soil Moisture" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#1976d2" name="Temperature" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Historical sensor data | Auto-refreshes every 30 seconds
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SensorChart;
