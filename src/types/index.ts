export interface ProductClassNode {
  id: number
  class_name: string
  class_name_en: string
  class_slug: string
  level: number
  order_index: number
  on_sale: boolean
  children?: ProductClassNode[]
}

export interface ProductListItem {
  id: number
  product_no: string
  product_name: string
  product_name_en: string
  product_slug: string
  cas_no: string
  formula: string
  molecular_weight: string
  status: string
  on_sale: boolean
  default_sku?: ProductSku
}

export interface ProductDetail {
  id: number
  product_no: string
  product_name: string
  product_name_en: string
  product_slug: string
  other_name: string
  cas_no: string
  formula: string
  molecular_weight: string
  structure_smiles: string | null
  structure_image: string | null
  storage_condition: string | null
  shipping_condition: string | null
  handling_notes: string | null
  shelf_life: string | null
  product_desc: string
  product_intro: string
  para: string
  datasheet_pdf: string | null
  msds_pdf: string | null
  seo_title: string
  seo_description: string
  seo_keywords: string
  status: string
  on_sale: boolean
  skus: ProductSku[]
  images: ProductImage[]
  parameters: ProductParameter[]
  applications: Application[]
  category_name: string
}

export interface ProductSku {
  id: number
  cat_no: string
  sku_no: string
  amount: string
  pack_size: string
  unit: string
  purity: string
  concentration: string
  price: string
  currency: string
  stock_status: string
  stock_label: string
  lead_time_days: number | null
  storage_condition: string
  shipping_condition: string
  is_default: boolean
}

export interface ProductImage {
  id: number
  image: string
  image_name: string
}

export interface ProductParameter {
  id: number
  param_name: string
  parameter_value: string
  parameter_line: string
}

export interface Application {
  id: number
  app_name: string
  app_name_en: string
  app_slug: string
  app_desc: string
}

export interface CartItem {
  id?: number
  product_catalog: number
  sku_info: ProductSku
  number: number
  total_price: number
}

export interface HomeData {
  categories: ProductClassNode[]
  latest_products: ProductListItem[]
  total_products: number
}
