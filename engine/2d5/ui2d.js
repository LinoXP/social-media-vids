// Reusable designed-screen inserts (DOM). Each returns an HTML string for a full-frame overlay div (#ui).
// Usage: ui.innerHTML = UI.dashboard({...}); ui.style.display='block'. All take plain data so shots stay pure functions of time.
export const CSS = `
#ui{position:absolute;inset:0;display:none;font-family:AN;color:#dff;letter-spacing:2px}
.scr{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#0d2430,#050b12)}
.scr.red{background:radial-gradient(ellipse at 50% 40%,#5a0d18,#1a0508)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(120,220,220,.06) 2px,transparent 2px),linear-gradient(90deg,rgba(120,220,220,.06) 2px,transparent 2px);background-size:60px 60px}
.pnl{position:absolute;border:3px solid rgba(110,230,210,.55);border-radius:22px;background:rgba(6,20,26,.8);padding:26px 30px;box-sizing:border-box}
.red .pnl{border-color:rgba(255,90,100,.7);background:rgba(40,6,10,.8)}
.pnl small{display:block;font-size:26px;color:#6fd8c8;letter-spacing:5px}.red .pnl small{color:#ff8a94}
.pnl b{font-weight:normal;font-size:120px;color:#fff;line-height:1.05}
.pnl u{text-decoration:none;font-size:40px;color:#9fb}
.barb{height:44px;border-radius:10px;background:#40dcc8;margin-top:12px}
.cam i{position:absolute;width:70px;height:70px;border:6px solid #fff}
.cam span{position:absolute;white-space:nowrap;font-size:34px;color:#fff;letter-spacing:4px;text-shadow:0 2px 6px #000}
.phone{position:absolute;left:190px;top:330px;width:700px;height:1150px;border-radius:70px;background:#10182a;border:10px solid #2a3550;box-shadow:0 30px 80px rgba(0,0,0,.6)}
.phone .t{font-size:150px;text-align:center;margin-top:120px;color:#fff}
.phone .m{position:absolute;left:60px;right:60px;bottom:220px;background:#2f7bff;border-radius:34px;padding:30px 36px;font-family:IB,sans-serif;font-size:44px;color:#fff;letter-spacing:0}
.warn{position:absolute;left:110px;right:110px;top:560px;border-radius:26px;background:#2a0508;border:6px solid #ff4058;text-align:center;padding:50px 20px}
.warn .h{font-size:130px;color:#fff;line-height:1.05}.warn .s{font-size:36px;color:#ff9aa4;letter-spacing:6px;margin-top:16px}
.stripes{position:absolute;left:0;right:0;height:44px;background:repeating-linear-gradient(-45deg,#ffc43c 0 40px,#1a1206 40px 80px)}
`;
const wave = (seed, n = 60, amp = 1) => { let p = ''; for (let i = 0; i <= n; i++) { const y = 50 - amp * (Math.sin(i * .9 + seed) * 18 + (i % 9 === 4 ? 38 : 0) - (i % 9 === 5 ? 22 : 0)); p += (i ? 'L' : 'M') + (i / n * 100).toFixed(1) + ' ' + y.toFixed(1); } return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:220px"><path d="${p}" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`; };
export const UI = {
  // 2x2 stat dashboard + status line. stats: [{label,value,unit}] (up to 4), t = seconds for animated line
  dashboard: ({ stats = [], status = 'ANALYZING..', red = false, t = 0 }) => `<div class="scr ${red ? 'red' : ''}"><div class="grid"></div>${stats.slice(0, 4).map((s, i) => `<div class="pnl" style="left:${60 + (i % 2) * 490}px;top:${330 + Math.floor(i / 2) * 520}px;width:470px;height:500px"><small>${s.label}</small><b>${s.value}</b> <u>${s.unit || ''}</u><div style="color:${red ? '#ff6a78' : '#40dcc8'}">${wave(t * 6 + i * 2, 60, i % 2 ? .5 : 1)}</div></div>`).join('')}<div class="pnl" style="left:60px;right:60px;top:1380px;text-align:center;font-size:56px;color:${red ? '#fff' : '#6fd8c8'};${red ? 'background:#c0283a' : ''}">${status}</div></div>`,
  // one huge number with label and optional progress bar (k 0..1)
  bigStat: ({ label, value, sub = '', k = null, red = false }) => `<div class="scr ${red ? 'red' : ''}"><div class="grid"></div><div class="pnl" style="left:80px;right:80px;top:560px"><small>${label}</small><b style="font-size:190px">${value}</b>${k !== null ? `<div style="background:rgba(255,255,255,.12);border-radius:10px;margin-top:20px"><div class="barb" style="width:${Math.round(k * 100)}%;${red ? 'background:#ff4058' : ''}"></div></div>` : ''}<u style="display:block;margin-top:18px">${sub}</u></div></div>`,
  // horizontal comparison bars: rows [{label,value,k,color}]
  bars: ({ title, rows = [] }) => `<div class="scr"><div class="grid"></div><div class="pnl" style="left:70px;right:70px;top:480px"><small>${title}</small>${rows.map(r => `<div style="margin-top:44px;font-size:48px;color:#fff">${r.label} <span style="float:right;color:${r.color || '#40dcc8'}">${r.value}</span><div class="barb" style="width:${Math.round(r.k * 100)}%;background:${r.color || '#40dcc8'}"></div></div>`).join('')}</div></div>`,
  // security-camera overlay on top of the 3D scene (transparent)
  cam: ({ name = 'CAM 01', zoom = '', stamp = '' }) => `<div class="cam" style="position:absolute;inset:300px 50px 480px 50px"><i style="left:0;top:0;border-right:0;border-bottom:0"></i><i style="right:0;top:0;border-left:0;border-bottom:0"></i><i style="left:0;bottom:0;border-right:0;border-top:0"></i><i style="right:0;bottom:0;border-left:0;border-top:0"></i><span style="left:34px;top:24px">${name}${zoom ? ` &nbsp;<span style="color:#6fd8c8">ZOOM ${zoom}</span>` : ''}</span><span style="right:34px;top:24px"><span style="color:#ff4058">●</span> REC</span><span style="left:0;right:0;bottom:24px;text-align:center">${stamp}</span></div>`,
  phone: ({ time = '02:47', msg = '', status = 'SENDING...' }) => `<div class="scr" style="background:radial-gradient(ellipse at 50% 40%,#3a2a1e,#120c08)"><div class="phone"><div class="t">${time}</div><div class="m">${msg}<div style="font-family:AN;font-size:24px;letter-spacing:4px;opacity:.7;margin-top:14px;text-align:right">${status}</div></div></div></div>`,
  warning: ({ head, sub = '' }) => `<div class="scr red"><div class="stripes" style="top:380px"></div><div class="warn"><div style="font-size:150px;color:#ffc43c">⚠</div><div class="h">${head}</div><div class="s">${sub}</div></div><div class="stripes" style="top:1330px"></div></div>`,
  // "YOU CHOSE A/B" opener for part 2+
  chose: ({ letter, text, part }) => `<div class="scr red" style="opacity:.82"></div><div style="position:absolute;left:0;right:0;top:330px;text-align:center"><div style="font-size:120px;color:#fff">YOU CHOSE <span style="color:#ff4058">${letter}</span></div><div style="font-size:44px;color:#fff;letter-spacing:6px">${text}</div><div style="display:inline-block;margin-top:18px;background:#ffc43c;color:#1a1206;border-radius:30px;padding:6px 30px;font-size:36px">PART ${part}</div></div>`,
};
