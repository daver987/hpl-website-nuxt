import { z } from 'zod'

export const returnedQuote = z
  .object({
    HST: z.number(),
    baseRate: z.number(),
    calculatedDistance: z.number(),
    destinationFormattedAddress: z.string(),
    destinationName: z.string(),
    destinationPlaceId: z.string(),
    distanceText: z.string(),
    distanceValue: z.number(),
    durationText: z.string(),
    durationValue: z.number(),
    emailAddress: z.string(),
    endLat: z.number(),
    endLng: z.number(),
    firstName: z.string(),
    fuelSurcharge: z.number(),
    gratuity: z.number(),
    hoursLabel: z.string(),
    hoursValue: z.number(),
    isItHourly: z.boolean().default(false),
    isRoundTrip: z.boolean(),
    lastName: z.string(),
    originFormattedAddress: z.string(),
    originName: z.string(),
    originPlaceId: z.string(),
    passengersLabel: z.string(),
    passengersValue: z.number(),
    phoneNumber: z.string(),
    pickupDate: z.string().default('00-00-0000'),
    pickupTime: z.string().default('00:00'),
    returnDate: z.string().default('00-00-0000'),
    returnTime: z.string().default('00:00'),
    serviceTypeLabel: z.string().default('Point to Point'),
    serviceTypeValue: z.number(),
    startLat: z.number(),
    startLng: z.number(),
    statusCode: z.number(),
    userId: z.string(),
    vehicleTypeLabel: z.string().default('Standard Sedan'),
    vehicleTypeValue: z.number(),
    totalFare: z.number().default(0),
    hplUserId: z.string(),
    rate: z.object({
      id: z.number(),
      name: z.string(),
      per_km: z.number(),
      per_hour: z.number(),
      min_hours_hourly: z.number(),
      min_rate_distance: z.number(),
      min_distance: z.number(),
      min_rate_hourly: z.number(),
      vehicle_image_alt: z.string().default('Cadillac XTS'),
      vehicle_image_src: z.string().default('/images/cadillac-xts-1.png'),
    }),
    vehicle_image: z.string(),
    quote_number: z.string(),
  })
  .strip()

export type ReturnedQuote = z.infer<typeof returnedQuote>
