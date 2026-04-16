import { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../firebase';

export interface AppSettings {
  tempWarning: number;
  tempCritical: number;
  gasWarning: number;
  gasCritical: number;
  soundEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  refreshInterval: number;
}

export const defaultSettings: AppSettings = {
  tempWarning: 30,
  tempCritical: 40,
  gasWarning: 50,
  gasCritical: 100,
  soundEnabled: true,
  emailNotifications: true,
  smsNotifications: false,
  refreshInterval: 3,
};

export function useSettings() {
  const [settings, setSettingsData] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const settingsRef = ref(database, 'settings');
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSettingsData({ ...defaultSettings, ...data });
      } else {
        // Init default settings if settings don't exist yet
        set(settingsRef, defaultSettings);
        setSettingsData(defaultSettings);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveSettings = async (newSettings: AppSettings) => {
    const settingsRef = ref(database, 'settings');
    await set(settingsRef, newSettings);
  };

  return { settings, saveSettings, loading };
}
