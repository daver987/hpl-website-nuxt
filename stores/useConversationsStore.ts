import { defineStore, acceptHMRUpdate } from 'pinia'

export const useConversationsStore = defineStore({
  id: 'conversations',
  state: () => {
    return {
      conversations: null,
    }
  },
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useConversationsStore, import.meta.hot)
  )
}
