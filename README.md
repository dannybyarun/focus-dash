# Focus & Dash

A zero-dependency, single-file web app suite. No build step, no npm install — just open in a browser.

## 🌐 Live

- PocketOS launcher → https://dannybyarun.github.io/focus-dash/apps.html
- Focus → https://dannybyarun.github.io/focus-dash/
- Dash → https://dannybyarun.github.io/focus-dash/dashboard/

## 🍅 Focus — Pomodoro + Task List
`index.html`

- 25 min focus / 5 min break, long break every 4th session, beep on completion
- Task list with a "focus" mode — finished pomodoros attach to the active task as 🍅
- Persists tasks + daily session count in localStorage, shows time left in the tab title

## 📊 Dash — Live Data Dashboard
`dashboard/index.html`

25 cards fed by free, keyless public APIs (auto-refresh + retry on failure, light/dark theme):

Weather + hourly forecast & air quality · rocket launches · earthquakes · live ISS map · crypto · Fear & Greed gauge · exchange rates + converter · Hacker News · dev.to · GitHub profile · public holidays · world clocks · history "on this day" · trivia · quote · advice · joke · animal break · word of the day · recipe of the day · music finder · book finder · chess stats · QR share

## 📱 PocketOS Apps
`apps.html` — launcher for the six single-file apps below. Each saves to localStorage, no backend.

| App | File | What it does |
|---|---|---|
| 🎮 Arcade | `games/index.html` | 2048, Snake, Memory match |
| 📈 Folio | `crypto/index.html` | Crypto portfolio tracker (live prices, P&L, net worth) |
| 🧾 Split | `splitter/index.html` | Expense splitter — who owes whom, settle-up |
| 🃏 Cards | `flashcards/index.html` | Spaced-repetition flashcards (SM-2) |
| 📝 Notes | `notes/index.html` | Quick scratchpad notes |
| 👤 Me | `me/index.html` | Your profile, bio & links |

Shared theme lives in `shared.css` (light/dark toggle support).

## Run

```bash
python3 -m http.server 8000
```

- Focus → http://localhost:8000/
- Apps → http://localhost:8000/apps.html
- Dash → http://localhost:8000/dashboard/

All apps also work straight from the file system (double-click the HTML) and store settings locally in your browser.