import { useState, useCallback } from 'react'

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json'

export function useWeather() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = useCallback(async (query) => {
    if (!query || !query.trim()) return
    setLoading(true)
    setError(null)

    try {
      if (!API_KEY) {
        throw new Error(
          'Missing API key. Add VITE_WEATHERAPI_KEY to a .env file at the project root.'
        )
      }

      const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
        query
      )}&days=5&aqi=no&alerts=no`

      const res = await fetch(url)
      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.error?.message || 'City not found. Try another search.')
      }

      setData(json)
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching the weather.')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchByCoords = useCallback(
    async (lat, lon) => {
      await fetchWeather(`${lat},${lon}`)
    },
    [fetchWeather]
  )

  return { data, loading, error, fetchWeather, fetchByCoords }
}
