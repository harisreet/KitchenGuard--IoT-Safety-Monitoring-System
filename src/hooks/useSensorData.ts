import { useState, useEffect, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { useSettings } from './useSettings';

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
  alerts?: {
    cooker?: {
      message: string;
      timestamp: string;
      whistleCount: number;
    };
    gas?: {
      message: string;
      timestamp: string;
    };
  };
}

export function useSensorData() {
  const { settings } = useSettings();
  const settingsRefHook = useRef(settings);

  const [currentData, setCurrentData] = useState<SensorStatus>({
    temperature: {
      current: 0,
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
    alerts: undefined,
  });

  const [history, setHistory] = useState<SensorReading[]>([]);
  const currentDataRef = useRef(currentData);

  // Sync settings to ref for callbacks
  useEffect(() => {
    settingsRefHook.current = settings;
  }, [settings]);

  // Sync currentData to ref for use in setInterval without triggering effect recreation
  useEffect(() => {
    currentDataRef.current = currentData;
  }, [currentData]);

  useEffect(() => {
    const alertRef = ref(database, 'alert');
    const unsubscribeAlert = onValue(alertRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentData((prev) => {
          const alertWhistle = data.cooker?.whistleCount || 0;
          return {
            ...prev,
            alerts: data,
            sound: {
              ...prev.sound,
              whistleCount: Math.max(prev.sound.whistleCount, alertWhistle)
            }
          };
        });
      }
    });

    const kitchenRef = ref(database, 'smart_kitchen');
    const unsubscribeKitchen = onValue(kitchenRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentData((prev) => {
          const currentSettings = settingsRefHook.current;
          const newTemp = data.temperature ?? prev.temperature.current;
          const newGas = data.gas_level ?? prev.gas.current;

          return {
            ...prev,
            temperature: {
              ...prev.temperature,
              current: newTemp,
              status: newTemp > currentSettings.tempCritical ? 'critical' : newTemp > currentSettings.tempWarning ? 'warning' : 'normal',
            },
            gas: {
              ...prev.gas,
              current: newGas,
              status: newGas > currentSettings.gasCritical ? 'critical' : newGas > currentSettings.gasWarning ? 'warning' : 'normal',
            },
          };
        });
      }
    });

    const sensorRef = ref(database, 'sensor');
    const unsubscribeSensor = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentData((prev) => {
          // If whistle isn't available, check sound. The mock was a cumulative count. 
          // Let's use sound level from DB as it fluctuates but whistle seems to always be 0. 
          // Fetch whistle count from sensor data, but respect alert whistle count if it's higher
          const sensorWhistle = data.whistle !== undefined ? data.whistle : 0;
          const alertWhistle = prev.alerts?.cooker?.whistleCount || 0;
          const newWhistleCount = Math.max(sensorWhistle, alertWhistle);
          
          let lastDetected = prev.sound.lastDetected;
          if (newWhistleCount > prev.sound.whistleCount) {
             lastDetected = Date.now();
          }

          return {
            ...prev,
            sound: {
              whistleCount: newWhistleCount,
              lastDetected,
            }
          };
        });
      }
    });

    return () => {
      unsubscribeKitchen();
      unsubscribeSensor();
      unsubscribeAlert();
    };
  }, []);

  // Generate initial history once
  useEffect(() => {
    const now = Date.now();
    const initialHistory: SensorReading[] = [];
    for (let i = 30; i >= 0; i--) {
        initialHistory.push({
            timestamp: now - i * 3000,
            temperature: 0,
            gasLevel: 0,
            whistleCount: 0,
        });
    }
    setHistory(initialHistory);
  }, []);

  // Poll current data into history for real-time charting
  useEffect(() => {
    const interval = setInterval(() => {
      const liveData = currentDataRef.current;
      setHistory((prev) => {
        if (prev.length === 0) return prev;
        
        const newReading: SensorReading = {
          timestamp: Date.now(),
          temperature: liveData.temperature.current,
          gasLevel: liveData.gas.current,
          whistleCount: liveData.sound.whistleCount,
        };
        return [...prev.slice(-29), newReading]; // Keep last 30 readings
      });
    }, settings.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [settings.refreshInterval]);

  return { currentData, history };
}
