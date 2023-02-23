import { defineStore, acceptHMRUpdate } from 'pinia'

interface CartState {
  addedToCart: boolean
  loading: boolean
}

export const useCartStore = defineStore('cartStore', {
  state: (): CartState => ({ addedToCart: false, loading: false }),
  getters: {
    //
  },
  actions: {
    async addToCart() {
      this.loading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.addedToCart = true
      this.loading = false
    },
    async removeFromCart() {
      this.loading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.addedToCart = false
      this.loading = false
    },
  },
})

export const { addToCart, removeFromCart } = useCartStore()

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
