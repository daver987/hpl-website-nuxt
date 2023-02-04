import { Surcharges } from '~/schema/surcharges'
import { VehicleType } from '~/schema/vehicleType'

export function calculateHourlyBaseAmount(hours: number, per_hour: number) {
  return hours * per_hour
}

export function calculateDistanceBaseAmount(
  distance: number,
  min_rate_distance: number,
  per_km: number
) {
  if (distance <= min_rate_distance) {
    return min_rate_distance
  } else {
    return min_rate_distance + (distance - min_rate_distance) * per_km
  }
}

function calculateSurchargeAmount(
  baseAmount: number,
  surcharge: Surcharges[0],
  taxRate: number
) {
  let surchargeAmount = baseAmount * surcharge.amount
  if (surcharge.is_taxable) {
    surchargeAmount += surchargeAmount * taxRate
  }
  return surchargeAmount
}
