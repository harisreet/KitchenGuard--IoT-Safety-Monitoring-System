import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';
import { SensorStatus } from '../hooks/useSensorData';
import { useState } from 'react';

interface AlertPanelProps {
  currentData: SensorStatus;
}

export function AlertPanel({ currentData }: AlertPanelProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const alerts = [];

  if (currentData.temperature.status === 'critical') {
    alerts.push({
      id: 'temp-critical',
      type: 'critical',
      message: `Critical temperature detected: ${currentData.temperature.current.toFixed(1)}°C. Immediate attention required!`,
    });
  } else if (currentData.temperature.status === 'warning') {
    alerts.push({
      id: 'temp-warning',
      type: 'warning',
      message: `Temperature warning: ${currentData.temperature.current.toFixed(1)}°C. Monitor closely.`,
    });
  }

  if (currentData.gas.status === 'critical') {
    alerts.push({
      id: 'gas-critical',
      type: 'critical',
      message: `DANGER! Gas leakage detected: ${currentData.gas.current.toFixed(0)} ppm. Evacuate and ventilate immediately!`,
    });
  } else if (currentData.gas.status === 'warning') {
    alerts.push({
      id: 'gas-warning',
      type: 'warning',
      message: `Gas level elevated: ${currentData.gas.current.toFixed(0)} ppm. Check for leaks.`,
    });
  }

  if (currentData.alerts?.cooker) {
    alerts.push({
      id: `cooker-${currentData.alerts.cooker.timestamp}`,
      type: 'warning',
      message: `Cooker Alert: ${currentData.alerts.cooker.message}. Whistle count reached ${currentData.alerts.cooker.whistleCount}. (Recorded: ${currentData.alerts.cooker.timestamp})`,
    });
  }

  const activeAlerts = alerts.filter(alert => !dismissed.has(alert.id));

  if (activeAlerts.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="space-y-3">
        {activeAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100 }}
            className={`${
              alert.type === 'critical'
                ? 'bg-red-50 border-red-200 text-red-900'
                : 'bg-yellow-50 border-yellow-200 text-yellow-900'
            } border rounded-xl p-4 flex items-start gap-3`}
          >
            <div className={`${
              alert.type === 'critical' ? 'text-red-600' : 'text-yellow-600'
            } mt-0.5`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">
                {alert.type === 'critical' ? 'Critical Alert' : 'Warning'}
              </p>
              <p className="text-sm mt-1">{alert.message}</p>
            </div>
            <button
              onClick={() => setDismissed(prev => new Set(prev).add(alert.id))}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
