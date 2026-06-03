<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getCategoryDetail, getCategoryProducts } from '../api'
import ProductCard from '../components/product/ProductCard.vue'
import type { ProductListItem } from '../types'

const route = useRoute()
const cat = ref<any>(null)
const products = ref<ProductListItem[]>([])
const total = ref(0)
const page = ref(1)
const ready = ref(false)
const loadingMore = ref(false)

async function load(slug: string, pageNum = 1) {
  if (pageNum === 1) ready.value = false
  else loadingMore.value = true
  try {
    const [d, p] = await Promise.all([
      getCategoryDetail(slug),
      getCategoryProducts(slug, pageNum),
    ])
    cat.value = d.data.category
    if (pageNum === 1) {
      products.value = p.data.results || []
    } else {
      products.value.push(...(p.data.results || []))
    }
    total.value = p.data.count || 0
    page.value = pageNum
  } catch(e){}
  ready.value = true
  loadingMore.value = false
}

function loadMore() {
  load(route.params.slug as string, page.value + 1)
}

onMounted(() => load(route.params.slug as string))
watch(() => route.params.slug, s => s && load(s as string))
</script>

<template>
  <div>
    <nav class="flex items-center gap-1 text-[11px] text-gray-400 mb-4">
      <router-link to="/" class="hover:text-green-600">Home</router-link><span>/</span>
      <span class="text-gray-600 font-medium">{{ cat?.class_name_en || cat?.class_name || '...' }}</span>
    </nav>

    <div v-if="cat" class="mb-5">
      <h1 class="text-xl font-bold text-gray-900">{{ cat.class_name_en || cat.class_name }}</h1>
      <p class="text-[11px] text-gray-400 mt-1">{{ total }} products</p>
    </div>

    <div v-if="!ready" class="grid grid-cols-2 gap-3"><div v-for="n in 4" :key="n" class="h-36 skeleton rounded-lg"></div></div>
    <div v-else-if="products.length" class="grid grid-cols-2 gap-3">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
    <div v-if="products.length < total" class="text-center mt-6">
      <button :disabled="loadingMore" class="btn btn-secondary" @click="loadMore">
        {{ loadingMore ? 'Loading...' : `Load More (${products.length} of ${total})` }}
      </button>
    </div>
    <div v-else class="text-center py-16 text-sm text-gray-400">No products found.</div>
  </div>
</template>
