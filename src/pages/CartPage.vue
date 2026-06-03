<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
onMounted(() => cart.fetchCart())
</script>

<template>
  <div class="py-2">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
        <p class="text-gray-400 text-sm mt-1">{{ cart.count }} items</p>
      </div>
    </div>

    <div v-if="cart.loading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="h-20 skeleton rounded-2xl"></div>
    </div>

    <div v-else-if="cart.items.length === 0" class="text-center py-20">
      <div class="text-5xl mb-4">🛒</div>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
      <p class="text-gray-400 mb-6">Browse our product catalog to find what you need.</p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium text-sm
          transition-all duration-200 hover:shadow-lg no-underline"
        style="background: linear-gradient(135deg, #006838, #009444)"
      >Browse Products</router-link>
    </div>

    <div v-else>
      <!-- Cart items -->
      <div class="space-y-3 mb-8">
        <div
          v-for="item in cart.items"
          :key="item.id || item.product_catalog"
          class="group bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-5
            transition-all duration-200 hover:shadow-sm"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span
class="text-xs font-mono font-bold text-white px-2 py-0.5 rounded-md"
                style="background: linear-gradient(135deg, #006838, #009444)">
                {{ item.sku_info?.cat_no || item.product_catalog }}
              </span>
            </div>
            <p class="text-sm text-gray-500">{{ item.sku_info?.amount }} &middot; {{ item.sku_info?.purity }}</p>
          </div>

          <div class="flex items-center">
            <button
              class="w-9 h-9 rounded-l-lg border border-gray-200 text-sm hover:bg-gray-50 transition-colors flex items-center justify-center"
              @click="cart.update(item.id!, Math.max(1, item.number - 1))"
            >&minus;</button>
            <div class="w-12 h-9 border-t border-b border-gray-200 flex items-center justify-center text-sm font-semibold">
              {{ item.number }}
            </div>
            <button
              class="w-9 h-9 rounded-r-lg border border-gray-200 text-sm hover:bg-gray-50 transition-colors flex items-center justify-center"
              @click="cart.update(item.id!, item.number + 1)"
            >+</button>
          </div>

          <div class="text-right w-28 shrink-0">
            <div class="font-bold text-lg gradient-text">${{ item.total_price.toFixed(2) }}</div>
            <button
              class="text-xs text-gray-300 hover:text-red-500 transition-colors mt-1"
              @click="cart.remove(item.id!)"
            >Remove</button>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="bg-white rounded-2xl border border-gray-100 p-6">
        <div class="flex items-center justify-between pb-4 border-b border-gray-100">
          <span class="text-gray-500">Subtotal ({{ cart.count }} items)</span>
          <span class="text-2xl font-bold gradient-text">${{ cart.total }}</span>
        </div>
        <p class="text-[11px] text-gray-400 mt-3">Prices exclude VAT, shipping, and customs duties.</p>

        <div class="flex items-center justify-end gap-3 mt-6">
          <router-link
            to="/"
            class="px-6 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600
              no-underline hover:bg-gray-50 transition-colors"
          >Continue Shopping</router-link>
          <button
            class="px-8 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200
              hover:shadow-lg active:scale-[0.98]"
            style="background: linear-gradient(135deg, #006838, #009444)"
          >Proceed to Quote</button>
        </div>
      </div>
    </div>
  </div>
</template>
