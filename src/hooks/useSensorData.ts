import { useState, useEffect } from 'react';

export interface SensorReading {
  timestamp: number;
  temperature: number;
  gasLevel: number;
  whistleCount: number;
}

export interface SensorStatus {
  temperature: {
    current: number;
    status: 'normal' | 'warning' | 'critical';
    unit: string;
  };
  gas: {
    current: number;
    status: 'normal' | 'warning' | 'critical';
    unit: string;
  };
  sound: {
    whistleCount: number;
    lastDetected: number | null;
  };
}

export function useSensorData() {
  const [currentData, setCurrentData] = useState<SensorStatus>({
    temperature: {
      current: 25,
      status: 'normal',
      unit: '°C',
    },
    gas: {
      current: 0,
      status: 'normal',
      unit: 'ppm',
    },
    sound: {
      whistleCount: 0,
      lastDetected: null,
    },
  });

  const [history, setHistory] = useState<SensorReading[]>([]);

  useEffect(() => {
    // Initialize with some historical data
    const now = Date.now();
    const initialHistory: SensorReading[] = [];
    for (let i = 30; i >= 0; i--) {
      initialHistory.push({
        timestamp: now - i * 60000, // 1 minute intervals
        temperature: 20 + Math.random() * 10,
        gasLevel: Math.random() * 50,
        whistleCount: Math.floor(Math.random() * 3),
      });
    }
    setHistory(initialHistory);

    // Simulate real-time sensor updates
    const interval = setInterval(() => {
      const newTemp = 20 + Math.random() * 30;
      const newGas = Math.random() * 200;
      const whistleDetected = Math.random() > 0.95; // 5% chance of whistle

      setCurrentData((prev) => {
        const newWhistleCount = whistleDetected ? prev.sound.whistleCount + 1 : prev.sound.whistleCount;
        
        return {
          temperature: {
            current: newTemp,
            status: newTemp > 40 ? 'critical' : newTemp > 30 ? 'warning' : 'normal',
            unit: '°C',
          },
          gas: {
            current: newGas,
            status: newGas > 100 ? 'critical' : newGas > 50 ? 'warning' : 'normal',
            unit: 'ppm',
          },
          sound: {
            whistleCount: newWhistleCount,
            lastDetected: whistleDetected ? Date.now() : prev.sound.lastDetected,
          },
        };
      });

      setHistory((prev) => {
        const newReading: SensorReading = {
          timestamp: Date.now(),
          temperature: newTemp,
          gasLevel: newGas,
          whistleCount: whistleDetected ? 1 : 0,
        };
        return [...prev.slice(-29), newReading]; // Keep last 30 readings
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return { currentData, history };
}
