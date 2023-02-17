import { acceptHMRUpdate, defineStore } from 'pinia'
import { z } from 'zod'

const serviceTypeOptionsSchema = z.array(
  z
    .object({
      label: z.string(),
      value: z.number(),
      isDisabled: z.boolean(),
    })
    .strip()
)

type ServiceTypeOptions = z.infer<typeof serviceTypeOptionsSchema>

export const useServiceTypesStore = defineStore('serviceTypesStore', () => {
  const serviceTypes = ref<ServiceTypeOptions | null>(null)
  const serviceTypeOptions = ref<ServiceTypeOptions | null>(null)
  const selectedServiceType = ref<ServiceTypeOptions>()

  const getServiceTypes = async () => {
    try {
      const { data } = await useFetch('/api/get-service-types')
      if (!data.value) {
        return
      } else {
        return (serviceTypeOptions.value = serviceTypeOptionsSchema.parse(
          data.value
        ))
      }
    } catch (error) {
      alert(error)
    }
  }
  return {
    serviceTypes,
    getServiceTypes,
    serviceTypeOptions,
    selectedServiceType,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useServiceTypesStore, import.meta.hot))
}
