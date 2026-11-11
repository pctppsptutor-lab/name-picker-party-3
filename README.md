# Name Picker Party 3

Six more classroom name-picker mini-games (13–18), on the same engine and look as Name Picker Party 1 and 2.

## How to run

From this folder run `python -m http.server 8767` and open http://localhost:8767/ in Chrome or Edge.

| Game | How it works | Twist |
|---|---|---|
| 13 Penguin Overslide | Penguins belly-slide down ten ice lanes; whoever stops closest to the flag is picked. | The front-runner overshoots into the snow; a seal pops out of the ice and nudges someone else onto the flag. |
| 14 Secret Shell Swap | Students in shells scuttle sideways to the sandcastle. | The first shell to arrive is empty; a sea bubble pops and reveals the real winner in another shell. |
| 15 Alien Costume Party | Aliens watch a dance move, copy it, then freeze; the scanner picks the best pose. | A costume pops open with two tiny aliens in the wrong pose; the disco ball replays the last beat. |
| 16 Oversleeping Monsters | Each bed has its own bell sound and light; a bell rings again to pick its sleeper. | A monster jumps up sleepwalking after a fake bell; a pillow hits the real bell. |
| 17 Cat Cafe Mix-Up | The cake is passed along the serving line to the table. | The cake grows legs and runs off; the cat manager blocks it and pushes it onto another tray. |
| 18 Recycling Truck Mix-Up | The truck scans each bin; the lit bin picks its student. | A toy spring pops out and flags an error; a metal can rolls past the sensor and lights the real bin. |

Rounds last 7 or 10 seconds. Plot Twist is off by default and can be enabled in Settings. The winner is chosen when you press Pick.


## Sound effects

Game-specific MP3 effects load only for the selected game and use the existing Sound toggle and SFX volume. Credits and edit details are in `assets/sfx/credits.html` and `assets/sfx/sources.json`.

Run the dependency-free audio lifecycle checks with `node tests/sfx.test.cjs`.

Each game streams its own Kevin MacLeod BGM from `assets/bgm/` after a user gesture. Music credits and CC BY 4.0 sources are in `assets/bgm/credits.html`. Short action/result jingles retain VCSL samples; foreground effects briefly lower the music.

Regression checks: `node tests/core.test.cjs` and `node tests/sw.test.cjs`. A BGM becomes available offline after that game’s track has loaded once.
