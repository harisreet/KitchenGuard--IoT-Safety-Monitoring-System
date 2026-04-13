import { useSensorData } from '../hooks/useSensorData';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export function Analytics() {
  const { history } = useSensorData();

  const chartData = history.map((reading) => ({
    time: new Date(reading.timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    temperature: reading.temperature,
    gas: reading.gasLevel,
    whistles: reading.whistleCount,
  }));

  // Calculate statistics
  const avgTemp = history.reduce((sum, r) => sum + r.temperature, 0) / history.length;
  const maxTemp = Math.max(...history.map(r => r.temperature));
  const totalWhistles = history.reduce((sum, r) => sum + r.whistleCount, 0);
  const maxGas = Math.max(...history.map(r => r.gasLevel));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h2>
        <p className="text-gray-600 mt-1">Historical sensor data and trends</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Avg Temperature</span>
          </div>
          <p className="text-3xl font-bold">{avgTemp.toFixed(1)}°C</p>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-75">
            <TrendingUp className="w-4 h-4" />
            <span>Last 30 readings</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Peak Temperature</span>
          </div>
          <p className="text-3xl font-bold">{maxTemp.toFixed(1)}°C</p>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-75">
            <TrendingUp className="w-4 h-4" />
            <span>Maximum recorded</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Peak Gas Level</span>
          </div>
          <p className="text-3xl font-bold">{maxGas.toFixed(0)} ppm</p>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-75">
            <TrendingDown className="w-4 h-4" />
            <span>Maximum recorded</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Total Whistles</span>
          </div>
          <p className="text-3xl font-bold">{totalWhistles}</p>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-75">
            <Activity className="w-4 h-4" />
            <span>Detected count</span>
          </div>
        </motion.div>
      </div>

      {/* Temperature & Gas Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Temperature & Gas Levels Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              label={{ value: 'Gas (ppm)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="temperature" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Temperature (°C)"
              dot={false}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="gas" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Gas Level (ppm)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Temperature Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Temperature Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="temperature" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorTemp)"
              name="Temperature"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Whistle Count Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Whistle Detection History</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              label={{ value: 'Whistle Count', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar 
              dataKey="whistles" 
              fill="#3b82f6" 
              radius={[8, 8, 0, 0]}
              name="Whistles Detected"
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
