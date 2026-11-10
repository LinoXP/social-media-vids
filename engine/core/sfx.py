"""Procedural sound design mixed under the voiceover. Usage: python3 sfx.py timeline.json voice.wav cues.json out.wav"""
import json, sys, numpy as np, soundfile as sf

SR = 44100
rng = np.random.default_rng(7)

def band_noise(dur, lo, hi):
    n = int(dur * SR); x = rng.standard_normal(n)
    X = np.fft.rfft(x); f = np.fft.rfftfreq(n, 1 / SR)
    X *= ((f >= lo) & (f <= hi)) * 1.0
    y = np.fft.irfft(X, n); return y / (np.abs(y).max() + 1e-9)

def env(n, a, r, sustain=1.0):
    e = np.ones(n) * sustain; ai = int(a * SR); ri = int(r * SR)
    if ai: e[:ai] = np.linspace(0, sustain, ai)
    if ri: e[-ri:] *= np.linspace(1, 0, ri)
    return e

def hiss(dur=2.0, lvl=.5):           # air escaping through a hole
    y = band_noise(dur, 2500, 9000); n = len(y)
    flutter = 1 + .25 * np.sin(np.linspace(0, dur * 2 * np.pi * 9, n))
    return y * env(n, .02, dur * .6) * flutter * lvl

def burst(lvl=.9):                   # suit rip / sudden decompression
    y = band_noise(.6, 600, 10000); n = len(y)
    return y * np.exp(-np.linspace(0, 7, n)) * lvl

def boom(lvl=.8):
    n = int(1.2 * SR); t = np.arange(n) / SR; f = 70 * np.exp(-t * 2.2) + 28
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3)
    return (y + .3 * band_noise(1.2, 30, 400) * np.exp(-t * 6)) * lvl

def whoosh(dur=1.2, lvl=.6):
    n = int(dur * SR); y = band_noise(dur, 200, 5000)
    shape = np.sin(np.linspace(0, np.pi, n)) ** 2
    lo = band_noise(dur, 80, 600)
    return (y * .6 + lo * .6) * shape * lvl

def heartbeat(lvl=.7):
    n = int(.9 * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for off, a in ((0, 1), (.28, .7)):
        tt = t - off; m = tt >= 0
        y[m] += a * np.sin(2 * np.pi * 52 * tt[m]) * np.exp(-tt[m] * 18)
    return y * lvl

def tick(lvl=.35):
    n = int(.05 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 160) + .5 * band_noise(.05, 3000, 8000) * np.exp(-t * 200)) * lvl

def beep(f=880, dur=.25, lvl=.3):
    n = int(dur * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * f * t) * env(n, .005, .05) * lvl

def alarm(dur=1.6, lvl=.25):
    n = int(dur * SR); t = np.arange(n) / SR
    f = np.where((t * 4).astype(int) % 2 == 0, 740, 560)
    return np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .5 * env(n, .01, .1) * lvl

def bubbles(dur=2.5, lvl=.35):
    n = int(dur * SR); y = np.zeros(n)
    for _ in range(int(dur * 22)):
        s = rng.integers(0, n - 4000); L = int(rng.uniform(.02, .06) * SR); tt = np.arange(L) / SR
        f0 = rng.uniform(500, 1400); y[s:s + L] += np.sin(2 * np.pi * (f0 * tt + 4000 * tt * tt)) * np.exp(-tt * 70)
    return y / (np.abs(y).max() + 1e-9) * lvl

def creak(dur=1.5, lvl=.3):
    n = int(dur * SR); t = np.arange(n) / SR; f = 60 + 25 * np.sin(2 * np.pi * .7 * t)
    saw = 2 * ((np.cumsum(f) / SR) % 1) - 1
    return saw * band_noise(dur, 100, 1500) ** 2 * env(n, .3, .4) * lvl * 2

def pop(lvl=.35):
    n = int(.12 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (300 * t + 2500 * t * t)) * np.exp(-t * 30) * lvl

def drone(dur, lvl=.12, base=55):    # low space hum
    n = int(dur * SR); t = np.arange(n) / SR
    y = sum(np.sin(2 * np.pi * (base * k) * t + k) / k for k in (1, 1.5, 2, 3))
    y *= 1 + .3 * np.sin(2 * np.pi * .08 * t)
    return (y / 2.5 + .25 * band_noise(dur, 40, 300)) * env(n, 1.0, 1.0) * lvl

def hum(dur, lvl=.1):                # old lab machinery hum (50 Hz mains)
    n = int(dur * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 50 * t) + .5 * np.sin(2 * np.pi * 100 * t) + .3 * band_noise(dur, 2000, 6000) * .2) * env(n, .2, .2) * lvl


def crowd(dur=3.0, lvl=.3):          # crowd murmur / panic
    n = int(dur * SR); t = np.arange(n) / SR; y = band_noise(dur, 250, 1800)
    mod = 1 + .5 * np.sin(2 * np.pi * 3.1 * t) * np.sin(2 * np.pi * 1.3 * t)
    return y * mod * env(n, .2, .4) * lvl

def clank(lvl=.5):                   # heavy metal door hit
    n = int(1.0 * SR); t = np.arange(n) / SR
    y = sum(np.sin(2 * np.pi * f * t) * np.exp(-t * k) for f, k in ((180, 6), (437, 9), (811, 14), (1290, 20)))
    return (y / 3 + .4 * band_noise(1.0, 100, 3000) * np.exp(-t * 30)) * lvl

def bark(lvl=.4):
    n = int(.25 * SR); t = np.arange(n) / SR; f = 520 * np.exp(-t * 4)
    return np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * band_noise(.25, 300, 3000) ** 0 * np.exp(-t * 14) * lvl * .5

def windroar(dur, lvl=.35):
    n = int(dur * SR); t = np.arange(n) / SR; y = band_noise(dur, 80, 2200) * .7 + band_noise(dur, 1500, 6000) * .3
    return y * (1 + .35 * np.sin(2 * np.pi * .6 * t)) * env(n, .3, 1.0) * lvl

def rumble(dur=2.0, lvl=.5):
    n = int(dur * SR); y = band_noise(dur, 25, 160); return y * env(n, .05, dur * .6) * lvl

SOUNDS = dict(crowd=crowd, clank=clank, bark=bark, rumble=rumble, hiss=hiss, burst=burst, boom=boom, whoosh=whoosh, heartbeat=heartbeat, tick=tick, beep=beep, alarm=alarm,
              bubbles=bubbles, creak=creak, pop=pop)

def main(tl_path, voice_path, cues_path, out):
    TL = json.load(open(tl_path)); cues = json.load(open(cues_path))
    v, vsr = sf.read(voice_path, dtype='float32')
    if v.ndim > 1: v = v.mean(1)
    v = np.interp(np.arange(0, len(v), vsr / SR), np.arange(len(v)), v).astype(np.float32)
    total = len(v); bed = np.zeros(total)
    def add(y, at):
        s = int(at * SR); e = min(total, s + len(y))
        if s < total: bed[s:e] += y[:e - s]
    starts = [s['start'] for s in TL['shots']]
    for c in cues:                       # cue: [shot, t, name, kwargs] or ["bed", shotA, shotB, kind, lvl]
        if c[0] == 'bed':
            _, a, b, kind, lvl = c; t0 = starts[a]; t1 = starts[b] + TL['shots'][b]['dur']
            add({'drone': drone, 'hum': hum, 'wind': windroar}[kind](t1 - t0, lvl), t0)
        else:
            shot, t, name = c[:3]; kw = c[3] if len(c) > 3 else {}
            add(SOUNDS[name](**kw), starts[shot] + t)
    # duck the sound bed while the narrator speaks
    win = int(.05 * SR); ve = np.convolve(np.abs(v), np.ones(win) / win, 'same')
    duck = 1 - .55 * np.clip(ve / (ve.max() * .25 + 1e-9), 0, 1)
    duck = np.convolve(duck, np.ones(win * 4) / (win * 4), 'same')
    mix = v * 1.0 + bed * duck * .55
    mix /= max(1.0, np.abs(mix).max() / .95)
    sf.write(out, mix.astype(np.float32), SR)

if __name__ == '__main__':
    main(*sys.argv[1:5])
