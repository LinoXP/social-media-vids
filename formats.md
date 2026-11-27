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
| Escalation ladder (louder, hotter, deeper, …) | KEPT (best) | 4 | 18–32% | 28–38% | Most views on IG (~1,300) and YT (~1,100) |
| A/B survival (Part 1, vote) | KEPT (watch) | 1 | 10–17% | 23–70% | Station leak held 70% on IG |
| Build a ___ from scratch | PROBATION | 0 | 17–28% | 11–22% | Low views |
| Invent the ___ | PROBATION | 0 | 13% | 36% | Low views. Last chance with the measured rules below ("invent v2"), Nov 27 toilet |
| Minute by minute (timer) | AT RISK | 2 | 9–18% | 15–21% | Both tries at or below average; try 3 decides |
| World-scale "What if" story | RE-TEST | 2 | 17% | 26–102% | Old format; "Sun went out" is top YT Short (1,346). Re-test: asteroid (Nov 24) |
| Ranking countdown (5 → 1) | TESTING | 1 | 19% | 23% | New, first: coldest places (Nov 26) |
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
| 2026-11-25 | wind_ladder | Ladder (try 2) | 32% | 38% | 771 | Best so far |
| 2026-11-25 | yellowstone_story | Story (try 2) | 17% | 26% | failed (limit), Mon | Middle |
| 2026-11-25 | sea_ab | A/B (new hook rules, try 1) | 15% | 24% | (Fri) | Below |
| 2026-11-26 | coffee_ladder | Ladder (try 3) | 18% | 28% | (Fri) | IG 1,184 views, most likes this week |
| 2026-11-26 | coldest_ranking | Ranking (NEW, try 1) | 19% | 23% | (Sat) | TT above, IG below (82 s long) |
| 2026-11-26 | plane_minutes | Minute-by-minute (try 2) | 9% | 15% | (Sat) | Worst this week |
| 2026-11-27 | hotel_weird | Weird choice (NEW, try 1) | | | | |
| 2026-11-27 | toilet_invent | Invent v2 (try 1) | | | | |
| 2026-11-27 | gforce_ladder | Ladder (try 4) | | | | |
| 2026-11-28 | breath_ladder | Ladder (try 5) | | | | |
| 2026-11-28 | car_minutes | Minute-by-minute (try 3, decides) | | | | |
| 2026-11-28 | animals_ranking | Ranking (try 2) | | | | |

YouTube schedule (from Nov 27): one post every 12.5 h (rolling 24 h limit = max 2; fixed 08/20 made every 3rd post fail).

Baseline (Nov 20–23, full-length videos, old hooks): TikTok ~15% watched, Instagram ~29%. First-day numbers; re-check after 3 days.
