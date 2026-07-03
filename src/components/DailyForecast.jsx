function dayLabel(dateStr, index) {
  if (index === 0) return 'Today'
  const date = new Date(dateStr)
  return date.toLocaleDateString([], { weekday: 'short' })
}

export default function DailyForecast({ days }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.15em] text-haze uppercase mb-3">
        5-day outlook
      </p>
      <div className="flex flex-col divide-y divide-white/10">
        {days.map((d, i) => (
          <div key={d.date} className="flex items-center justify-between py-3">
            <span className="font-body text-sm text-mist w-16">{dayLabel(d.date, i)}</span>
            <img
              src={`https:${d.day.condition.icon}`}
              alt={d.day.condition.text}
              className="w-7 h-7"
            />
            <span className="font-body text-sm text-haze flex-1 text-left pl-3 truncate">
              {d.day.condition.text}
            </span>
            <span className="font-mono text-sm text-mist">
              {Math.round(d.day.maxtemp_c)}°{' '}
              <span className="text-haze">{Math.round(d.day.mintemp_c)}°</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
