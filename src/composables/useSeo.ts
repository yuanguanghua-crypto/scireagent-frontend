import { onUnmounted } from 'vue'

interface SeoInput {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
  jsonld?: Record<string, any>[]
}

const DEFAULT_TITLE = 'SciReagent — High-Purity Biochemical Reagents'
const DEFAULT_DESC = 'Modified nucleotides, click chemistry reagents, and molecular biology tools. HPLC-purified, cold chain shipped worldwide. Research use only.'

export function useSeo(input: SeoInput | (() => SeoInput)) {
  const data = typeof input === 'function' ? input() : input
  const title = data.title ? `${data.title} | SciReagent` : DEFAULT_TITLE
  const desc = data.description || DEFAULT_DESC

  // Meta tags
  document.title = title
  setMeta('description', desc)
  setMeta('og:title', title)
  setMeta('og:description', desc)
  setMeta('og:type', data.jsonld?.some(j => j['@type'] === 'Product') ? 'product' : 'website')
  setMeta('twitter:card', 'summary')
  setMeta('twitter:title', title)
  setMeta('twitter:description', desc)

  if (data.canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = data.canonical
  }

  if (data.noindex) {
    setMeta('robots', 'noindex, nofollow')
  }

  // JSON-LD
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
  existingScripts.forEach(s => s.remove())

  if (data.jsonld) {
    for (const ld of data.jsonld) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(ld, null, 2)
      document.head.appendChild(script)
    }
  }

  // Cleanup
  onUnmounted(() => {
    document.title = DEFAULT_TITLE
    setMeta('description', DEFAULT_DESC)
  })
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      el.setAttribute('property', name)
    } else {
      el.setAttribute('name', name)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}
