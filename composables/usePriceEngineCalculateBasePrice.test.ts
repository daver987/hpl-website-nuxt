import { describe } from 'vitest'
import { usePriceEngine } from './usePriceEngine'

const priceEngine = usePriceEngine()

describe('calculateBasePrice', () => {
  it('calculates the base price for an hourly service correctly', () => {
    const vehicleType = {
      min_rate_hourly: 80,
      per_hour: 25,
    }
    const serviceType = {
      is_hourly: true,
    }
    const duration = 3
    const expectedBasePrice = 80 + 25 * duration

    const result = calculateBasePrice(vehicleType, serviceType, duration)

    expect(result).toBe(expectedBasePrice)
  })

  it('calculates the base price for a distance service correctly', () => {
    const vehicleType = {
      min_distance: 25,
      min_rate_distance: 80,
      per_km: 1.7,
    }
    const serviceType = {
      is_hourly: false,
    }
    const distance = 100
    const isRoundTrip = false
    const expectedBasePrice = 207.5 // as per your example

    const result = calculateBasePrice(
      vehicleType,
      serviceType,
      distance,
      isRoundTrip
    )

    expect(result).toBe(expectedBasePrice)
  })
})
