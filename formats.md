# Format scoreboard

How formats are tested:
- Every format gets **3 tries** before it is judged.
- **Score:** average % of the video watched on TikTok and Instagram (Buffer stats), compared with the average of all our videos from the same week.
- YouTube "Viewed vs. swiped away" is added whenever a screenshot is available.
- After 3 tries:
  - Below the week's average → **ARCHIVED**. The format is no longer made, but stays on file.
  - Above average → **KEPT**. It stays in rotation until a newer format beats it.
- About 1 in 3 new videos is an experiment (a new format or a re-test). The rest come from KEPT formats.
- Fixed for every video (not tested): strong first frame, voice from 0.0 s, question on screen from frame 1, loop ending, ≥60 s.

## Current status (updated 2026-11-26)

| Format | Status | Tries (new hook rules) | TikTok % watched | Instagram % watched | Notes |
|---|---|---|---|---|---|
| Escalation ladder (louder, hotter, deeper, …) | KEPT (best) | 0 | 19–28% | 42–44% | Most views on IG (~1,300) and YT (~1,100) |
| A/B survival (Part 1, vote) | KEPT (watch) | 0 | 10–17% | 23–70% | Station leak held 70% on IG |
| Build a ___ from scratch | PROBATION | 0 | 17–28% | 11–22% | Low views |
| Invent the ___ | PROBATION | 0 | 13% | 36% | Low views. Last chance with the measured rules below ("invent v2"), Nov 27 toilet |
| Minute by minute (timer) | TESTING | 0 | – | – | New, first: ice lake (Nov 24) |
| World-scale "What if" story | RE-TEST | 0 | – | – | Old format; "Sun went out" is top YT Short (1,346). Re-test: asteroid (Nov 24) |
| Ranking countdown (5 → 1) | TESTING | 0 | – | – | New, first: coldest places (Nov 26) |
| Weird choice that was right | TESTING | 0 | – | – | New: mocked choice, proven right in the last seconds. First: Imperial Hotel 1923 (Nov 27) |

## Ideas waiting to be tested
- Size zoom (ant → largest star, size counter)
- Myth or true? (5 quick claims)
- Real disaster rebuilt (security-camera look, real dates)
- Guess the number (answer only in the last second)

## Script and production rules (adapted 2026-11-26 from github.com/fahniazz/claude-shorts-skills, MIT)
**Weird choice that was right:** weird act + number in the first 3 s; stakes and a danger planted early that returns at the climax; the doubter gets the only 2 dialogue lines; the hero loses or is mocked first; a 2-step proof with everyday objects; never name the science term (let comments name it); superlative climax; no outro, end on the impact so it loops.
**Invent v2 ("How you invented X"):** second person; lines alternate So / But / Except, never "and then"; one enemy for the whole ladder, each attack smarter; every failure physical and drawable, every fix = verb + material + place; a false relief ("Much better.") before the next failure; name every second rung; one twist line ("That bend isn't there by mistake"); a list of three where the third is a funny real fact; last line "Congratulations, you invented the ___"; one set that grows, pull back to the finished object at the end.
**Every video:** ~185 words (= about 62-66 s at our voice speed); frame 0 already moving, with no pop-in starting from size 0; characters never frozen (breathing, sway, blinks); every hold creeps in; expression changes land on the word; each sound effect at most twice, peaks on the impact frame; music drops out briefly at the twist; captions never end on a glue word or split a name.

## Log
| Date | Video | Format | TikTok % | IG % | YT views | Result |
|---|---|---|---|---|---|---|
| 2026-11-24 | gravity_ladder | Ladder (try 1, new hooks) | 28% | 37% | 1,033 | Above avg (TT avg ~15%, IG ~29%) |
| 2026-11-24 | ice_minutes | Minute by minute (try 1) | 18% | 21% | (Wed) | TT above, IG below |
| 2026-11-24 | asteroid_story | Story re-test (try 1) | 17% | 102% (replays) | 559 | Above avg |
| 2026-11-25 | wind_ladder | Ladder (try 2) | | | | |
| 2026-11-25 | yellowstone_story | Story (try 2) | | | | |
| 2026-11-25 | sea_ab | A/B (new hook rules, try 1) | | | | |
| 2026-11-26 | coffee_ladder | Ladder (try 3) | | | | |
| 2026-11-26 | coldest_ranking | Ranking (NEW, try 1) | | | | |
| 2026-11-26 | plane_minutes | Minute-by-minute (try 2) | | | | |
| 2026-11-27 | hotel_weird | Weird choice (NEW, try 1) | | | | |
| 2026-11-27 | toilet_invent | Invent v2 (try 1) | | | | |
| 2026-11-27 | gforce_ladder | Ladder (try 4) | | | | |

Baseline (Nov 20–23, full-length videos, old hooks): TikTok ~15% watched, Instagram ~29%. First-day numbers; re-check after 3 days.
