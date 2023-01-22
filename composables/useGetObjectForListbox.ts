export function useGetObjectsForListbox(objects, condition) {
  const conditions = new Map([
    ['Standard Sedan', 3],
    ['Premium Sedan', 3],
    ['Standard SUV', 7],
    ['Premium SUV', 6],
  ])

  const numObjects = conditions.get(condition) || objects.length
  return objects.slice(0, numObjects)
}

