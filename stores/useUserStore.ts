import { defineStore, acceptHMRUpdate } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useUserStore = defineStore('user', {
  state: () => ({
    user_id: '',
  }),

  actions: {
    setUserId(user_id: string) {
      this.user_id = user_id
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('hpl_user_id', user_id)
      }
    },

    getUserId() {
      if (typeof window !== 'undefined') {
        const user_id = window.localStorage.getItem('hpl_user_id')
        if (user_id) {
          this.user_id = user_id
        } else {
          const newUserId = generateUuid()
          this.setUserId(newUserId)
        }
      }

      return this.user_id
    },
  },
})

function generateUuid() {
  const newUserId = uuidv4()

  return newUserId.toString()
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
