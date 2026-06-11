import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// Site
export const getNavigation = () => api.get('/site/navigation')
export const getHome = () => api.get('/site/home')

// Category
export const getCategoryTree = () => api.get('/category/tree')
export const getCategoryDetail = (slug: string) => api.get(`/category/${slug}`)
export const getCategoryProducts = (slug: string, page = 1) =>
  api.get(`/category/${slug}/products`, { params: { page } })

// Product
export const getProductDetail = (slug: string) => api.get(`/product/${slug}`)
export const getProductSkus = (slug: string) => api.get(`/product/${slug}/skus`)

// Search
export const searchProducts = (q: string, category?: string, page = 1) =>
  api.get('/search', { params: { q, category, page } })
export const searchSuggest = (q: string) => api.get('/search/suggest', { params: { q } })

// Cart
export const getCart = () => api.get('/cart')
export const addToCart = (skuId: number, quantity = 1) =>
  api.post('/cart/items', { sku_id: skuId, quantity })
export const updateCartItem = (id: number, quantity: number) =>
  api.patch(`/cart/items/${id}`, { quantity })
export const deleteCartItem = (id: number) => api.delete(`/cart/items/${id}/delete`)

export default api
