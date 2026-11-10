const { chromium } = require('playwright');
const { spawn } = require('child_process'); const fs = require('fs');
const [mode, a, b, out] = process.argv.slice(2);
(async () => {
  const br = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await br.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.error('PAGEERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.error('PAGE', m.text()); });
  await p.goto('http://localhost:8134/index.html'); await p.waitForFunction(() => window.ready === true, null, { timeout: 180000 });
  if (mode === 'still') {
    for (const t of a.split(',').map(Number)) { await p.evaluate(t => window.renderAt(t), t); await p.screenshot({ path: `still_${t}.jpg`, type: 'jpeg', quality: 80 }); }
  } else {
    const f0 = +a, f1 = +b, tmp = out + '.part.mp4';
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', '30', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    for (let k = f0; k < f1; k++) {
      await p.evaluate(t => window.renderAt(t), k / 30);
      const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if ((k - f0) % 150 === 0) console.log(`${out}: ${k - f0}/${f1 - f0} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', c => { if (c === 0) fs.renameSync(tmp, out); r(); }));
  }
  await br.close();
})();
