import { describe, test, expect } from 'vitest'
import { Rates, Surcharges } from '~/types/Rates'

const rates = <Rates[]>[
  {
    id: 1,
    name: 'Standard Sedan',
    per_km: 1.7,
    per_hour: 80,
    min_hours_hourly: 2,
    min_rate_distance: 80,
    min_distance: 25,
    min_rate_hourly: 160,
  },
  {
    id: 2,
    name: 'Premium Sedan',
    per_km: 1.95,
    per_hour: 90,
    min_hours_hourly: 2,
    min_rate_distance: 90,
    min_distance: 25,
    min_rate_hourly: 180,
  },
  {
    id: 3,
    name: 'Standard SUV',
    per_km: 2.3,
    per_hour: 105,
    min_hours_hourly: 2,
    min_rate_distance: 105,
    min_distance: 25,
    min_rate_hourly: 210,
  },
  {
    id: 4,
    name: 'Premium SUV',
    per_km: 2.7,
    per_hour: 128,
    min_hours_hourly: 2,
    min_rate_distance: 128,
    min_distance: 25,
    min_rate_hourly: 256,
  },
]

const surcharges = <Surcharges>{
  fuelSurcharge: 0.08,
  gratuity: 0.2,
  HST: 0.13,
}

// write a function that accepts an id returns the correct rate object from the array of rates objects
const getRateFromId = (id: number, rates: Rates[]) => {
  return rates.find((rate) => rate.id === id)
}

// write a test that asserts that the correct rate object is returned for the id
describe('getRateFromId', () => {
  test('returns the correct rate object for the id', () => {
    expect(getRateFromId(2, rates as Rates[])).toEqual({
      name: 'Premium Sedan',
      id: 2,
      per_km: 1.95,
      per_hour: 90,
      min_hours_hourly: 2,
      min_rate_distance: 90,
      min_rate_hourly: 180,
      min_distance: 25,
    })
    expect(getRateFromId(3, rates as Rates[])).toEqual({
      name: 'Standard SUV',
      id: 3,
      per_km: 2.3,
      per_hour: 105,
      min_hours_hourly: 2,
      min_rate_distance: 105,
      min_rate_hourly: 210,
      min_distance: 25,
    })
  })
})

// write a function that evaluates the isHourly flag and returns the correct rate per km or per hour
const getRatePerKM = (isHourly: boolean, rate: Rates) => {
  return isHourly ? rate.per_hour : rate.per_km
}

// write a test that asserts that the correct rate per km or per hour is returned for the isHourly flag
describe('getRatePerKM', () => {
  test('returns the correct rate per km or per hour for the isHourly flag', () => {
    expect(getRatePerKM(false, rates[0])).toEqual(1.7)
    expect(getRatePerKM(true, rates[0])).toEqual(80)
    expect(getRatePerKM(false, rates[1])).toEqual(1.95)
    expect(getRatePerKM(true, rates[1])).toEqual(90)
  })
})

// write a function that evaluates the isHourly flag and if its true returns the correct base rate per hour or per km
// if its true it takes the num_hours and subtracts the Min_hours_hourly from it if it comes back below 0 it returns
// min rate per hour, if it comes back above 0 it returns the base rate per hour plus the num_hours times the per_hour
// if its false it evaluates the num_km and if it comes back below the min_distance it returns the min_rate_distance
// if it comes back above the min_distance it returns the num_km minus the min_distance and multiplies the remainder
// by the per_km and adds it to the min_rate_distance

const getBaseRate = (
  isHourly: boolean,
  num_hours: number,
  num_km: number,
  rate: Rates
) => {
  if (isHourly) {
    if (num_hours < rate.min_hours_hourly) {
      return rate.min_rate_hourly
    } else {
      return rate.per_hour * num_hours
    }
  } else {
    if (num_km < rate.min_distance) {
      return rate.min_rate_distance
    } else {
      return rate.min_rate_distance + (num_km - rate.min_distance) * rate.per_km
    }
  }
}

// write a test that asserts that the correct base rate per hour or per km is returned for the isHourly flag
describe('getBaseRate', () => {
  test('returns the correct base rate per hour or per km for the isHourly flag', () => {
    expect(getBaseRate(false, 2, 30, rates[0])).toEqual(88.5)
    expect(getBaseRate(true, 3, 25, rates[0])).toEqual(240)
    expect(getBaseRate(false, 2, 25, rates[1])).toEqual(90)
    expect(getBaseRate(true, 2, 25, rates[1])).toEqual(180)
    expect(getBaseRate(false, 2, 25, rates[2])).toEqual(105)
    expect(getBaseRate(true, 2, 25, rates[2])).toEqual(210)
    expect(getBaseRate(false, 2, 25, rates[3])).toEqual(128)
    expect(getBaseRate(true, 2, 25, rates[3])).toEqual(256)
  })
})

//write a function that returns the surcharge amounts for the base rate
const getSurchargeAmounts = (baseRate: number, surcharges: Surcharges) => {
  return {
    fuelSurcharge: baseRate * surcharges.fuelSurcharge,
    gratuity: baseRate * surcharges.gratuity,
    HST: baseRate * surcharges.HST,
  }
}

// write a test that asserts that the correct surcharge amounts are returned for the base rate
describe('getSurchargeAmounts', () => {
  test('returns the correct surcharge amounts for the base rate', () => {
    expect(getSurchargeAmounts(160, surcharges)).toEqual({
      fuelSurcharge: 12.8,
      gratuity: 32,
      HST: 20.8,
    })
  })
})
