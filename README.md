# Focus & Dash

Two zero-dependency, single-file web apps. No build step, no npm install — just open in a browser.

## 🌐 Live

- Focus → https://dannybyarun.github.io/focus-dash/
- Dash → https://dannybyarun.github.io/focus-dash/dashboard/

## 🍅 Focus — Pomodoro + Task List
`index.html`

- 25 min focus / 5 min break, long break every 4th session, beep on completion
- Task list with a "focus" mode — finished pomodoros attach to the active task as 🍅
- Persists tasks + daily session count in localStorage, shows time left in the tab title

## 📊 Dash — Live Data Dashboard
`dashboard/index.html`

20 cards fed by free, keyless public APIs (auto-refresh + retry on failure, light/dark theme):

Weather + hourly forecast & air quality · rocket launches · earthquakes · live ISS map · crypto · Fear & Greed gauge · exchange rates + converter · Hacker News · dev.to · GitHub profile · public holidays · world clocks · history "on this day" · trivia · quote · advice · joke · animal break · word of the day

## Run

```bash
python3 -m http.server 8000
```

- Focus → http://localhost:8000/
- Dash → http://localhost:8000/dashboard/

Both also work straight from the file system (double-click the HTML) and store settings locally in your browser.
