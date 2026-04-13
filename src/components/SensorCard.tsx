import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface SensorCardProps {
  title: string;
  icon: ReactNode;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  description: string;
  chart: ReactNode;
  lastDetected?: number | null;
}

export function SensorCard({
  title,
  icon,
  value,
  unit,
  status,
  description,
  chart,
  lastDetected,
}: SensorCardProps) {
  const statusConfig = {
    normal: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      icon: <CheckCircle className="w-5 h-5" />,
      label: 'Normal',
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      icon: <AlertTriangle className="w-5 h-5" />,
      label: 'Warning',
    },
    critical: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      icon: <XCircle className="w-5 h-5" />,
      label: 'Critical',
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`${config.bg} ${config.text} p-2 rounded-lg`}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
      </div>

      {/* Value Display */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">{value}</span>
          <span className="text-lg text-gray-500">{unit}</span>
        </div>
        {lastDetected && (
          <p className="text-xs text-gray-500 mt-1">
            Last detected: {new Date(lastDetected).toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Status Badge */}
      <div className={`${config.bg} ${config.text} inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4`}>
        {config.icon}
        <span>{config.label}</span>
      </div>

      {/* Mini Chart */}
      <div className="h-20 mt-4">
        {chart}
      </div>
    </motion.div>
  );
}
