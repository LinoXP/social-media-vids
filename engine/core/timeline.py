import json, re
from script import L
meta = json.load(open('meta.json'))
RED = {"disappeared?", "out.", "flood", "fall.", "forever."}
CHIP = {0:"",1:"PEOPLE LEFT: 1",16:""}
SPEED = {0:"0 H",2:"1 H",3:"DAY 2",6:"36 H",9:"1 YEAR",12:"20 YEARS",13:"300 YEARS",15:"NOW"}
shots, t, chip, spd = [], 0.0, "", "?"
for i, ((who, text, setups), m) in enumerate(zip(L, meta)):
    chip = CHIP.get(i, chip); spd = SPEED.get(i, spd)
    toks = re.sub(r'[\[\]]', '', text).split(); hot = set()
    for g in re.findall(r'\[([^\]]+)\]', text): hot |= {w.lower().strip('.,') for w in g.split()}
    ww = m['words']
    if len(ww) == len(toks): times = [w[1] for w in ww]
    else:
        a0, a1 = (ww[0][1], ww[-1][2]) if ww else (0.05, m['dur'] - .2); lens = [len(x) + 1 for x in toks]; tot = sum(lens); acc = 0; times = []
        for n in lens: times.append(a0 + (a1 - a0) * acc / tot); acc += n
    cards, cur = [], []
    for j, tk in enumerate(toks):
        cur.append(j)
        if len(cur) == 2 or re.search(r'[.,!?:]$', tk): cards.append(cur); cur = []
    if cur: cards.append(cur)
    cc = []
    for c in cards:
        ws = []
        for j in c:
            k = toks[j].lower(); ks = k.strip('.,!?:')
            col = '#ff4058' if k in RED or ks in RED else '#ffc43c' if (ks in hot or re.search(r'\d', k)) else '#f5f5fa'
            ws.append([toks[j].upper(), col])
        cc.append([times[c[0]], ws])
    n = len(setups); cuts = [m['dur'] * k / n for k in range(n)]
    shots.append(dict(start=t, dur=m['dur'], who=who, setups=setups, cuts=cuts, cards=cc, chip=chip, speed=spd)); t += m['dur']
json.dump(dict(shots=shots, total=t), open('timeline.json', 'w'))
gaps = [s['dur'] / len(s['setups']) for s in shots]; import statistics
print('total', round(t, 1), 'setups', sum(len(s['setups']) for s in shots), 'median setup', round(statistics.median(gaps), 2), 'max', round(max(gaps), 2))
