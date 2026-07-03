import { useEffect } from 'react'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import SkyStrip from './components/SkyStrip'
import DetailsGrid from './components/DetailsGrid'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'

export default function App() {
  const { data, loading, error, fetchWeather, fetchByCoords } = useWeather()

  useEffect(() => {
    fetchWeather('London')
  }, [fetchWeather])

  function handleLocate() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeather('London')
    )
  }

  return (
    <div className="min-h-screen bg-ink flex flex-col items-center px-4 py-10 sm:py-16">
      <header className="flex flex-col items-center gap-6 w-full">
        <h1 className="font-display font-medium text-2xl text-mist tracking-tight">
          Skyline
        </h1>
        <SearchBar onSearch={fetchWeather} onLocate={handleLocate} loading={loading} />
      </header>

      <main className="w-full max-w-md mt-8">
        {error && (
          <div className="bg-dawn/10 border border-dawn/30 text-dawn font-body text-sm rounded-2xl px-4 py-3 text-center">
            {error}
          </div>
        )}

        {!error && !data && (
          <div className="flex justify-center py-16">
            <span className="font-mono text-sm text-haze animate-pulse">
              Reading the sky…
            </span>
          </div>
        )}

        {data && (
          <div className="bg-dusk/60 backdrop-blur rounded-3xl shadow-card border border-white/5 px-6 py-6 flex flex-col gap-8">
            <WeatherCard
              location={data.location}
              current={data.current}
              today={data.forecast.forecastday[0].day}
            />

            <SkyStrip
              astro={data.forecast.forecastday[0].astro}
              localtime={data.location.localtime}
            />

            <DetailsGrid current={data.current} />

            <HourlyForecast
              hours={data.forecast.forecastday[0].hour}
              currentEpoch={data.location.localtime_epoch}
            />

            <DailyForecast days={data.forecast.forecastday} />
          </div>
        )}
      </main>

      <footer className="mt-10">
        <p className="font-mono text-[11px] text-haze/70">
          Data from WeatherAPI.com
        </p>
      </footer>
    </div>
  )
}
