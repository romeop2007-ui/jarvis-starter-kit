#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Transcription locale d'une video/audio de formation -> texte + sous-titres.
Moteur : faster-whisper (Whisper d'OpenAI, 100% local, rien ne sort du PC).

Usage :
    python scripts/transcribe.py "chemin/vers/video.mp4"
    python scripts/transcribe.py "video.mp4" --model large-v3-turbo   # plus rapide
    python scripts/transcribe.py "video.mp4" --model medium           # encore plus rapide

Sorties (a cote du fichier source) :
    <nom>.txt   -> texte propre, prêt à me coller
    <nom>.srt   -> texte avec timestamps (pour retrouver un passage)

Choix des modeles (du + precis au + rapide) :
    large-v3        : qualite maximale, jargon bien reconnu, LENT sur CPU
    large-v3-turbo  : quasi aussi bon, ~3-4x plus rapide  (bon compromis CPU)
    medium          : correct, rapide
"""
import os
# Windows sans mode developpeur/admin : interdit les symlinks du cache HuggingFace
# (WinError 1314). On force la copie de fichiers a la place. A definir AVANT
# tout import de faster_whisper / huggingface_hub.
os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS", "1")
os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")

import sys
import argparse
from pathlib import Path

# Glossaire d'amorcage : on donne d'avance a Whisper le vocabulaire e-com/dropshipping
# pour qu'il ne massacre pas le jargon (ROAS, adset, Shopify...).
# Ajoute ici tout terme recurrent d'une formation qui reviendrait mal transcrit.
GLOSSAIRE = (
    "Formation e-commerce et dropshipping. Vocabulaire attendu : "
    "dropshipping, e-commerce, Shopify, Meta, Facebook Ads, Meta Ads, TikTok Ads, "
    "adset, ad set, campagne, creative, creas, winner, produit gagnant, scaling, scaler, "
    "ROAS, CPM, CPC, CPA, COGS, break-even, marge, panier moyen, AOV, funnel, tunnel, "
    "landing page, page produit, upsell, cross-sell, bundle, pixel, retargeting, "
    "audience, ciblage, Advantage plus, CBO, ABO, budget, testing, kill, "
    "fournisseur, AliExpress, sourcing, fulfillment, TrendTrack, angle, hook, "
    "conversion, taux de conversion, checkout, branding, marque, niche, cash flow, "
    "TVA, auto-entrepreneur, URSSAF, Zooryn."
)


def fmt_ts(seconds: float) -> str:
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("source", help="chemin de la video ou de l'audio")
    ap.add_argument("--model", default="large-v3", help="large-v3 | large-v3-turbo | medium")
    ap.add_argument("--lang", default="fr")
    args = ap.parse_args()

    src = Path(args.source)
    if not src.exists():
        sys.exit(f"Fichier introuvable : {src}")

    from faster_whisper import WhisperModel

    print(f"[1/3] Chargement du modele {args.model} (1er run = telechargement ~1,5 Go)...", flush=True)
    # CPU : int8 = beaucoup plus rapide, perte de qualite negligeable
    model = WhisperModel(args.model, device="cpu", compute_type="int8")

    print(f"[2/3] Transcription de {src.name} (langue={args.lang})...", flush=True)
    segments, info = model.transcribe(
        str(src),
        language=args.lang,
        initial_prompt=GLOSSAIRE,
        vad_filter=True,          # coupe les silences -> plus rapide
        beam_size=5,
        condition_on_previous_text=True,
    )
    print(f"      duree detectee : {info.duration:.0f}s", flush=True)

    txt_lines, srt_lines = [], []
    for i, seg in enumerate(segments, 1):
        text = seg.text.strip()
        txt_lines.append(text)
        srt_lines.append(f"{i}\n{fmt_ts(seg.start)} --> {fmt_ts(seg.end)}\n{text}\n")
        # feedback de progression (chaque segment au fil de l'eau)
        print(f"  [{fmt_ts(seg.start)}] {text}", flush=True)

    txt_path = src.with_suffix(".txt")
    srt_path = src.with_suffix(".srt")
    txt_path.write_text(" ".join(txt_lines), encoding="utf-8")
    srt_path.write_text("\n".join(srt_lines), encoding="utf-8")

    print(f"\n[3/3] Termine.", flush=True)
    print(f"  Texte : {txt_path}", flush=True)
    print(f"  SRT   : {srt_path}", flush=True)


if __name__ == "__main__":
    main()
