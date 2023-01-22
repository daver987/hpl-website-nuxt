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

export type DirectionsSchema = z.infer<typeof directionsSchema>

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { origin, destination } = query
  const data = await $fetch<DirectionsSchema>(
    `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=AIzaSyDJJhVTuoRoXVJA6VvmltFvUCIqvVpRZSA
      `,
    {
      method: 'POST',
    }
  )
  const response = directionsSchema.parse(data)
  console.log('Directions Response', response)
  const { value: distanceValue, text: distanceText } =
    response.routes[0].legs[0].distance
  const { value: durationValue, text: durationText } =
    response.routes[0].legs[0].duration
  const { lat: startLat, lng: startLng } =
    response.routes[0].legs[0].start_location
  const { lat: endLat, lng: endLng } = response.routes[0].legs[0].end_location
  return {
    distanceValue,
    distanceText,
    durationValue,
    durationText,
    startLat,
    startLng,
    endLat,
    endLng,
  }
})
