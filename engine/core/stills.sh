cd /home/claude/v13
TS=$(python3 -c "
import json;tl=json.load(open('timeline.json'));o=[]
for sh in tl['shots']:
  c=sh['cuts']+[sh['dur']]
  for k in range(len(sh['setups'])): o.append(round(sh['start']+(c[k]+c[k+1])/2,2))
print(','.join(map(str,o)))")
rm -f still_*.jpg; timeout 600 node render.js still "$TS" 0 x 2>&1 | grep -i error | head
python3 - <<'P'
from PIL import Image
import glob
fs=sorted(glob.glob('still_*.jpg'),key=lambda f:float(f[6:-4]))
for n in range(0,50,25):
  g=Image.new('RGB',(5*216,5*384))
  for i,f in enumerate(fs[n:n+25]): g.paste(Image.open(f).resize((216,384)),((i%5)*216,(i//5)*384))
  g.save(f'sheet{n//25}.jpg')
P
