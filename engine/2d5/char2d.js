// 2.5D engine: flat outlined cut-out characters + layered backdrops (style of user's Nov 10 references)
import * as THREE from 'three';
export const OUT = '#3a2218';
const cache = new Map();
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect(x, y, w, h, r); }
export function drawChar(g, o, e = {}, p = {}) { // 512x768 canvas, feet at y=750
  const { skin = '#f0c9a4', hair = '#4a2f1e', top = '#f0b429', top2 = '#d99a1c', pants = '#3b4a6b', shoe = '#f2f2f2', style = 'short', glasses = false, hat = null } = o;
  const { brows = 'neutral', mouth = 'closed', eye = 1, tears = 0, look = 0 } = e; const { arms = 'down', back = false, step = 0 } = p;
  g.clearRect(0, 0, 512, 768); g.lineJoin = g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 9;
  const S = (f) => { g.fillStyle = f; g.fill(); g.stroke(); };
  // legs + shoes
  for (const s of [-1, 1]) { const dy = s * step * 14; rr(g, 256 + s * 44 - 30, 560, 60, 150 - Math.max(0, dy), 22); S(pants); rr(g, 256 + s * 44 - 40, 706 - Math.max(0, dy), 84, 40, 18); S(shoe); }
  // arms behind body
  const arm = (s, ang) => { g.save(); g.translate(256 + s * 112, 426); g.rotate(s * ang); rr(g, -30, -10, 60, 170, 28); S(top); g.beginPath(); g.arc(0, 168, 26, 0, 7); S(skin); g.restore(); };
  const A = { down: [.22, .22], up: [2.7, 2.7], point: [.12, 1.7], hug: [-.5, -.5], wave: [.12, 2.5] }[arms] || [.12, .12]; arm(-1, A[0]); arm(1, A[1]);
  // torso
  g.beginPath(); g.moveTo(150, 446); g.quadraticCurveTo(256, 398, 362, 446); g.lineTo(372, 590); g.quadraticCurveTo(256, 620, 140, 590); g.closePath(); S(top);
  if (!back) { g.save(); g.clip(); g.fillStyle = top2; g.fillRect(140, 540, 240, 90); g.restore(); g.beginPath(); g.moveTo(256, 462); g.lineTo(256, 600); g.stroke(); // zipper
    rr(g, 180, 500, 46, 36, 6); g.lineWidth = 5; g.stroke(); g.lineWidth = 9; g.beginPath(); g.moveTo(212, 424); g.lineTo(256, 462); g.lineTo(300, 424); g.stroke(); }
  // head
  const hx = 256, hy = 222, R = 158;
  if (style === 'long' || style === 'bun') { g.beginPath(); g.moveTo(hx - R - 4, hy - 10); g.quadraticCurveTo(hx - R - 22, hy + 150, hx - R + 26, hy + 196); g.quadraticCurveTo(hx - 70, hy + 150, hx - 60, hy + 60); g.lineTo(hx + 60, hy + 60); g.quadraticCurveTo(hx + 70, hy + 150, hx + R - 26, hy + 196); g.quadraticCurveTo(hx + R + 22, hy + 150, hx + R + 4, hy - 10); g.closePath(); S(hair); }
  if (!back) { rr(g, hx - 30, hy + R - 26, 60, 74, 16); S(skin); g.fillStyle = 'rgba(120,60,30,.22)'; g.fillRect(hx - 25, hy + R - 4, 50, 16); } // neck + chin shadow
  if (back && (style === 'long' || style === 'bun')) { g.beginPath(); g.moveTo(hx - R, hy); g.quadraticCurveTo(hx - R - 10, hy + 190, hx, hy + 215); g.quadraticCurveTo(hx + R + 10, hy + 190, hx + R, hy); g.closePath(); S(hair); }
  g.beginPath(); g.arc(hx, hy, R, 0, 7); S(back ? hair : skin);
  if (!back) {
    g.save(); g.beginPath(); g.arc(hx, hy, R - 4, 0, 7); g.clip(); g.fillStyle = 'rgba(120,60,30,.14)'; g.beginPath(); g.arc(hx + 150, hy + 120, R, 0, 7); g.fill(); g.restore(); // soft shadow tone
    // hair cap
    g.beginPath(); g.arc(hx, hy, R, Math.PI * 1.02, Math.PI * 1.98); g.quadraticCurveTo(hx + 60, hy - 60, hx - 20, hy - 82); g.quadraticCurveTo(hx - 110, hy - 70, hx - R, hy - 10); g.closePath(); S(hair);
    if (style === 'bun') { g.beginPath(); g.arc(hx, hy - R - 14, 46, 0, 7); S(hair); }
    if (hat) { g.beginPath(); g.arc(hx, hy - 30, R + 8, Math.PI, 0); g.closePath(); S(hat); rr(g, hx - R - 24, hy - 44, 2 * R + 48, 40, 18); S(hat); }
    // cheeks
    g.fillStyle = 'rgba(240,120,110,.35)'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(hx + s * 104, hy + 62, 30, 18, 0, 0, 7); g.fill(); }
    // eyes
    for (const s of [-1, 1]) { const ex = hx + s * 62 + look * 10, ey = hy + 14; g.fillStyle = '#2a1a12'; g.beginPath(); g.ellipse(ex, ey, 21, Math.max(3, 29 * eye), 0, 0, 7); g.fill();
      if (eye > .4) { g.fillStyle = '#fff'; g.beginPath(); g.arc(ex + 7, ey - 10 * eye, 7, 0, 7); g.fill(); }
      const by = ey - 56; g.lineWidth = 9; g.beginPath(); const t = { neutral: [0, 0], worried: [-s * -14, s * -14], angry: [s * -14, -s * -14], sad: [-14 * -s * s, 10] }[brows] || [0, 0];
      if (brows === 'worried') { g.moveTo(ex - 26, by + (s < 0 ? 12 : -10)); g.lineTo(ex + 26, by + (s < 0 ? -10 : 12)); } else if (brows === 'angry') { g.moveTo(ex - 26, by + (s < 0 ? -10 : 14)); g.lineTo(ex + 26, by + (s < 0 ? 14 : -10)); } else { g.moveTo(ex - 24, by); g.lineTo(ex + 24, by); } g.stroke();
      if (glasses) { g.lineWidth = 7; g.fillStyle = 'rgba(255,255,255,.18)'; g.beginPath(); g.arc(ex, ey, 46, 0, 7); g.fill(); g.stroke(); }
      if (tears) { g.fillStyle = '#9fd8ff'; rr(g, ex - 8, ey + 30, 16, 70 * tears, 8); g.fill(); } }
    if (glasses) { g.beginPath(); g.moveTo(hx - 16, hy + 14); g.lineTo(hx + 16, hy + 14); g.stroke(); }
    // mouth
    g.lineWidth = 8; const my = hy + 96; g.beginPath();
    if (mouth === 'open') { g.ellipse(hx, my, 22, 26, 0, 0, 7); g.fillStyle = '#7a2a2a'; g.fill(); g.stroke(); } else if (mouth === 'smile') { g.arc(hx, my - 14, 34, .15 * Math.PI, .85 * Math.PI); g.stroke(); } else if (mouth === 'frown') { g.arc(hx, my + 26, 30, 1.2 * Math.PI, 1.8 * Math.PI); g.stroke(); } else { g.moveTo(hx - 16, my); g.lineTo(hx + 16, my); g.stroke(); }
  }
}
export function makeChar2D(scene, opts) { const mat = new THREE.MeshBasicMaterial({ transparent: true, alphaTest: .05, fog: true }); const m = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.4), mat); m.geometry.translate(0, 1.2, 0);
  const sh = new THREE.Mesh(new THREE.CircleGeometry(.55, 24), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .28, depthWrite: false })); sh.rotation.x = -Math.PI / 2; sh.scale.y = .45; scene.add(sh); scene.add(m);
  const c = { m, sh, opts, set(e = {}, p = {}) { const key = JSON.stringify([opts, e, p]); let t = cache.get(key); if (!t) { const cv = document.createElement('canvas'); cv.width = 512; cv.height = 768; drawChar(cv.getContext('2d'), opts, e, p); t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; cache.set(key, t); } mat.map = t; mat.needsUpdate = true; },
    at(x, y, z, cam) { m.position.set(x, y, z); sh.position.set(x, y + .02, z); m.rotation.y = Math.atan2(cam.position.x - x, cam.position.z - z); } }; c.set(); return c; }
export function layer(scene, w, h, z, y, draw, { fog = true, opacity = 1 } = {}) { const cv = document.createElement('canvas'); cv.width = 2048; cv.height = Math.round(2048 * h / w); draw(cv.getContext('2d'), cv.width, cv.height); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, transparent: true, fog, opacity, depthWrite: false })); m.position.set(0, y + h / 2, z); scene.add(m); return m; }
export function skyGradient(scene, stops) { const cv = document.createElement('canvas'); cv.width = 16; cv.height = 512; const g = cv.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 512); stops.forEach(([p, c]) => gr.addColorStop(p, c)); g.fillStyle = gr; g.fillRect(0, 0, 16, 512); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; scene.background = t; }
