import { Rates, Surcharges } from '~/types/Rates'

//Function that takes the Rates array of rate objects and returns the correct rate object by the id
const getRateFromId = (id: number, rates: Rates[]) => {
  return rates.find((rate) => rate.id === id)
}

//Function that takes the rate object checks to see if the pricing in hourly or by distance then calculates the base
// rate
function getBaseRate(
  isHourly: boolean,
  numHours: number,
  numKms: number,
  rate: Rates
) {
  if (isHourly) {
    return numHours < rate.min_hours_hourly
      ? rate.min_rate_hourly
      : round(rate.per_hour * numHours)
  }
  return numKms < rate.min_distance
    ? rate.min_rate_distance
    : round(rate.min_rate_distance + (numKms - rate.min_distance) * rate.per_km)
}

//Function that takes the surcharge object, destructures it and calculates the surcharges individually
const getSurchargeAmounts = (baseRate: number, surcharges: Surcharges) => {
  return {
    fuelSurcharge: round(baseRate * surcharges.fuelSurcharge),
    gratuity: round(baseRate * surcharges.gratuity),
    HST: round(baseRate * surcharges.HST),
  }
}

//custom rounding function for rounding to the nearest cent with high precision
const round = (num: number) => {
  const m = Number((Math.abs(num) * 100).toPrecision(15))
  return (Math.round(m) / 100) * Math.sign(num)
}

export { getRateFromId, getBaseRate, getSurchargeAmounts, round }
