<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getNavigation } from '../../api'
import { useCartStore } from '../../stores/cart'
import { useI18n } from 'vue-i18n'
import { supportedLangs, switchLang } from '../../i18n'
import type { ProductClassNode } from '../../types'

const { locale } = useI18n()

const router = useRouter()
const cart = useCartStore()
const nav = ref<ProductClassNode[]>([])
const sq = ref('')

onMounted(async () => {
  try { const { data } = await getNavigation(); nav.value = data.navigation || [] } catch(e){}
  cart.fetchCart()
})

function search() { if(sq.value.trim()) router.push({name:'search',query:{q:sq.value.trim()}}) }
</script>

<template>
  <header class="sticky top-0 z-50 bg-white border-b" style="border-color:var(--color-border-default)">
    <div class="container-site flex items-center gap-5" style="height:52px">
      <router-link to="/" class="flex items-center gap-2 no-underline shrink-0" aria-label="SciReagent Home">
        <div class="badge" style="background:var(--color-primary-500)">SR</div>
        <span class="font-bold text-sm tracking-tight" style="color:var(--color-text-primary)">SciReagent</span>
      </router-link>

      <div class="flex-1" style="max-width:380px">
        <label class="sr-only" for="header-search">Search products</label>
        <div class="relative">
          <input
id="header-search" v-model="sq" type="search" :placeholder="$t('nav.search')"
            class="w-full pl-3 pr-9 h-9 text-sm border rounded-lg transition-all"
            style="background:var(--color-bg-subtle);border-color:var(--color-border-default);color:var(--color-text-primary)"
            @keyup.enter="search"/>
          <button
aria-label="Submit search" class="absolute right-1 top-1/2 grid place-items-center w-7 h-7 rounded" style="transform:translateY(-50%);color:var(--color-text-tertiary)"
            @click="search">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </div>
      </div>

      <nav class="hidden lg:flex items-center gap-1 text-[13px]">
        <a href="#" class="px-3 py-1.5 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors no-underline">{{ $t("nav.resources") }}</a>
        <a href="#" class="px-3 py-1.5 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors no-underline">{{ $t("nav.support") }}</a>
        <a href="/faq" class="px-3 py-1.5 rounded-md font-medium text-white transition-colors no-underline" style="background:var(--color-primary-500)">{{ $t("nav.faq") }}</a>
      </nav>

      <div class="flex-1 hidden lg:block"></div>

      <div class="relative group">
        <button class="btn-ghost px-2 py-1.5 rounded-md text-xs font-medium flex items-center gap-1">
          {{ locale === 'zh' ? '中文' : 'EN' }}
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="absolute right-0 top-full mt-1 hidden group-hover:block z-50 bg-white rounded-lg border shadow-lg py-1 min-w-[120px]">
          <button v-for="lang in supportedLangs" :key="lang.code"
            @click="switchLang(lang.code)"
            class="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors"
            :class="{ 'font-semibold text-green-700': locale === lang.code }"
          >{{ lang.label }}</button>
        </div>
      </div>

      <router-link to="/cart" class="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-md no-underline text-sm font-medium btn-ghost" aria-label="Shopping cart">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
        Cart
        <span
v-if="cart.count" class="absolute grid place-items-center w-4 h-4 rounded-full text-white"
          style="font-size:9px;top:-2px;right:-4px;background:var(--color-primary-500)">{{ cart.count }}</span>
      </router-link>
    </div>
  </header>
</template>
