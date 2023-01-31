import { z } from 'zod'

export const formSchema = z.object({
  pickupDate: z.date({
    required_error: 'Pickup Date is Required',
    invalid_type_error: 'Pickup Date must be a valid date',
  }),
  pickupTime: z.date({
    required_error: 'Pickup Time is Required',
    invalid_type_error: 'Pickup Time must be a valid time',
  }),
  returnDate: z.date({}).optional(),
  returnTime: z.date().optional(),
  selectedServiceType: z
    .object({
      label: z.enum([
        'Point To Point',
        'From Airport',
        'To Airport',
        'Hourly / As Directed',
      ]),
      value: z.number().int().gte(1).lte(4),
    })
    .strip(),
  selectedVehicleType: z
    .object({
      label: z.enum([
        'Standard Sedan',
        'Premium Sedan',
        'Standard SUV',
        'Premium SUV',
      ]),
      value: z.number().int().gte(1).lte(4),
    })
    .strip(),
  selectedNumberOfHours: z
    .object({
      label: z.enum([
        'For Hourly Service',
        '2 hrs',
        '3 hrs',
        '4 hrs',
        '5 hrs',
        '6 hrs',
        '7 hrs',
        '8 hrs',
        '9 hrs',
        '10 hrs',
        '11 hrs',
        '12 hrs',
      ]),
      value: z.number().int().gte(0).lte(12).default(0),
    })
    .strip(),
  selectedPassengers: z
    .object({
      label: z.enum([
        '1 Passenger',
        '2 Passengers',
        '3 Passengers',
        '4 Passengers',
        '5 Passengers',
        '6 Passengers',
        '7 Passengers',
      ]),
      value: z.number().int().gte(1).lte(7),
    })
    .strip(),
  firstName: z.string().min(1, {
    message: 'Please enter a valid first name',
  }),
  lastName: z.string().min(1, {
    message: 'Please enter a valid last name',
  }),
  emailAddress: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  phoneNumber: z
    .string()
    .min(7, {
      message: 'Please enter a valid phone number',
    })
    .default('+1'),
  isRoundTrip: z.boolean(),
  isItHourly: z.boolean(),
  tripData: z.object({
    distanceValue: z.number(),
    distanceText: z.string(),
    durationValue: z.number(),
    durationText: z.string(),
    startLat: z.number(),
    startLng: z.number(),
    endLat: z.number(),
    endLng: z.number(),
  }),
  placeDataOrigin: z
    .object(
      {
        formatted_address: z.string(),
        name: z.string(),
        place_id: z.string(),
        types: z.array(z.string()),
        isPearsonAirportOrigin: z.boolean(),
      },
      {
        required_error: 'Pickup Location is Required',
        invalid_type_error: 'Pickup Location is Required',
      }
    )
    .strip(),
  placeDataDestination: z
    .object(
      {
        formatted_address: z.string(),
        name: z.string(),
        place_id: z.string(),
        types: z.array(z.string()),
        isPearsonAirportDestination: z.boolean(),
      },
      {
        required_error: 'Drop off Locaction is Required',
        invalid_type_error: 'Drop off Locaction is Required',
      }
    )
    .strip(),
  calculatedDistance: z.number(),
  gtmValues: z.object({
    utm_medium: z.string().default(''),
    utm_source: z.string().default(''),
    utm_campaign: z.string().default(''),
    utm_term: z.string().default(''),
    gclid: z.string().default(''),
  }),
})

export type ValidationSchema = z.infer<typeof formSchema>
