# What If? video engine (asset template)

Reuse these instead of rebuilding per video. Copy `engine/` into a work dir, `npm i three playwright`, serve with `python3 -m http.server`.

## engine/2d5 (current art style: flat 2D cut-outs in 3D space)
- `char2d.js`
  - `makeChar2D(scene, opts)` -> `{set(expr, pose), at(x,y,z,camera)}`. Billboard cut-out with ground shadow; textures cached per (opts, expr, pose).
    - opts: `skin, hair, top, top2, pants, shoe, style: 'short'|'long'|'bun', glasses, hat`
    - expr: `brows: neutral|worried|angry`, `mouth: closed|open|smile|frown`, `eye` (0..1.3, 0 = closed), `tears` (0..1), `look` (-1..1)
    - pose: `arms: down|up|point|hug|wave`, `back: true` (back view), `step` (-1..1 walk cycle)
  - Cast: Maya `{top:'#2fbf9f',top2:'#27a488',hair:'#4a2f1e',style:'bun'}`; Sam `{top:'#6a7a3a',top2:'#5a6a30',hair:'#2a1a10',hat:'#f08a1a',skin:'#e8b48c',pants:'#2a2d3a'}`
  - `skyGradient(scene, [[stop,color],...])`, `layer(scene, w, h, z, y, draw(g,w,h), {fog})` for parallax backdrop planes.
- `ui2d.js`: designed screen inserts as HTML strings for the `#ui` overlay: `UI.dashboard`, `UI.bigStat`, `UI.bars`, `UI.cam`, `UI.phone`, `UI.warning`, `UI.chose`. Add `CSS` to the page once.
- `proto.html` / `dbg.js`: working example scene + screenshot script. First frame takes ~40 s to warm up in SwiftShader, then ~0.8 s per frame.

## engine/core (pipeline, unchanged between videos)
`script.py` (L = [(who, text, [setups])]) -> `tts.py` (Kokoro) -> `timeline.py` (captions, cuts, HUD pills) -> scene JS with `window.renderAt(T)` -> `render.js frames a b out.mp4` -> `sfx.py timeline.json voice.wav cues.json mix.wav` -> ffmpeg mux.

Rules: every shot pure function of time; hide other sets per shot; render stills of every setup and check them before the full render.
