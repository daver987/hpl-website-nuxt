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

type QueryParams = {
  origin: string
  destination: string
}

type DirectionsApiResponse = z.infer<typeof directionsSchema>

async function getDirections(
  query: QueryParams
): Promise<DirectionsApiResponse> {
  const { origin, destination } = query
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch directions: ${response.status} - ${response.statusText}`
    )
  }

  const data = await response.json()
  return directionsSchema.parse(data)
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) as QueryParams
    const response = await getDirections(query)

    const {
      distance: { value: distanceValue, text: distanceText },
      duration: { value: durationValue, text: durationText },
      start_location: { lat: startLat, lng: startLng },
      end_location: { lat: endLat, lng: endLng },
    } = response.routes[0].legs[0]

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
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get directions')
  }
})
