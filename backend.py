import firebase_admin
from firebase_admin import credentials, db

# Initialize (run once)
cred = credentials.Certificate("firebase-key.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://smart-kitchen-iot-76dd9-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

# Reference
ref = db.reference("smart_kitchen")

# Fetch data
data = ref.get()

print("Smart Kitchen Data:")
print(data)

# Access specific values
temperature = data.get("temperature")
gas = data.get("gas_level")
sensor = data.get("sensor")

print("Temperature:", temperature)
print("Gas Level:", gas)

ref = db.reference("sensor/data")

data = ref.get()

print("All Sensor Data:")
for key, value in data.items():
    print(f"\nID: {key}")
    print(value)