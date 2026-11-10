import json, re, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
from faster_whisper import WhisperModel
from script import L, VOICE
k = Kokoro("/home/claude/tts/model.onnx", "/home/claude/tts/voices.bin")
wm = WhisperModel('base.en', device='cpu', compute_type='int8')
out, meta = [], []
for who, text, setups in L:
    v, sp = VOICE[who]
    a, sr = k.create(re.sub(r'[\[\]]', '', text), voice=v, speed=sp, lang="en-us")
    tail = .12 if who != "N" else .2
    a = np.concatenate([np.zeros(int(sr * .04), a.dtype), a, np.zeros(int(sr * tail), a.dtype)]).astype(np.float32)
    a16 = np.interp(np.arange(0, len(a), sr / 16000), np.arange(len(a)), a).astype(np.float32)
    segs, _ = wm.transcribe(a16, word_timestamps=True, language='en')
    words = [(w.word.strip(), w.start, w.end) for s in segs for w in s.words]
    meta.append(dict(dur=len(a) / sr, words=words)); out.append(a)
sf.write("voice.wav", np.concatenate(out), sr); json.dump(meta, open("meta.json", "w"))
print(round(sum(m['dur'] for m in meta), 1), [round(m['dur'], 1) for m in meta])
