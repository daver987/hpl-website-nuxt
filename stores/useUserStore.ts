import { defineStore, acceptHMRUpdate } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
  }),

  actions: {
    setUserId(userId: string) {
      this.userId = userId
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('userId', userId)
      }
    },

    getUserId() {
      if (typeof window !== 'undefined') {
        const userId = window.localStorage.getItem('userId')
        if (userId) {
          this.userId = userId
        } else {
          const newUserId = generateUuid()
          this.setUserId(newUserId)
        }
      }

      return this.userId
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
