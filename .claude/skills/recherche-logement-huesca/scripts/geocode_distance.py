#!/usr/bin/env python3
"""Geocode an address via OpenStreetMap Nominatim and estimate walking time
from Ronda Misericordia 5, 22001 Huesca (Campus de Huesca).

Usage:
    python3 geocode_distance.py "Calle San Orencio, Huesca"

Output (stdout, JSON):
    {"query": "...", "lat": .., "lon": .., "straight_line_m": .., "walk_minutes": .., "precise": true/false}
On geocoding failure, prints a JSON error to stderr and exits 1.
"""
import sys
import json
import math
import urllib.request
import urllib.parse

# Facultad de Empresa y Gestión Pública, Plaza de la Constitución s/n, 22001 Huesca
# (≈126 m / 2 min à pied de Ronda Misericordia 5, l'ancienne référence administrative du campus)
DEST_LAT = 42.141417
DEST_LON = -0.4060435
ROUTING_FACTOR = 1.3
WALK_M_PER_MIN = 75
USER_AGENT = "jarvis-romeo-logement-huesca/1.0"


def geocode(query: str):
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(
        {"q": query, "format": "json", "limit": 1}
    )
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    if not data:
        return None
    return float(data[0]["lat"]), float(data[0]["lon"]), data[0].get("display_name", "")


def haversine_m(lat1, lon1, lat2, lon2):
    r = 6371000
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return r * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "usage: geocode_distance.py '<address, Huesca>'"}), file=sys.stderr)
        sys.exit(1)
    query = sys.argv[1]
    result = geocode(query)
    if result is None:
        print(json.dumps({"error": f"no geocoding result for: {query}"}), file=sys.stderr)
        sys.exit(1)
    lat, lon, display_name = result
    dist = haversine_m(lat, lon, DEST_LAT, DEST_LON)
    walk_minutes = (dist * ROUTING_FACTOR) / WALK_M_PER_MIN
    # Heuristic: if the matched display_name has no street number, flag as imprecise
    precise = any(ch.isdigit() for ch in display_name.split(",")[0])
    print(json.dumps({
        "query": query,
        "matched": display_name,
        "lat": lat,
        "lon": lon,
        "straight_line_m": round(dist),
        "walk_minutes": round(walk_minutes, 1),
        "precise": precise,
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
