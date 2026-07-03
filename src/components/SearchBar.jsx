import { useState } from 'react'

export default function SearchBar({ onSearch, onLocate, loading }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search a city or airport code"
          className="w-full bg-white/10 text-mist placeholder-haze/70 font-body text-sm
                     rounded-full px-5 py-3 border border-white/10
                     focus:bg-white/15 focus:border-gold/40 transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="shrink-0 bg-gold text-ink font-body font-semibold text-sm
                   rounded-full px-5 py-3 hover:brightness-105 active:brightness-95
                   disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Loading…' : 'Search'}
      </button>
      <button
        type="button"
        onClick={onLocate}
        title="Use my location"
        aria-label="Use my current location"
        className="shrink-0 grid place-items-center w-11 h-11 rounded-full
                   bg-white/10 border border-white/10 text-mist hover:bg-white/15 transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2v3M12 19v3M2 12h3M19 12h3M12 8a4 4 0 100 8 4 4 0 000-8z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </form>
  )
}
