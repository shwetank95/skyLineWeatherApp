// Converts a WeatherAPI 12-hour time string ("06:14 AM") to minutes since midnight
function toMinutes(timeStr) {
  if (!timeStr) return null
  const [time, meridian] = timeStr.split(' ')
  let [h, m] = time.split(':').map(Number)
  if (meridian === 'PM' && h !== 12) h += 12
  if (meridian === 'AM' && h === 12) h = 0
  return h * 60 + m
}

export default function SkyStrip({ astro, localtime }) {
  if (!astro || !localtime) return null

  const sunrise = toMinutes(astro.sunrise)
  const sunset = toMinutes(astro.sunset)
  const [, timePart] = localtime.split(' ')
  const [ch, cm] = timePart.split(':').map(Number)
  const nowMin = ch * 60 + cm

  const pct = (min) => Math.min(100, Math.max(0, (min / 1439) * 100))
  const nowPct = pct(nowMin)
  const sunrisePct = pct(sunrise)
  const sunsetPct = pct(sunset)
  const isDay = nowMin >= sunrise && nowMin <= sunset

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 font-mono text-[11px] tracking-wide text-haze uppercase">
        <span>Sunrise {astro.sunrise}</span>
        <span>Sunset {astro.sunset}</span>
      </div>

      <div className="relative h-2 rounded-full overflow-visible">
        {/* day/night gradient track */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(90deg,
              #14162B 0%,
              #2B2E4A ${Math.max(sunrisePct - 4, 0)}%,
              #FF8F6B ${sunrisePct}%,
              #FFC857 ${(sunrisePct + sunsetPct) / 2}%,
              #FF8F6B ${sunsetPct}%,
              #2B2E4A ${Math.min(sunsetPct + 4, 100)}%,
              #14162B 100%)`,
          }}
        />

        {/* current time indicator */}
        <div
          className="absolute -top-1.5 w-4 h-4 rounded-full bg-mist border-2 border-ink shadow-md transition-all"
          style={{ left: `calc(${nowPct}% - 8px)` }}
          title={`Local time ${timePart}`}
        >
          <span className="sr-only">Current time {timePart}</span>
        </div>
      </div>

      <p className="mt-2 font-mono text-[11px] text-haze">
        {isDay ? 'Daylight now' : 'After dark now'} · local time {timePart}
      </p>
    </div>
  )
}
