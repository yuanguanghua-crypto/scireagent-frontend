<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchProducts } from '../api'
import ProductCard from '../components/product/ProductCard.vue'
import type { ProductListItem } from '../types'

const route = useRoute()
const results = ref<ProductListItem[]>([])
const total = ref(0)
const query = ref('')
const loading = ref(false)

async function doSearch() {
  query.value = (route.query.q as string) || ''
  if (!query.value) return
  loading.value = true
  try {
    const { data } = await searchProducts(query.value)
    results.value = data.results?.products || []
    total.value = data.count || 0
  } finally {
    loading.value = false
  }
}

onMounted(doSearch)
watch(() => route.query.q, doSearch)
</script>

<template>
  <div class="py-2">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
        Search: "{{ query }}"
      </h1>
      <p class="text-gray-400 mt-2">{{ total }} $t('search.results')</p>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="n in 6" :key="n" class="h-48 skeleton rounded-2xl"></div>
    </div>

    <div v-else-if="results.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard v-for="p in results" :key="p.id" :product="p" />
    </div>

    <div v-else-if="query" class="text-center py-20">
      <div class="text-5xl mb-4">🔍</div>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">$t('search.noResults')</h3>
      <p class="text-gray-400">
        $t('search.hint')
      </p>
    </div>
  </div>
</template>
