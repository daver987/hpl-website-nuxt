import {
  usePricingEngine,
  Vehicle,
  Service,
  SalesTax,
  LineItem,
} from './usePricingEngine'
import { ref } from 'vue'
import { describe, test, expect } from 'vitest'

const vehicles: Vehicle[] = [
  {
    is_active: true,
    label: 'Standard Sedan',
    min_distance: 25,
    min_hours: 2,
    min_rate: 80,
    per_hour: 80,
    per_km: 1.7,
    value: 1,
  },
  {
    is_active: true,
    label: 'Premium Sedan',
    min_distance: 25,
    min_hours: 2,
    min_rate: 90,
    per_hour: 90,
    per_km: 1.9,
    value: 2,
  },
  {
    is_active: true,
    label: 'Standard SUV',
    min_distance: 25,
    min_hours: 2,
    min_rate: 105,
    per_hour: 105,
    per_km: 2.05,
    value: 3,
  },
  {
    is_active: true,
    label: 'Premium SUV',
    min_distance: 25,
    min_hours: 2,
    min_rate: 128,
    per_hour: 128,
    per_km: 2.6,
    value: 4,
  },
]

const services: Service[] = [
  { is_active: true, is_hourly: false, label: 'Point To Point', value: 1 },
  { is_active: true, is_hourly: false, label: 'To Airport', value: 2 },
  { is_active: true, is_hourly: false, label: 'From Airport', value: 3 },
  { is_active: true, is_hourly: true, label: 'Hourly / As Directed', value: 4 },
]

const lineItems = [
  {
    amount: 20,
    id: '1',
    is_active: true,
    is_percentage: true,
    is_taxable: false,
    label: 'Gratuity',
    total: 0,
    applies_to: '',
  },
  {
    amount: 8,
    id: '2',
    is_active: true,
    is_percentage: true,
    is_taxable: true,
    label: 'Fuel Surcharge',
    total: 0,
    applies_to: '',
  },
  {
    amount: 13.27,
    id: '3',
    is_active: true,
    is_percentage: false,
    is_taxable: true,
    label: 'Pearson Toll Charge',
    total: 0,
    applies_to: 'ChIJkdQtwEo5K4gRxQ4DxOldHbQ',
  },
]

const salesTaxes: SalesTax[] = [
  {
    amount: 13,
    id: 1,
    is_active: true,
    region: 'Ontario',
    tax_name: 'HST',
  },
  {
    amount: 14.975,
    id: 2,
    is_active: false,
    region: 'Quebec',
    tax_name: 'QST',
  },
]
const originRef = ref('')
const originRefTwo = ref('ChIJkdQtwEo5K4gRxQ4DxOldHbQ')
describe('usePricingEngine', () => {
  test('calculates correct price for Point To Point trip, min fare and above min fare', async () => {
    const engine = usePricingEngine(vehicles, services, lineItems, salesTaxes)

    engine.vehicleTypeId.value = 1
    engine.serviceTypeId.value = 1
    engine.distance.value = 25

    engine.updateBaseRate()
    expect(engine.baseRate.value).toBe(80)

    engine.updateLineItemsTotal(originRef.value)
    expect(engine.lineItemsTotal.value).toBe(22.4)

    engine.updateTaxAmount()
    expect(engine.taxAmount.value).toBeCloseTo(11.23)

    expect(engine.totalPrice.value).toBeCloseTo(113.63)

    engine.vehicleTypeId.value = 1
    engine.serviceTypeId.value = 1
    engine.distance.value = 30

    engine.updateBaseRate()
    expect(engine.baseRate.value).toBe(88.5)

    engine.updateLineItemsTotal(originRef.value)
    expect(engine.lineItemsTotal.value).toBe(24.78)

    engine.updateTaxAmount()
    expect(engine.taxAmount.value).toBeCloseTo(12.43)

    expect(engine.totalPrice.value).toBeCloseTo(125.71)
  })
  test('calculates correct price for hourly trip min fare', async () => {
    const engine = usePricingEngine(vehicles, services, lineItems, salesTaxes)

    engine.vehicleTypeId.value = 1
    engine.serviceTypeId.value = 4
    engine.selectedHours.value = 2

    engine.updateBaseRate()
    expect(engine.baseRate.value).toBe(160)

    engine.updateLineItemsTotal(originRef.value)
    expect(engine.lineItemsTotal.value).toBe(44.8)

    engine.updateTaxAmount()
    expect(engine.taxAmount.value).toBeCloseTo(22.46)

    expect(engine.totalPrice.value).toBeCloseTo(227.26)
  })
  test('calculates correct price for hourly trip above min fare', async () => {
    const engine = usePricingEngine(vehicles, services, lineItems, salesTaxes)

    engine.vehicleTypeId.value = 1
    engine.serviceTypeId.value = 4
    engine.selectedHours.value = 4

    engine.updateBaseRate()
    expect(engine.baseRate.value).toBe(320)

    engine.updateLineItemsTotal(originRef.value)
    expect(engine.lineItemsTotal.value).toBe(89.6)

    engine.updateTaxAmount()
    expect(engine.taxAmount.value).toBeCloseTo(44.93)

    expect(engine.totalPrice.value).toBeCloseTo(454.528)
  })
})

describe('usePricingEngineTwo', async () => {
  test('calculates correct price for Point To Point trip, min fare and above min fare', async () => {
    const engine = usePricingEngine(vehicles, services, lineItems, salesTaxes)

    engine.vehicleTypeId.value = 1
    engine.serviceTypeId.value = 1
    engine.distance.value = 25

    engine.updateBaseRate()
    expect(engine.baseRate.value).toBe(80)

    engine.updateLineItemsTotal(originRef.value)
    expect(engine.lineItemsTotal.value).toBe(22.4)

    engine.updateTaxAmount()
    expect(engine.taxAmount.value).toBeCloseTo(11.23)

    expect(engine.totalPrice.value).toBeCloseTo(113.63)

    engine.vehicleTypeId.value = 1
    engine.serviceTypeId.value = 1
    engine.distance.value = 30

    engine.updateBaseRate()
    expect(engine.baseRate.value).toBe(88.5)

    engine.updateLineItemsTotal(originRef.value)
    expect(engine.lineItemsTotal.value).toBe(24.78)

    engine.updateTaxAmount()
    expect(engine.taxAmount.value).toBeCloseTo(12.43)

    expect(engine.totalPrice.value).toBeCloseTo(125.71)
  })
})
