import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as topojson from 'topojson-client';

await document.fonts.load('60px AN'); await document.fonts.load('30px IB');
const TL = await (await fetch('timeline.json')).json();
const W = 1080, H = 1920;
const ease = x => { x = Math.min(1, Math.max(0, x)); return 1 - (1 - x) ** 3; };
const eio = x => { x = Math.min(1, Math.max(0, x)); return x < .5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2; };
const back = x => { x = Math.min(1, Math.max(0, x)); const c = 1.7; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2; };
const win = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
const lerp = (a, b, k) => a + (b - a) * k;
const V = (x, y, z) => new THREE.Vector3(x, y, z);
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const LS = i => TL.shots[i].start, LE = i => TL.shots[i].start + TL.shots[i].dur;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gl'), antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(W, H, false);
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1; renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
const SKY = new THREE.Color(0x8fd0ff), DUST = new THREE.Color(0xb59a7c);
scene.background = SKY.clone(); scene.fog = new THREE.Fog(0x8fd0ff, 60, 220);
const camera = new THREE.PerspectiveCamera(42, W / H, 0.05, 900);
const lam = (c, o = {}) => new THREE.MeshLambertMaterial({ color: c, ...o });
const std = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: .7, metalness: .05, ...o });
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; }
function label(text, { size = 90, color = '#fff', bg = 'rgba(10,12,20,.85)', w = 1024, h = 200, scale = 1 } = {}) {
  const tex = canvasTex(w, h, (g) => { g.fillStyle = bg; g.beginPath(); g.roundRect(6, 6, w - 12, h - 12, 40); g.fill();
    g.font = `${size}px AN`; g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, w / 2, h / 2 + 4); });
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false })); s.scale.set(scale * w / h, scale, 1); s.renderOrder = 20; return s;
}
const sun = new THREE.DirectionalLight(0xfff2dc, 2.6); sun.position.set(40, 60, 30); scene.add(sun);
const hemi = new THREE.HemisphereLight(0xcfe8ff, 0x6a7a4a, 1.2); scene.add(hemi);

