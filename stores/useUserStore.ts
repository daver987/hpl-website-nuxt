import { defineStore, acceptHMRUpdate, skipHydrate } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const hplUserId = ref('')
  const first_name = ref('')
  const last_name = ref('')
  const email_address = ref('')
  const phone_number = ref('')
  const stripe_customer_id = ref('')
  const userData = ref<unknown>({})
  const userId = useStorageAsync('hplUserId', '')
  const getUser = async () => {
    try {
      const { data: user, error } = await useFetch('/api/get-user', {
        query: userId.value,
      })
      userData.value = user.value
      hplUserId.value = userId.value
    } catch (error) {
      console.log('Vehicle Types Error:', error)
      return error
    }
  }
  return {
    getUser,
    hplUserId: skipHydrate(hplUserId),
    userData: skipHydrate(userData),
    first_name,
    last_name,
    email_address,
    phone_number,
    stripe_customer_id,
    userId: skipHydrate(userId),
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
