function Stat({ label, value, unit }) {
  return (
    <div className="flex flex-col gap-1 py-4 px-1 border-t border-white/10">
      <span className="font-mono text-[10px] tracking-[0.15em] text-haze uppercase">
        {label}
      </span>
      <span className="font-body text-lg text-mist">
        {value}
        {unit && <span className="text-sm text-haze ml-0.5">{unit}</span>}
      </span>
    </div>
  )
}

export default function DetailsGrid({ current }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6">
      <Stat label="Humidity" value={current.humidity} unit="%" />
      <Stat label="Wind" value={Math.round(current.wind_kph)} unit="km/h" />
      <Stat label="UV Index" value={current.uv} />
      <Stat label="Pressure" value={Math.round(current.pressure_mb)} unit="mb" />
    </div>
  )
}
