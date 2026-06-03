<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { getHome } from '../api'
import ProductCard from '../components/product/ProductCard.vue'
import { useSeo } from '../composables/useSeo'
import { organizationSchema } from '../composables/schema'
import type { HomeData } from '../types'

const home = ref<HomeData | null>(null)
const ready = ref(false)

useSeo({
  title: 'High-Purity Biochemical Reagents for Research',
  description: 'Modified nucleotides, click chemistry reagents, and molecular biology tools. 109+ products, HPLC-purified, cold chain shipped worldwide. CAS-indexed.',
  jsonld: [organizationSchema()],
})
onMounted(async () => { const { data } = await getHome(); home.value = data; ready.value = true })
</script>
<template>
  <div>
    <section>
      <div class="flex items-end justify-between mb-3">
        <h2 class="text-sm font-bold uppercase tracking-wider" style="color:var(--color-text-primary)">{{ $t("home.allProducts") }}</h2>
        <span class="text-xs" style="color:var(--color-text-tertiary)">{{ home?.total_products || 0 }} {{ $t('home.reagents') }}</span>
      </div>
      <div v-if="!ready" class="grid grid-cols-2 gap-3"><div v-for="n in 4" :key="n" class="skeleton" style="height:136px"></div></div>
      <div v-else class="grid grid-cols-2 gap-3">
        <ProductCard v-for="p in (home?.latest_products || [])" :key="p.id" :product="p" />
      </div>
      <router-link to="/category/modified-nucleotides" class="inline-flex items-center gap-1 mt-4 text-xs font-medium no-underline" style="color:var(--color-link)">
        {{ $t('home.viewAll') }} <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </router-link>
    </section>
  </div>
</template>
