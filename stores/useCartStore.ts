import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCartStore = defineStore('useCartStore', {
  state: () => ({ addedToCart: false, loading: false }),
  getters: {
    //
  },
  actions: {
    addToCart() {
      this.loading = true
      setTimeout(() => {
        this.addedToCart = true
        this.loading = false
      }, 1000)
    },
    removeFromCart() {
      this.loading = true
      setTimeout(() => {
        this.addedToCart = false
        this.loading = false
      }, 1000)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
