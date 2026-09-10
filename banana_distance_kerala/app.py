
from flask import Flask, render_template, request, jsonify
import math
import requests

app = Flask(__name__)

# Kerala district headquarters: latitude, longitude
DISTRICTS = {
    "Alappuzha": (9.4981, 76.3388),
    "Ernakulam": (9.9816, 76.2999),
    "Idukki": (9.9189, 77.1025),
    "Kannur": (11.8745, 75.3704),
    "Kasaragod": (12.5102, 74.9852),
    "Kollam": (8.8932, 76.6141),
    "Kottayam": (9.5916, 76.5222),
    "Kozhikode": (11.2588, 75.7804),
    "Malappuram": (11.0510, 76.0711),
    "Palakkad": (10.7867, 76.6548),
    "Pathanamthitta": (9.2648, 76.7870),
    "Thiruvananthapuram": (8.5241, 76.9366),
    "Thrissur": (10.5276, 76.2144),
    "Wayanad": (11.6854, 76.1310),
}

# Approximate banana lengths in metres.
# These are playful project values, not agricultural measurements.
BANANAS = {
    "Nendran": 0.20,
    "Palayamkodan": 0.16,
    "Robusta": 0.18,
    "Poovan": 0.15,
    "Rasthali": 0.17,
}

def haversine_km(a, b):
    lat1, lon1 = map(math.radians, a)
    lat2, lon2 = map(math.radians, b)
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    x = math.sin(dlat/2)**2 + math.cos(lat1)*math.cos(lat2)*math.sin(dlon/2)**2
    return 6371 * 2 * math.asin(math.sqrt(x))

def route_distance_km(source, destination):
    # OSRM gives an approximate road-driving distance.
    coords = f"{source[1]},{source[0]};{destination[1]},{destination[0]}"
    url = f"https://router.project-osrm.org/route/v1/driving/{coords}"
    try:
        r = requests.get(url, params={"overview": "false"}, timeout=8)
        r.raise_for_status()
        data = r.json()
        if data.get("routes"):
            return data["routes"][0]["distance"] / 1000, "road"
    except requests.RequestException:
        pass

    # Internet/API fallback so the demo still works.
    return haversine_km(source, destination), "straight-line fallback"

@app.route("/")
def home():
    return render_template(
        "index.html",
        districts=sorted(DISTRICTS.keys()),
        bananas=BANANAS
    )

@app.post("/calculate")
def calculate():
    data = request.get_json(silent=True) or {}
    start = data.get("from")
    end = data.get("to")
    banana = data.get("banana")

    if start not in DISTRICTS or end not in DISTRICTS:
        return jsonify({"error": "Please select valid Kerala districts."}), 400
    if banana not in BANANAS:
        return jsonify({"error": "Please select a banana type."}), 400
    if start == end:
        return jsonify({
            "distance_km": 0,
            "banana_count": 0,
            "banana_name": banana,
            "method": "same district",
            "message": f"You are already in {start}. Banana trip cancelled! 🍌"
        })

    km, method = route_distance_km(DISTRICTS[start], DISTRICTS[end])
    metres = km * 1000
    banana_count = metres / BANANAS[banana]

    return jsonify({
        "distance_km": round(km, 1),
        "banana_count": round(banana_count),
        "banana_length_cm": int(BANANAS[banana] * 100),
        "banana_name": banana,
        "method": method,
        "message": f"That's about {round(banana_count):,} {banana} bananas long! 🍌"
    })

if __name__ == "__main__":
    app.run(debug=True)
