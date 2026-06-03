<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { ProductListItem } from '../../types'
defineProps<{ product: ProductListItem }>()
const router = useRouter()
</script>

<template>
  <article
class="card p-4 cursor-pointer group" role="button" tabindex="0"
    :aria-label="`${product.product_name}, ${product.cas_no || ''}`"
    @click="router.push({name:'product',params:{slug:product.product_slug}})"
    @keydown.enter="router.push({name:'product',params:{slug:product.product_slug}})">
    <div class="flex items-start justify-between mb-2">
      <span class="badge" style="background:var(--color-primary-500);color:#fff">{{ product.product_no }}</span>
      <span v-if="product.cas_no" class="text-xs font-mono" style="color:var(--color-text-tertiary)">{{ product.cas_no }}</span>
    </div>
    <h3 class="text-sm font-semibold mb-2 leading-snug line-clamp-2" style="color:var(--color-text-primary)">{{ product.product_name }}</h3>
    <div class="flex flex-wrap gap-1 mb-3">
      <span v-if="product.formula" class="tag tag-chemical">{{ product.formula }}</span>
      <span v-if="product.molecular_weight" class="tag tag-property">{{ product.molecular_weight }}</span>
    </div>
    <div v-if="product.default_sku" class="flex items-end justify-between pt-2 border-t" style="border-color:var(--color-neutral-100)">
      <div class="flex items-center gap-2">
        <span class="text-xs" style="color:var(--color-text-tertiary)">{{ product.default_sku.amount }}</span>
      </div>
      <span class="text-base font-bold" style="color:var(--color-primary-600)">${{ product.default_sku.price }}</span>
    </div>
  </article>
</template>
