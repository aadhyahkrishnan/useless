
# 🍌 Banana Yatra — Kerala District Distance Calculator

A funny TinkerHub Useless Project that converts the road distance between two Kerala districts into a number of bananas.

## Features

- All 14 Kerala districts
- From / To district selector
- Swap button
- Nendran, Palayamkodan, Robusta, Poovan and Rasthali
- Attractive responsive UI
- Road-distance calculation using OSRM/OpenStreetMap
- Automatic fallback to straight-line distance if routing is unavailable
- Funny banana-themed result

## Run on Fedora / Linux

### 1. Open terminal and enter the project folder

```bash
cd banana_distance_kerala
```

### 2. Create a virtual environment

```bash
python3 -m venv venv
```

### 3. Activate it

```bash
source venv/bin/activate
```

### 4. Install packages

```bash
pip install -r requirements.txt
```

### 5. Start the website

```bash
python app.py
```

You should see something like:

```text
* Running on http://127.0.0.1:5000
```

### 6. Open it in Firefox

Go to:

http://127.0.0.1:5000

## Project structure

```text
banana_distance_kerala/
├── app.py
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## Important

The banana lengths are intentionally playful assumptions for the useless-project concept:

- Nendran = 20 cm
- Palayamkodan = 16 cm
- Robusta = 18 cm
- Poovan = 15 cm
- Rasthali = 17 cm

You can change these values in `app.py`.

The project uses district-headquarters coordinates, then requests an approximate road route from OSRM. If the internet routing service is unavailable, it automatically uses a straight-line fallback so the demo can still run.
