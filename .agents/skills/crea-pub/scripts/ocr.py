# Detecte toutes les zones de texte d'une image avec leurs coordonnees exactes (EasyOCR).
# Usage : python scripts/ocr.py <image> [langues]   ex: python scripts/ocr.py img.jpg sv,en
# Sortie : JSON sur stdout -> liste de {text, x, y, w, h, conf} (origine haut-gauche, pixels).

import sys, json

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "usage: ocr.py <image> [langs]"}))
        sys.exit(1)
    image = sys.argv[1]
    langs = sys.argv[2].split(",") if len(sys.argv) > 2 else ["sv", "en"]

    import easyocr, numpy as np, cv2
    # Lecture binaire pour gerer les chemins avec accents/espaces (cv2.imread echoue dessus sous Windows).
    data = np.fromfile(image, dtype=np.uint8)
    img = cv2.imdecode(data, cv2.IMREAD_COLOR)
    if img is None:
        print(json.dumps({"error": f"image illisible: {image}"}))
        sys.exit(1)
    reader = easyocr.Reader(langs, gpu=False, verbose=False)
    results = reader.readtext(img)

    boxes = []
    for bbox, text, conf in results:
        xs = [p[0] for p in bbox]
        ys = [p[1] for p in bbox]
        x, y = min(xs), min(ys)
        w, h = max(xs) - x, max(ys) - y
        boxes.append({
            "text": text,
            "x": int(round(x)), "y": int(round(y)),
            "w": int(round(w)), "h": int(round(h)),
            "conf": round(float(conf), 3),
        })
    print(json.dumps(boxes, ensure_ascii=False))

if __name__ == "__main__":
    main()
