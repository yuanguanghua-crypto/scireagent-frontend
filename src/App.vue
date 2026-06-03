<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import SidebarNav from './components/layout/SidebarNav.vue'
import DnaHelix from './components/layout/DnaHelix.vue'
import { getCategoryTree } from './api'
import type { ProductClassNode } from './types'

const route = useRoute()
useI18n()
const mobileNav = ref(false)
const navItems = ref<ProductClassNode[]>([])

onMounted(async () => {
  try {
    const { data } = await getCategoryTree()
    navItems.value = data || []
  } catch(e){}
})

function getChildren(slug: string): ProductClassNode[] {
  const node = navItems.value.find(n => n.class_slug === slug)
  return node?.children || []
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:rounded focus:shadow-lg">Skip to content</a>
    <AppHeader />

    <!-- Full-width Hero (homepage only) -->
    <div v-if="route.name === 'home'" class="relative overflow-hidden" style="height:520px;background:radial-gradient(ellipse at center, #0d1b2a 0%, #050a14 100%)">
      <DnaHelix />
      <div class="absolute inset-0" style="background:radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(5,10,20,0.4) 50%, rgba(5,10,20,0.85) 100%)"></div>
      <div class="absolute inset-0" style="background:linear-gradient(to right, rgba(5,10,20,0.9) 0%, rgba(5,10,20,0.5) 40%, transparent 70%)"></div>
      <div class="absolute inset-0 flex items-center">
        <div class="container-site w-full">
          <div class="max-w-xl">
            <div
class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5"
              style="background:rgba(0,255,255,0.08);color:#00ffff;border:1px solid rgba(0,255,255,0.15)">
              <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:#00ffff"></span>
              {{ $t('hero.badge') }}
            </div>
            <h1 class="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              {{ $t('hero.title') }}
            </h1>
            <p class="text-base text-gray-400 max-w-md mb-6 leading-relaxed">
              {{ $t("hero.subtitle") }}
            </p>
            <div class="flex items-center gap-3">
              <router-link to="/category/modified-nucleotides" class="btn" style="background:#00ffff;color:#050a14;font-weight:700">{{ $t("hero.browse") }}</router-link>
              <a href="#" class="text-sm text-gray-400 hover:text-cyan-300 no-underline transition-colors">{{ $t("hero.quote") }} →</a>
            </div>
          </div>
        </div>
      </div>
      <!-- Category nav bar at bottom of hero -->
      <div class="absolute bottom-0 left-0 right-0" style="background:rgba(0,0,0,0.55);backdrop-filter:blur(12px);border-top:1px solid rgba(0,255,255,0.1)">
        <div class="container-site flex items-center gap-2 py-1.5">
          <span class="text-base font-bold text-cyan-400 uppercase tracking-wider mr-5 shrink-0">{{ $t("nav.products") }}</span>
          <div v-for="item in navItems" :key="item.id" class="nav-group relative">
            <router-link
              :to="{name:'category',params:{slug:item.class_slug}}"
              class="nav-trigger block px-4 py-2.5 text-base font-semibold rounded-lg whitespace-nowrap no-underline transition-all duration-200"
              style="color:#c0dcdc"
            >{{ item.class_name_en || item.class_name }}</router-link>
            <div
              v-if="getChildren(item.class_slug).length"
              class="nav-dropdown absolute top-full left-0 z-50">
              <div class="min-w-[240px] rounded-lg overflow-hidden" style="background:rgba(5,10,20,0.97);backdrop-filter:blur(20px);border:1px solid rgba(0,255,255,0.2);box-shadow:0 20px 60px rgba(0,0,0,0.6)">
                <router-link
                  v-for="child in getChildren(item.class_slug)"
                  :key="child.id"
                  :to="{name:'category',params:{slug:child.class_slug}}"
                  class="block px-4 py-3 text-sm font-medium no-underline border-b"
                  style="color:#b0d0d0;border-color:rgba(0,255,255,0.06)"
                >
                  <span class="w-1.5 h-1.5 rounded-full inline-block mr-2" style="background:rgba(0,255,255,0.5)"></span>
                  {{ child.class_name_en || child.class_name }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content: sidebar + page -->
    <main id="main-content" class="flex-1">
      <div class="container-site py-8">
        <button class="lg:hidden btn btn-ghost mb-3 text-sm w-full justify-start" :aria-expanded="mobileNav" @click="mobileNav = !mobileNav">
          ☰ Categories
        </button>
        <div class="flex gap-8">
          <SidebarNav :class="mobileNav ? '!block' : ''" />
          <div class="flex-1 min-w-0">
            <router-view />
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
