#!/usr/bin/env python
# Separe la piste audio d'une pub en "voix" (jetee) et "musique de fond" (gardee), via Demucs.
# Contourne torchaudio/torchcodec (souvent casse sur Windows) : lit/ecrit le WAV avec scipy,
# appelle Demucs par son API Python. Sortie = un WAV "musique seule" (stems non-vocaux sommes).
#
# Usage : python scripts/separate-music.py --in entree.wav --out musique-fond.wav [--model htdemucs]
# Entree attendue : WAV stereo 44.1 kHz (extrais-le avec ffmpeg -vn -ac 2 -ar 44100).

import argparse
import numpy as np
import torch
from scipy.io import wavfile
from demucs.pretrained import get_model
from demucs.apply import apply_model


def read_wav(path):
    sr, data = wavfile.read(path)
    # scipy renvoie (samples,) ou (samples, channels), dtype int16/int32/float
    if data.ndim == 1:
        data = data[:, None]
    # normalise en float32 [-1, 1]
    if np.issubdtype(data.dtype, np.integer):
        maxval = np.iinfo(data.dtype).max
        data = data.astype(np.float32) / maxval
    else:
        data = data.astype(np.float32)
    # (samples, channels) -> (channels, samples)
    return sr, torch.from_numpy(data.T).contiguous()


def write_wav(path, sr, tensor):
    # tensor (channels, samples) float -> (samples, channels) int16
    arr = tensor.numpy().T
    arr = np.clip(arr, -1.0, 1.0)
    wavfile.write(path, sr, (arr * 32767.0).astype(np.int16))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="inp", required=True)
    ap.add_argument("--out", dest="out", required=True)
    ap.add_argument("--model", default="htdemucs")
    args = ap.parse_args()

    sr_in, wav = read_wav(args.inp)
    model = get_model(args.model)
    model.eval()

    # resample si besoin vers model.samplerate
    target_sr = model.samplerate
    if sr_in != target_sr:
        import torchaudio.functional as AF
        wav = AF.resample(wav, sr_in, target_sr)

    # demucs veut (batch, channels, length), et exactement model.audio_channels canaux
    ch = model.audio_channels
    if wav.shape[0] == 1 and ch == 2:
        wav = wav.repeat(2, 1)
    elif wav.shape[0] == 2 and ch == 1:
        wav = wav.mean(0, keepdim=True)

    ref = wav.mean(0)
    wav_n = (wav - ref.mean()) / (ref.std() + 1e-8)

    with torch.no_grad():
        sources = apply_model(model, wav_n[None], device="cpu", progress=True)[0]
    sources = sources * ref.std() + ref.mean()

    # ordre des stems du modele
    names = model.sources  # ex ['drums','bass','other','vocals']
    idx_vocals = names.index("vocals")
    # musique = somme de tous les stems SAUF vocals
    music = sum(sources[i] for i in range(len(names)) if i != idx_vocals)

    write_wav(args.out, target_sr, music)
    print(f"OK musique -> {args.out}  (stems: {names}, sr={target_sr})")


if __name__ == "__main__":
    main()
