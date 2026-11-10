h=open('_head.js').read().replace("import * as topojson from 'topojson-client';\n","")
c=open('_chars.js').read().replace("c.g.position.y = run ? Math.abs(Math.sin(t * 12)) * .12 : 0;","if (run) c.g.position.y += Math.abs(Math.sin(t * 12)) * .12;")
u=open('_hud.js').read().replace("const head = c => c.g.position.clone().add(V(0, 2.0, 0));","const head = c => { c.g.updateMatrixWorld(true); return c.head.getWorldPosition(new THREE.Vector3()); };")
w=open('_world.js').read().replace(".add(boat.position)","")
r='''
window.renderAt = T => {
  let si = 0; for (let i = 0; i < TL.shots.length; i++) if (T >= TL.shots[i].start) si = i; curSi = si;
  const s = TL.shots[si], t = T - s.start; speaker = s.who; lineT = t; lineD = s.dur;
  let k = 0; for (let j = 0; j < s.cuts.length; j++) if (t >= s.cuts[j]) k = j;
  const st = t - s.cuts[k], sd = (k + 1 < s.cuts.length ? s.cuts[k + 1] : s.dur) - s.cuts[k];
  world(T); S[s.setups[k]](st, sd, T); hud(si, t, T);
  
  renderer.render(scene, camera);
};
window.TOTAL = TL.total; window.ready = true;
'''
open('scene.js','w').write(h+c+u+w+r)
