export default function WeatherCard({ location, current, today }) {
  return (
    <div className="flex flex-col items-center text-center gap-1 py-6">
      <p className="font-mono text-xs tracking-[0.2em] text-haze uppercase">
        {location.name}, {location.country}
      </p>

      <div className="flex items-center gap-3 mt-2">
        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          className="w-16 h-16 drop-shadow-lg"
        />
        <span className="font-display font-medium text-7xl sm:text-8xl text-mist leading-none">
          {Math.round(current.temp_c)}°
        </span>
      </div>

      <p className="font-body text-lg text-mist/90 mt-1">{current.condition.text}</p>
      <p className="font-mono text-xs text-haze mt-1">
        Feels like {Math.round(current.feelslike_c)}°
        {today && (
          <>
            {' '}
            · H:{Math.round(today.maxtemp_c)}° L:{Math.round(today.mintemp_c)}°
          </>
        )}
      </p>
    </div>
  )
}
