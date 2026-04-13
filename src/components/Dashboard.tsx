import { useSensorData } from '../hooks/useSensorData';
import { SensorCard } from './SensorCard';
import { AlertPanel } from './AlertPanel';
import { MiniChart } from './MiniChart';
import { Thermometer, Wind, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const { currentData, history } = useSensorData();

  const tempData = history.map((reading) => ({
    time: new Date(reading.timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    value: reading.temperature,
  }));

  const gasData = history.map((reading) => ({
    time: new Date(reading.timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    value: reading.gasLevel,
  }));

  const whistleData = history.map((reading) => ({
    time: new Date(reading.timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    value: reading.whistleCount,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Alert Panel */}
      <AlertPanel currentData={currentData} />

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <SensorCard
          title="Temperature Monitor"
          icon={<Thermometer className="w-6 h-6" />}
          value={currentData.temperature.current.toFixed(1)}
          unit={currentData.temperature.unit}
          status={currentData.temperature.status}
          description="Kitchen heat level"
          chart={<MiniChart data={tempData} color="#ef4444" />}
        />

        <SensorCard
          title="Gas Detector"
          icon={<Wind className="w-6 h-6" />}
          value={currentData.gas.current.toFixed(0)}
          unit={currentData.gas.unit}
          status={currentData.gas.status}
          description="LP gas leakage detection"
          chart={<MiniChart data={gasData} color="#f59e0b" />}
        />

        <SensorCard
          title="Sound Sensor"
          icon={<Volume2 className="w-6 h-6" />}
          value={currentData.sound.whistleCount.toString()}
          unit="whistles"
          status="normal"
          description="Pressure cooker whistle count"
          chart={<MiniChart data={whistleData} color="#3b82f6" type="bar" />}
          lastDetected={currentData.sound.lastDetected}
        />
      </div>

      {/* Real-time Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm text-gray-600">Temperature Sensor</p>
              <p className="text-xs text-gray-500">Online - Last update: just now</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm text-gray-600">Gas Sensor</p>
              <p className="text-xs text-gray-500">Online - Last update: just now</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm text-gray-600">Sound Sensor</p>
              <p className="text-xs text-gray-500">Online - Last update: just now</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
