# 🍳 Smart Kitchen Monitoring System (IoT Enabled)

An **IoT-based Smart Kitchen Monitoring System** designed to ensure safety, efficiency, and real-time awareness by integrating **wireless sensors**, **WiFi-enabled microcontrollers**, and a **web-based dashboard**.

---

## 📌 Overview

The system continuously monitors critical kitchen parameters such as **temperature**, **gas leakage**, and **acoustic signals (pressure cooker whistles)**. It leverages **IoT hardware and cloud-connected services** to provide **real-time alerts**, **data analytics**, and **remote monitoring capabilities**.

---

## 🏗️ System Architecture

```
Sensors → Microcontroller (WiFi Module) → Cloud / Server → Web Dashboard
```

### 🔗 Workflow

1. Sensors collect real-time environmental data
2. Data is processed by a **WiFi-enabled microcontroller (ESP8266 / ESP32)**
3. Data is transmitted over WiFi using HTTP/MQTT protocols
4. Backend / API processes and stores data
5. Frontend dashboard visualizes data and triggers alerts

---

## 🔌 Hardware Components

| Component                            | Description                      |
| ------------------------------------ | -------------------------------- |
| 🌡️ Temperature Sensor (DHT11/DHT22) | Measures ambient temperature     |
| 🧪 Gas Sensor (MQ-2/MQ-5)            | Detects LPG gas leakage          |
| 🔊 Sound Sensor                      | Detects pressure cooker whistles |
| 📡 WiFi Module (ESP8266 / ESP32)     | Enables wireless communication   |
| ⚡ Microcontroller                    | Processes sensor data            |

---

## 💻 Software Stack

* **Frontend**: React + TypeScript + Vite
* **Routing**: React Router
* **Backend (Optional)**: Node.js / Firebase / REST API
* **Communication Protocols**: HTTP / MQTT
* **Data Visualization**: Charts & Analytics Dashboard

---

## 🚀 Key Features

### 🔍 Real-Time Monitoring

* Live tracking of:

  * Temperature (°C)
  * Gas levels (ppm)
  * Whistle detection count

---

### 🚨 Intelligent Alert System

* **Critical Alert**

  * Temperature exceeds 40°C (e.g., 43.5°C)
* **Warning Alert**

  * Gas level exceeds safe threshold (e.g., 85 ppm)

---

### 📊 Analytics Dashboard

* Average temperature: **25.4°C**
* Peak temperature: **35.1°C**
* Peak gas level: **105 ppm**
* Total whistles detected: **29**

#### Visualization Includes:

* Temperature vs Gas trends
* Time-series analysis
* Whistle detection history

---

### ⚙️ Configurable System Settings

#### 🌡️ Temperature Thresholds

* Warning: 30°C
* Critical: 40°C

#### 🧪 Gas Thresholds

* Warning: 50 ppm
* Critical: 100 ppm

#### 🔔 Notification System

* Audio alerts
* Email notifications
* SMS alerts

#### ⏱️ Refresh Control

* Adjustable intervals (1s / 5s / 10s)

---

## 🌐 Data Flow

1. Sensor reads environmental values
2. Microcontroller processes and filters noise
3. Data sent via WiFi to server/cloud
4. Backend validates and stores data
5. Dashboard updates in real-time
6. Alerts triggered based on threshold conditions

---

## 📦 Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/smart-kitchen-monitoring.git

# Navigate into project
cd smart-kitchen-monitoring

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🔧 Usage

1. Power the IoT device (ESP8266/ESP32 with sensors)
2. Connect to WiFi network
3. Start backend/server (if applicable)
4. Launch frontend dashboard
5. Monitor kitchen status in real-time

---

## 🎯 Applications

* Smart home automation
* Industrial kitchen safety
* Gas leakage detection systems
* IoT-based environmental monitoring

---

## 🚧 Future Enhancements

* 🤖 AI-based anomaly detection
* 📱 Mobile application (Android/iOS)
* ☁️ Cloud integration (AWS IoT / Firebase)
* 🔔 Push notifications & voice alerts
* 📡 Edge computing for faster response

---

## 🛡️ Safety Impact

This system helps:

* Prevent fire hazards
* Detect gas leaks early
* Monitor unattended cooking
* Improve kitchen safety standards


---

## ⭐ Acknowledgment

This project demonstrates the integration of **IoT hardware with modern web technologies** to solve real-world safety challenges.

---
