<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCategoryTree } from '../../api'
import type { ProductClassNode } from '../../types'

const route = useRoute()
const tree = ref<ProductClassNode[]>([])
const expanded = ref<Record<number, boolean>>({})

onMounted(async () => {
  try { const { data } = await getCategoryTree(); tree.value = data; data.forEach((n:ProductClassNode) => expanded.value[n.id]=true) } catch(e){}
})

function isActive(slug: string) { return route.params.slug === slug || route.path.includes(slug) }
function toggle(id: number) { expanded.value[id] = !expanded.value[id] }
</script>

<template>
  <aside class="shrink-0 hidden lg:block" style="width:200px" aria-label="Category navigation">
    <nav class="sticky flex flex-col gap-0.5" style="top:76px">
      <h2 class="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style="color:var(--color-text-tertiary)">{{ $t("sidebar.categories") }}</h2>
      <template v-for="node in tree" :key="node.id">
        <button
class="w-full flex items-center gap-2 px-1 py-1.5 text-sm font-medium rounded transition-colors hover:bg-neutral-100" :aria-expanded="expanded[node.id]"
          :style="{color: 'var(--color-text-secondary)'}"
          @click="toggle(node.id)">
          <svg class="w-3 h-3 transition-transform shrink-0" :class="{ 'rotate-90': expanded[node.id] }" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--color-text-tertiary)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          {{ node.class_name_en || node.class_name }}
        </button>
        <div v-if="expanded[node.id] && node.children" class="ml-3 flex flex-col gap-0.5 mb-1">
          <router-link
v-for="child in node.children" :key="child.id"
            :to="{ name: 'category', params: { slug: child.class_slug } }"
            :class="['sidebar-link', { active: isActive(child.class_slug) }]"
            :aria-current="isActive(child.class_slug) ? 'page' : undefined">
            <span class="w-1 h-1 rounded-full shrink-0" :style="{background: isActive(child.class_slug) ? 'var(--color-primary-400)' : 'var(--color-neutral-300)'}"></span>
            {{ child.class_name_en || child.class_name }}
          </router-link>
        </div>
      </template>
      <div class="mt-4 pt-3 border-t" style="border-color:var(--color-border-default)">
        <router-link to="/search" class="sidebar-link text-xs">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          {{ $t('sidebar.advancedSearch') }}
        </router-link>
      </div>
    </nav>
  </aside>
</template>
