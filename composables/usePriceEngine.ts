import { z } from 'zod'

export const vehicleTypeSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  max_passengers: z.number(),
  max_luggage: z.number(),
  per_km: z.number(),
  per_hour: z.number(),
  min_hours_hourly: z.number(),
  min_rate_distance: z.number(),
  min_distance: z.number(),
  min_rate_hourly: z.number(),
  is_active: z.boolean(),
  name: z.string(),
  value: z.number(),
  isDisabled: z.boolean(),
  label: z.string(),
})

export type VehicleType = z.infer<typeof vehicleTypeSchema>

export const serviceTypeSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    label: z.string(),
    is_disabled: z.boolean(),
    is_hourly: z.boolean(),
  })
  .strip()

export type ServiceType = z.infer<typeof serviceTypeSchema>

export const lineItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  is_percentage: z.boolean(),
  is_flat: z.boolean(),
  is_taxable: z.boolean(),
  quantity: z.number().optional(),
  rate: z.number(),
  amount: z.number(),
  is_active: z.boolean(),
})

export type LineItem = z.infer<typeof lineItemSchema>

interface Quote {
  base_price: number
  line_items: LineItem[]
}

interface PriceEngine {
  vehicle_types: VehicleType[]
  service_types: ServiceType[]
  passengers: number
  distance: number
  duration: number
  is_round_trip: boolean
  return_date: Date | null
  quote: Quote | null
  calculatePrice: () => void
}

export async function usePriceEngine(): Promise<PriceEngine> {
  // Data
  const vehicleTypes = ref<VehicleType[]>([])
  const serviceTypes = ref<ServiceType[]>([])
  const passengers = ref(1)
  const distance = ref(0)
  const duration = ref(0)
  const isRoundTrip = ref(false)
  const returnDate = ref<Date | null>(null)
  const quote = reactive<Quote | null>(null)
  const { data: vehicleTypeData, error: vehicleTypeError } = await useFetch(
    '/api/vehicle_types'
  )
  const { data: serviceTypeData, error: serviceTypeError } = await useFetch(
    '/api/service_types'
  )
  const { data: taxData, error: taxError } = await useFetch('/api/taxes')

  // Methods
  const calculateBasePrice = (
    vehicleType: VehicleType,
    serviceType: ServiceType
  ): number => {
    let basePrice = 0

    if (serviceType.is_hourly) {
      basePrice = Math.max(
        vehicleType.min_rate_hourly,
        duration * vehicleType.per_hour
      )
    } else {
      const totalDistance = isRoundTrip ? distance * 2 : distance
      const distanceAboveMin = Math.max(
        0,
        totalDistance - vehicleType.min_distance
      )
      const distancePrice = distanceAboveMin * vehicleType.per_km
      const minDistancePrice = vehicleType.min_rate_distance
      basePrice = Math.max(minDistancePrice, distancePrice)
    }

    return basePrice
  }

  const calculateLineItems = (
    basePrice: number,
    lineItems: LineItem[]
  ): LineItem[] => {
    const taxableLineItems = lineItems.filter((item) => item.is_taxable)

    const subtotal = taxableLineItems.reduce((total, item) => {
      if (item.is_percentage) {
        return total + (basePrice * item.amount) / 100
      } else {
        return total + item.amount
      }
    }, 0)

    const taxRate = 0.13
    const taxAmount = subtotal * taxRate

    const total = lineItems.reduce((total, item) => {
      if (item.is_percentage) {
        return total + (basePrice * item.amount) / 100
      } else {
        return total + item.amount
      }
    }, basePrice + taxAmount)

    return [...lineItems]
  }

  const calculatePrice = () => {
    const vehicleType = vehicleTypes.value.find((vt) => vt.id === 1) // TODO: Replace with selected vehicle type
    const serviceType = serviceTypes.value.find((st) => st.id === 1) // TODO: Replace with selected service type

    const basePrice = calculateBasePrice(vehicleType, serviceType)
    const lineItems = calculateLineItems(basePrice)

    quote.base_price = basePrice
    quote.line_items = lineItems
  }

  // Fetch vehicle types and service types from API
  // ...

  return {
    vehicle_types: vehicleTypes,
    service_types: serviceTypes,
    passengers,
    distance,
    duration,
    is_round_trip: isRoundTrip,
    return_date: returnDate,
    quote,
    calculatePrice,
  }
}
