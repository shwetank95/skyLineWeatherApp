# Skyline — Weather

A single-page weather app built with React, Vite, Tailwind CSS, and the
[WeatherAPI](https://www.weatherapi.com/) `forecast.json` endpoint. No login,
no accounts — just search a city (or use your location) and see current
conditions, a 24-hour day/night sky strip, hourly forecast, and a 5-day
outlook.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get a free API key from [weatherapi.com](https://www.weatherapi.com/) and
   create a `.env` file at the project root:
   ```bash
   cp .env.example .env
   ```
   Then paste your key into `.env`:
   ```
   VITE_WEATHERAPI_KEY=your_api_key_here
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project structure

```
src/
  components/
    SearchBar.jsx        search input + geolocation button
    WeatherCard.jsx       hero: big temp, condition, high/low
    SkyStrip.jsx          signature 24hr day/night gradient + sun position
    DetailsGrid.jsx       humidity, wind, UV, pressure readout
    HourlyForecast.jsx    scrollable next-12-hours strip
    DailyForecast.jsx     5-day outlook list
  hooks/
    useWeather.js         fetch logic for WeatherAPI forecast.json
  App.jsx
  main.jsx
  index.css
```

## Notes

- The API key is read from `import.meta.env.VITE_WEATHERAPI_KEY` — Vite only
  exposes env vars prefixed with `VITE_` to client code.
- `forecast.json?days=5` returns current conditions, astro (sunrise/sunset),
  hourly, and daily data in a single request, which is what `useWeather.js`
  relies on.
- "Use my location" calls the browser's Geolocation API and queries WeatherAPI
  with `lat,lon` as the search term.
