/**
 * Generate JSON-LD structured data for Product pages.
 * Includes chemical properties for rich search results.
 */
export function productSchema(p: {
  product_no: string
  product_name: string
  product_slug: string
  cas_no?: string
  formula?: string
  molecular_weight?: string
  product_desc?: string
  images?: { image: string }[]
  skus?: { amount: string; price: string; cat_no: string; stock_status: string }[]
  category_name?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.product_name,
    sku: p.product_no,
    description: stripHtml(p.product_desc || '').substring(0, 300),
    image: p.images?.map(i => i.image) || [],
    category: p.category_name || '',
    identifier: [
      ...(p.cas_no ? [{ '@type': 'PropertyValue', propertyID: 'CAS', value: p.cas_no }] : []),
    ],
    additionalProperty: [
      ...(p.formula ? [{ '@type': 'PropertyValue', name: 'Molecular Formula', value: p.formula }] : []),
      ...(p.molecular_weight ? [{ '@type': 'PropertyValue', name: 'Molecular Weight', value: p.molecular_weight }] : []),
    ],
    offers: (p.skus || []).map(s => ({
      '@type': 'Offer',
      sku: s.cat_no,
      price: s.price,
      priceCurrency: 'USD',
      availability: s.stock_status === 'IN_STOCK'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      eligibleRegion: { '@type': 'Place', name: 'Worldwide' },
    })),
  }
}

/**
 * FAQ structured data for AEO / featured snippets.
 */
export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}

/**
 * BreadcrumbList structured data.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Organization schema for the homepage.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SciReagent',
    url: 'https://www.sci-reagent.com',
    description: 'High-purity biochemical reagents for research laboratories worldwide.',
    knowsAbout: [
      'Modified Nucleotides',
      'Click Chemistry',
      'Fluorescent Labeling',
      'Molecular Biology',
      'Biochemical Reagents',
    ],
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}
