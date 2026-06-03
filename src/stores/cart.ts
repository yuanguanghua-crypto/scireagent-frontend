import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCart, addToCart, updateCartItem, deleteCartItem } from '../api'
import type { CartItem } from '../types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const loading = ref(false)

  const count = computed(() => items.value.reduce((sum, i) => sum + i.number, 0))
  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.total_price, 0).toFixed(2)
  )

  async function fetchCart() {
    console.log("fetchCart() called")
    loading.value = true
    try {
      const { data } = await getCart()
      items.value = data.items || []
    } finally {
      loading.value = false
    }
  }

  async function add(skuId: number, qty = 1) {
    console.log("cart.add() skuId:", skuId, "qty:", qty)
    await addToCart(skuId, qty)
    await fetchCart()
  }

  async function update(id: number, qty: number) {
    await updateCartItem(id, qty)
    await fetchCart()
  }

  async function remove(id: number) {
    await deleteCartItem(id)
    await fetchCart()
  }

  return { items, loading, count, total, fetchCart, add, update, remove }
})
