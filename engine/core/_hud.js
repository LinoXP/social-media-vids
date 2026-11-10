// ================= HUD =================
const $ = id => document.getElementById(id);
let lastCap = '', lastChip = '', lastSpd = '', lastRo = '';
function hud(si, t, T) {
  const s = TL.shots[si];
  if (s.speed !== lastSpd) { $('spdv').textContent = s.speed; lastSpd = s.speed; }
  $('spdv').style.color = s.speed === 'STOPPED' ? '#ff4058' : '#f5f5fa';
  if (s.chip !== lastChip) { $('chipv').textContent = s.chip; lastChip = s.chip; }
  $('chip').style.display = s.chip && T > 2.2 ? 'block' : 'none';
  $('chipv').style.borderColor = /1 MIN|0:00/.test(s.chip) ? '#ff4058' : 'rgba(255,255,255,.2)'; $('chipv').style.color = /1 MIN|0:00/.test(s.chip) ? '#ff4058' : '#f5f5fa';
  $('title').style.display = T < 2.3 ? 'block' : 'none'; $('title').style.opacity = 1 - win(T, 2.0, 2.3); $('spd').style.display = T < 2.3 ? 'none' : 'block';
  let cur = null; for (const c of s.cards) if (t >= c[0] - .05) cur = c;
  if (cur) { const key = si + ':' + cur[0]; if (key !== lastCap) { $('cap').innerHTML = cur[1].map(([w, c]) => `<span style="color:${c}">${w}</span>`).join(' '); lastCap = key; }
    const k = ease((t - cur[0] + .05) / .1); $('cap').style.opacity = 1; $('cap').style.transform = `translateY(${(1 - k) * 14}px) scale(${.92 + .08 * k})`; } else $('cap').style.opacity = 0;
  $('who').textContent = s.who === 'M' ? 'MAYA' : s.who === 'S' ? 'SAM' : ''; $('who').style.color = s.who === 'M' ? '#40dcc8' : '#ff9a3c';
}
function readout(txt, sub, t) { if (!txt) { $('readout').style.display = 'none'; return; } $('readout').style.display = 'block';
  const key = txt + sub; if (key !== lastRo) { $('rov').innerHTML = (sub ? `<small>${sub}</small>` : '') + txt; lastRo = key; } $('readout').style.transform = `scale(${back(t / .3)})`; }
function fx({ flash = 0, red = 0, dark = 0, dust = 0 }) { const L = [];
  if (flash > 0) L.push(`linear-gradient(rgba(255,255,255,${flash}),rgba(255,255,255,${flash}))`);
  if (red > 0) L.push(`linear-gradient(rgba(255,30,60,${red}),rgba(255,30,60,${red}))`);
  if (dust > 0) L.push(`linear-gradient(rgba(150,110,70,${dust}),rgba(150,110,70,${dust}))`);
  if (dark > 0) L.push(`radial-gradient(ellipse at 50% 45%, rgba(0,0,0,${dark * .3}) 20%, rgba(0,0,0,${dark}) 80%)`);
  $('fx').style.background = L.join(','); }
function ab(w, t) { for (const k of ['A', 'B']) { const el = $('ab' + k); el.style.display = w === k ? 'flex' : 'none'; if (w === k) el.style.transform = `scale(${back(t / .35)})`; } }
let shakeAmt = 0;
function look(pos, target) { camera.position.copy(pos); if (shakeAmt) camera.position.add(V(Math.sin(performance.now()) * 0, 0, 0)); camera.lookAt(target); }
function shake(T, a) { camera.position.x += Math.sin(T * 61) * a; camera.position.y += Math.cos(T * 47) * a; }
const head = c => c.g.position.clone().add(V(0, 2.0, 0));

