import os

HTML = r"""<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProductDetail } from '../api'
import { useCartStore } from '../stores/cart'
import { useSeo } from '../composables/useSeo'
import { productSchema, breadcrumbSchema } from '../composables/schema'
import type { ProductDetail, ProductSku } from '../types'

const route = useRoute()
const cart = useCartStore()
const p = ref<ProductDetail | null>(null)
const adding = ref<string | null>(null)

onMounted(load)
watch(() => route.params.slug, load)

function catSlug() { return (route.query.cat as string) || 'modified-nucleotides' }
function catName() { return 'Modified Nucleotides' }

async function load() {
  const { data } = await getProductDetail(route.params.slug as string)
  p.value = data
}

async function addToCart(sku: ProductSku) {
  if (!p.value) return
  adding.value = sku.id.toString()
  try { await cart.add(sku.id, 1) } finally { adding.value = null }
}

useSeo(() => {
  if (!p.value) return { title: 'Loading...', description: '' }
  return {
    title: `${p.value.product_name} | CAS ${p.value.cas_no || 'N/A'} | ${p.value.product_no}`,
    description: `Buy ${p.value.product_name}. CAS ${p.value.cas_no}. Formula ${p.value.formula}. For research use only.`,
    canonical: `https://www.sci-reagent.com/product/${p.value.product_slug}`,
    jsonld: [productSchema({
      product_no: p.value.product_no, product_name: p.value.product_name,
      product_slug: p.value.product_slug, cas_no: p.value.cas_no,
      formula: p.value.formula, molecular_weight: p.value.molecular_weight,
      product_desc: p.value.product_desc, images: p.value.images,
      skus: p.value.skus, category_name: p.value.category_name,
    })],
  }
})
</script>

<template>
  <div v-if="p">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-1 text-xs mb-6" style="color:var(--color-text-tertiary)" aria-label="Breadcrumb">
      <router-link to="/" style="color:var(--color-link)">Home</router-link><span>/</span>
      <router-link :to="{name:'category',params:{slug:catSlug()}}" style="color:var(--color-link)">{{ catName() }}</router-link><span>/</span>
      <span style="color:var(--color-text-secondary)">{{ p.product_name }}</span>
    </nav>

    <!-- HERO: 3 columns -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
      <!-- Structure image -->
      <div class="flex items-center justify-center bg-white rounded-xl border p-6" style="border-color:var(--color-border-default);min-height:240px">
        <img v-if="p.structure_image" :src="p.structure_image" :alt="p.product_name" class="max-w-full max-h-56 object-contain" />
        <div v-else class="text-center" style="color:var(--color-text-tertiary)">
          <svg class="w-10 h-10 mx-auto mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <span class="text-xs">Chemical Structure</span>
        </div>
      </div>

      <!-- Scientific info -->
      <div class="space-y-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="text-xs font-bold font-mono text-white px-2.5 py-1 rounded" style="background:var(--color-primary-500)">{{ p.product_no }}</span>
            <span v-if="p.cas_no" class="text-xs font-mono" style="color:var(--color-text-tertiary)">CAS {{ p.cas_no }}</span>
          </div>
          <h1 class="text-xl font-bold mb-0.5" style="color:var(--color-text-primary)">{{ p.product_name }}</h1>
          <p v-if="p.other_name" class="text-xs font-mono" style="color:var(--color-text-tertiary)">{{ p.other_name }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-if="p.skus?.[0]?.purity" class="text-xs px-2.5 py-1 rounded-full font-medium" style="background:oklch(0.58 0.14 155 / 0.08);color:var(--color-primary-700)">{{ p.skus[0].purity }}</span>
          <span v-if="p.storage_condition" class="text-xs px-2.5 py-1 rounded-full font-medium" style="background:var(--color-neutral-100);color:var(--color-text-secondary)">{{ p.storage_condition }}</span>
          <span v-if="p.shipping_condition" class="text-xs px-2.5 py-1 rounded-full font-medium" style="background:var(--color-neutral-100);color:var(--color-text-secondary)">{{ p.shipping_condition }}</span>
        </div>
        <!-- Parameters table -->
        <table class="w-full text-sm" style="border-collapse:collapse">
          <tr v-if="p.formula" style="border-bottom:1px solid var(--color-border-default)"><td class="py-2 pr-4 font-medium" style="color:var(--color-text-tertiary);width:130px">Formula</td><td class="py-2 font-mono" style="color:var(--color-text-primary)">{{ p.formula }}</td></tr>
          <tr v-if="p.molecular_weight" style="border-bottom:1px solid var(--color-border-default)"><td class="py-2 pr-4 font-medium" style="color:var(--color-text-tertiary)">Mol. Weight</td><td class="py-2" style="color:var(--color-text-primary)">{{ p.molecular_weight }}</td></tr>
          <tr v-if="p.skus?.[0]?.concentration" style="border-bottom:1px solid var(--color-border-default)"><td class="py-2 pr-4 font-medium" style="color:var(--color-text-tertiary)">Concentration</td><td class="py-2" style="color:var(--color-text-primary)">{{ p.skus[0].concentration }}</td></tr>
          <tr v-if="p.shelf_life" style="border-bottom:1px solid var(--color-border-default)"><td class="py-2 pr-4 font-medium" style="color:var(--color-text-tertiary)">Shelf Life</td><td class="py-2" style="color:var(--color-text-primary)">{{ p.shelf_life }}</td></tr>
        </table>
      </div>

      <!-- SKU Table -->
      <div>
        <div class="bg-white rounded-xl border overflow-hidden sticky" style="top:80px;border-color:var(--color-border-default)">
          <div class="px-4 py-3 text-sm font-semibold text-white" style="background:var(--color-primary-500)">Order</div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs" style="border-collapse:collapse">
              <thead>
                <tr style="border-bottom:2px solid var(--color-border-default);background:var(--color-bg-subtle)">
                  <th class="text-left px-3 py-2 font-semibold" style="color:var(--color-text-secondary)">Package</th>
                  <th class="text-left px-3 py-2 font-semibold" style="color:var(--color-text-secondary)">Price</th>
                  <th class="text-center px-3 py-2 font-semibold" style="color:var(--color-text-secondary)">Stock</th>
                  <th class="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sku in p.skus" :key="sku.id" style="border-bottom:1px solid var(--color-border-default)">
                  <td class="px-3 py-2.5">
                    <div class="font-medium" style="color:var(--color-text-primary)">{{ sku.amount }}</div>
                    <div v-if="sku.purity" class="text-[10px]" style="color:var(--color-text-tertiary)">{{ sku.purity }}</div>
                  </td>
                  <td class="px-3 py-2.5 font-bold" style="color:var(--color-primary-600)">${{ sku.price }}</td>
                  <td class="px-3 py-2.5 text-center">
                    <span class="text-[10px] px-1.5 py-0.5 rounded-full font-medium" :style="sku.stock_status==='IN_STOCK'?'color:var(--color-success);background:oklch(0.55 0.16 155 / 0.08)':'color:var(--color-text-tertiary);background:var(--color-neutral-100)'">{{ sku.stock_label }}</span>
                  </td>
                  <td class="px-2 py-2.5">
                    <button @click="addToCart(sku)" :disabled="adding===sku.id.toString()" class="text-[11px] font-semibold px-3 py-1.5 rounded transition-all" :style="adding===sku.id.toString()?'background:var(--color-neutral-200);color:var(--color-text-tertiary)':'background:var(--color-primary-500);color:#fff'">{{ adding===sku.id.toString()?'...':'Add' }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 space-y-2">
            <button class="w-full btn-secondary justify-center text-sm">Request Quote</button>
            <div class="text-[10px] text-center" style="color:var(--color-text-tertiary)">For research use only.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- DESCRIPTION ZONE -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <section v-if="p.product_desc">
          <h2 class="text-base font-bold mb-3" style="color:var(--color-text-primary)">Overview</h2>
          <div class="text-sm leading-relaxed" style="color:var(--color-text-secondary)" v-html="p.product_desc"></div>
        </section>
        <section v-if="p.applications?.length">
          <h2 class="text-base font-bold mb-3" style="color:var(--color-text-primary)">Applications</h2>
          <ul class="space-y-1.5"><li v-for="a in p.applications" :key="a.id" class="flex items-start gap-2 text-sm" style="color:var(--color-text-secondary)"><span style="color:var(--color-primary-400)">&#8226;</span>{{ a.app_name }}</li></ul>
        </section>
        <section v-if="p.storage_condition||p.handling_notes">
          <h2 class="text-base font-bold mb-3" style="color:var(--color-text-primary)">Storage &amp; Handling</h2>
          <ul class="space-y-1.5 text-sm" style="color:var(--color-text-secondary)">
            <li v-if="p.storage_condition" class="flex items-start gap-2"><span style="color:var(--color-primary-400)">&#8226;</span>{{ p.storage_condition }}</li>
            <li v-if="p.shelf_life" class="flex items-start gap-2"><span style="color:var(--color-primary-400)">&#8226;</span>Shelf life: {{ p.shelf_life }}</li>
            <li v-if="p.handling_notes" class="flex items-start gap-2"><span style="color:var(--color-primary-400)">&#8226;</span>{{ p.handling_notes }}</li>
            <li class="flex items-start gap-2"><span style="color:var(--color-primary-400)">&#8226;</span>For research use only.</li>
          </ul>
        </section>
        <section v-if="p.shipping_condition||p.skus?.[0]?.shipping_condition">
          <h2 class="text-base font-bold mb-3" style="color:var(--color-text-primary)">Shipping</h2>
          <p class="text-sm" style="color:var(--color-text-secondary)">{{ p.shipping_condition||p.skus?.[0]?.shipping_condition }}</p>
        </section>
        <section v-if="p.parameters?.length">
          <h2 class="text-base font-bold mb-3" style="color:var(--color-text-primary)">Technical Specifications</h2>
          <div class="divide-y" style="border-color:var(--color-border-default)">
            <div v-for="pm in p.parameters" :key="pm.id" class="flex justify-between py-2.5 text-sm">
              <dt class="font-medium" style="color:var(--color-text-tertiary);min-width:160px">{{ pm.param_name }}</dt>
              <dd class="text-right" style="color:var(--color-text-primary)" v-html="pm.parameter_value||pm.parameter_line"></dd>
            </div>
          </div>
        </section>
        <section v-if="p.datasheet_pdf||p.msds_pdf">
          <h2 class="text-base font-bold mb-3" style="color:var(--color-text-primary)">Downloads</h2>
          <div class="flex flex-wrap gap-3">
            <a v-if="p.datasheet_pdf" :href="p.datasheet_pdf" target="_blank" class="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border no-underline hover:bg-gray-50" style="border-color:var(--color-border-default);color:var(--color-text-secondary)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Datasheet
            </a>
            <a v-if="p.msds_pdf" :href="p.msds_pdf" target="_blank" class="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border no-underline hover:bg-gray-50" style="border-color:var(--color-border-default);color:var(--color-text-secondary)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              MSDS
            </a>
          </div>
        </section>
        <section v-if="p.product_intro">
          <h2 class="text-base font-bold mb-3" style="color:var(--color-text-primary)">Synonyms &amp; References</h2>
          <div class="text-sm leading-relaxed" style="color:var(--color-text-secondary)" v-html="p.product_intro"></div>
        </section>
      </div>
    </div>
  </div>
</template>
"""

path = 'E:/试剂网站的/260430代码/reagent-frontend/src/pages/ProductPage.vue'
with open(path, 'w', encoding='utf-8') as f:
    f.write(HTML)
print('ProductPage.vue written')
