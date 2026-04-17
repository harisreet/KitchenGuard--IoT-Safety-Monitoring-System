import { useEffect, useRef } from 'react';
import { SensorStatus } from './useSensorData';
import { useSettings } from './useSettings';
import emailjs from '@emailjs/browser';

const EMAIL_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes between emails for the same alert type

export function useEmailAlerts(currentData: SensorStatus) {
  const { settings } = useSettings();
  const lastSentRef = useRef<Record<string, number>>({});

  useEffect(() => {
    // Only proceed if email notifications are enabled in settings
    if (!settings.emailNotifications) return;

    const checkAndSendAlert = async (type: string, status: string, value: number, unit: string) => {
      // Trigger email only on critical alerts
      if (status === 'critical') {
        const now = Date.now();
        const lastSent = lastSentRef.current[type] || 0;

        // Prevent spamming by checking cooldown
        if (now - lastSent > EMAIL_COOLDOWN_MS) {
          try {
            const templateParams = {
              alert_type: `CRITICAL ${type.toUpperCase()} ALERT`,
              message: `Critical ${type} level detected: ${value.toFixed(1)} ${unit}. Immediate attention required!`,
              time: new Date().toLocaleString(),
            };

            // These values should be configured in your .env file
            // e.g. VITE_EMAILJS_SERVICE_ID=your_service_id
            await emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID || 'dummy_service',
              import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'dummy_template',
              templateParams,
              import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'dummy_key'
            );
            
            console.log(`[EmailJS] Alert successfully sent for ${type}`);
            lastSentRef.current[type] = now;
          } catch (error) {
            console.error('Failed to send email alert. Please check your EmailJS configuration.', error);
            // Updating standard lastSent time to prevent rapid fire errors if configuration fails
            lastSentRef.current[type] = now;
          }
        }
      }
    };

    checkAndSendAlert('temperature', currentData.temperature.status, currentData.temperature.current, currentData.temperature.unit);
    checkAndSendAlert('gas', currentData.gas.status, currentData.gas.current, currentData.gas.unit);

  }, [currentData, settings.emailNotifications]);
}
