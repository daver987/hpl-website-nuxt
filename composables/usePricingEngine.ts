import { computed, ref } from 'vue'
import { z } from 'zod'

const directionsSchema = z.object({
  routes: z.array(
    z
      .object({
        legs: z.array(
          z.object({
            distance: z.object({ value: z.number(), text: z.string() }),
            duration: z.object({ value: z.number(), text: z.string() }),
            end_address: z.string(),
            start_address: z.string(),
            start_location: z.object({ lat: z.number(), lng: z.number() }),
            end_location: z.object({ lat: z.number(), lng: z.number() }),
          })
        ),
      })
      .strip()
  ),
})

type DirectionsApiResponse = z.infer<typeof directionsSchema>

// Vehicle Type interface
export interface VehicleType {
  value: number
  label: string
  per_km: number
  per_hour: number
  min_rate: number
  min_distance: number
  is_active: boolean
}

// Service Type interface
export interface ServiceType {
  value: number
  label: string
  is_active: boolean
  is_hourly: boolean
}

// Line Item interface
export interface LineItem {
  id: string
  label: string
  amount: number
  is_taxable: boolean
  is_percentage: boolean
  is_active: boolean
}

// Tax interface
export interface SalesTax {
  id: string
  region: string
  amount: number
  is_active: boolean
  tax_name: string
}

// Distance Calculation function
export async function calculateDistance(
  origin: string,
  destination: string
): Promise<{ distance: number; data: DirectionsApiResponse }> {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch directions: ${response.status} - ${response.statusText}`
    )
  }

  const data = await response.json()
  const validatedData = directionsSchema.parse(data)
  const {
    distance: { value: distanceValue },
  } = validatedData.routes[0].legs[0]

  return {
    distance: distanceValue / 1000,
    data,
  }
}

// Pricing Engine function
export function usePricingEngine(
  vehicleTypes: VehicleType[],
  serviceTypes: ServiceType[],
  lineItems: LineItem[],
  taxes: SalesTax[]
) {
  // state variables
  const origin = ref('')
  const destination = ref('')
  const routeData = ref<DirectionsApiResponse>()
  const vehicleTypeId = ref(-1)
  const serviceTypeId = ref(-1)
  const selectedHours = ref(0)
  const distance = ref(0)
  const baseRate = ref(0)
  const lineItemsTotal = ref(0)
  const taxableLineItemsTotal = ref(0)
  const taxAmount = ref(0)
  const totalPrice = computed(
    () => baseRate.value + lineItemsTotal.value + taxAmount.value
  )

  // methods
  async function updateDistance() {
    const { data: route, distance: dist } = await calculateDistance(
      origin.value,
      destination.value
    )
    distance.value = dist
    routeData.value = route
  }

  function updateBaseRate() {
    const selectedVehicleType = vehicleTypes.find(
      (v) => v.value === vehicleTypeId.value
    )
    const selectedServiceType = serviceTypes.find(
      (s) => s.value === serviceTypeId.value
    )

    console.log('Selected vehicle type:', selectedVehicleType)
    console.log('Selected service type:', selectedServiceType)

    if (!selectedVehicleType || !selectedServiceType) {
      baseRate.value = 0
      return
    }

    if (selectedServiceType.value === 4) {
      baseRate.value = selectedHours.value * selectedVehicleType.per_hour
    } else {
      const distanceOverMin = Math.max(
        0,
        distance.value - selectedVehicleType.min_distance
      )
      baseRate.value =
        selectedVehicleType.min_rate +
        distanceOverMin * selectedVehicleType.per_km
    }
  }

  function updateLineItemsTotal() {
    lineItemsTotal.value = 0
    taxableLineItemsTotal.value = 0

    for (const item of lineItems) {
      const amount = item.is_percentage
        ? baseRate.value * (item.amount / 100)
        : item.amount
      lineItemsTotal.value += amount

      if (item.is_taxable) {
        taxableLineItemsTotal.value += amount
      }
    }
  }

  function updateTaxAmount() {
    taxAmount.value = 0
    for (const tax of taxes) {
      if (tax.is_active) {
        const amount =
          (tax.amount / 100) * (baseRate.value + taxableLineItemsTotal.value)
        taxAmount.value += amount
      }
    }
  }

  function reset() {
    origin.value = ''
    destination.value = ''
    vehicleTypeId.value = -1
    serviceTypeId.value = -1
    selectedHours.value = 0
    distance.value = 0
    baseRate.value = 0
    lineItemsTotal.value = 0
    taxableLineItemsTotal.value = 0
    taxAmount.value = 0
  }

  return {
    origin,
    destination,
    routeData,
    vehicleTypes,
    serviceTypes,
    lineItems,
    taxes,
    vehicleTypeId,
    serviceTypeId,
    selectedHours,
    distance,
    baseRate,
    lineItemsTotal,
    taxableLineItemsTotal,
    taxAmount,
    totalPrice,
    updateDistance,
    updateBaseRate,
    updateLineItemsTotal,
    updateTaxAmount,
    reset,
  }
}
