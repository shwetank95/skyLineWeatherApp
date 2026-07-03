export default function HourlyForecast({ hours, currentEpoch }) {
  // show the next 12 hours starting from the current hour
  const upcoming = hours.filter((h) => h.time_epoch >= currentEpoch).slice(0, 12)

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.15em] text-haze uppercase mb-3">
        Next hours
      </p>
      <div className="flex gap-5 overflow-x-auto pb-2 -mx-1 px-1">
        {upcoming.map((h) => {
          const hourLabel = new Date(h.time_epoch * 1000).toLocaleTimeString([], {
            hour: 'numeric',
          })
          return (
            <div
              key={h.time_epoch}
              className="flex flex-col items-center gap-2 shrink-0 w-14 text-center"
            >
              <span className="font-mono text-[11px] text-haze">{hourLabel}</span>
              <img
                src={`https:${h.condition.icon}`}
                alt={h.condition.text}
                className="w-8 h-8"
              />
              <span className="font-body text-sm text-mist">{Math.round(h.temp_c)}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
