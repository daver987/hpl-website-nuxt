// @vitest-environment nuxt
import {
  usePricingEngine,
  ServiceType,
  SalesTax,
  LineItem,
  VehicleType,
} from './usePricingEngine'
import { test, describe, expect } from 'vitest'

const vehicleTypes: VehicleType[] = [
  {
    value: 1,
    label: 'Car',
    per_km: 1.7,
    per_hour: 80,
    min_rate: 80,
    min_distance: 25,
    is_active: true,
  },
  {
    value: 2,
    label: 'SUV',
    per_km: 2.05,
    per_hour: 100,
    min_rate: 100,
    min_distance: 25,
    is_active: true,
  },
]

const serviceTypes: ServiceType[] = [
  { value: 1, label: 'Point To Point', is_active: true, is_hourly: false },
  { value: 4, label: 'Hourly / As Directed', is_active: true, is_hourly: true },
]

const lineItems: LineItem[] = [
  {
    id: '1244234',
    label: 'Fuel Surcharge',
    amount: 8,
    is_taxable: true,
    is_percentage: true,
    is_active: true,
  },
  {
    id: '234432',
    label: 'Gratuity',
    amount: 20,
    is_taxable: false,
    is_percentage: true,
    is_active: true,
  },
]

const salesTaxes: SalesTax[] = [
  { id: '1', region: 'Ontario', amount: 13, is_active: true, tax_name: 'HST' },
  {
    id: '2',
    region: 'Quebec',
    amount: 14.975,
    is_active: false,
    tax_name: 'QST',
  },
]

describe('usePricingEngine', () => {
  test('calculates correct price for Point To Point trip, min fare and above min fare', async () => {
    const engine = usePricingEngine(
      vehicleTypes,
      serviceTypes,
      lineItems,
      salesTaxes
    )

    engine.vehicleTypeId.value = 1
    engine.serviceTypeId.value = 1
    engine.distance.value = 25

    engine.updateBaseRate()
    expect(engine.baseRate.value).toBe(80)

    engine.updateLineItemsTotal()
    expect(engine.lineItemsTotal.value).toBe(22.4)

    engine.updateTaxAmount()
    expect(engine.taxAmount.value).toBeCloseTo(11.23)

    expect(engine.totalPrice.value).toBeCloseTo(113.63)

    engine.vehicleTypeId.value = 1
    engine.serviceTypeId.value = 1
    engine.distance.value = 30

    engine.updateBaseRate()
    expect(engine.baseRate.value).toBe(88.5)

    engine.updateLineItemsTotal()
    expect(engine.lineItemsTotal.value).toBe(24.78)

    engine.updateTaxAmount()
    expect(engine.taxAmount.value).toBeCloseTo(12.43)

    expect(engine.totalPrice.value).toBeCloseTo(125.71)
  })
  test('calculates correct price for hourly trip min fare', async () => {
    const engine = usePricingEngine(
      vehicleTypes,
      serviceTypes,
      lineItems,
      salesTaxes
    )

    engine.vehicleTypeId.value = 1
    engine.serviceTypeId.value = 4
    engine.selectedHours.value = 2

    engine.updateBaseRate()
    expect(engine.baseRate.value).toBe(160)

    engine.updateLineItemsTotal()
    expect(engine.lineItemsTotal.value).toBe(44.8)

    engine.updateTaxAmount()
    expect(engine.taxAmount.value).toBeCloseTo(22.46)

    expect(engine.totalPrice.value).toBeCloseTo(227.26)
  })
  test('calculates correct price for hourly trip above min fare', async () => {
    const engine = usePricingEngine(
      vehicleTypes,
      serviceTypes,
      lineItems,
      salesTaxes
    )

    engine.vehicleTypeId.value = 1
    engine.serviceTypeId.value = 4
    engine.selectedHours.value = 4

    engine.updateBaseRate()
    expect(engine.baseRate.value).toBe(320)

    engine.updateLineItemsTotal()
    expect(engine.lineItemsTotal.value).toBe(89.6)

    engine.updateTaxAmount()
    expect(engine.taxAmount.value).toBeCloseTo(44.93)

    expect(engine.totalPrice.value).toBeCloseTo(454.528)
  })
})
