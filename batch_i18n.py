"""Batch convert hardcoded English text to $t() in all Vue components."""
import re, os

base = 'E:/试剂网站的/260430代码/reagent-frontend/src'

# Map of component -> { find_text: i18n_key }
conversions = {}

# === App.vue Hero text ===
conversions[os.path.join(base, 'App.vue')] = [
    ('99+ Research Products Available', "t('hero.badge')"),
    ('High-Purity<br/>Biochemical Reagents', "t('hero.title')"),
    ('Modified nucleotides and molecular biology tools for demanding research. HPLC-purified, cold chain shipped worldwide.', "t('hero.subtitle')"),
    ('Browse Products', "t('hero.browse')"),
    ('Request a Quote', "t('hero.quote')"),
    ('>Products', '>{{ t("nav.products") }}'),
]

# === HomePage ===
conversions[os.path.join(base, 'pages/HomePage.vue')] = [
    ('Product Categories', "t('home.categories')"),
    ('All Products', "t('home.allProducts')"),
    ('reagents', "t('home.reagents')"),
    ('View all', "t('home.viewAll')"),
    ('Browse', "t('home.browse')"),
]

# === AppFooter ===
footer_path = os.path.join(base, 'components/layout/AppFooter.vue')
conversions[footer_path] = [
    ('High-purity biochemical reagents for research. HPLC-purified, cold chain shipped worldwide.', "t('footer.tagline')"),
    ('>Products<', '>{{ t("footer.products") }}<'),
    ('>Support<', '>{{ t("footer.support") }}<'),
    ('>Contact<', '>{{ t("footer.contact") }}<'),
    ('>Datasheets &amp; MSDS<', '>{{ t("footer.datasheets") }}<'),
    ('>Ordering Information<', '>{{ t("footer.ordering") }}<'),
    ('>Shipping &amp; Delivery<', '>{{ t("footer.shipping") }}<'),
    ('>Terms &amp; Conditions<', '>{{ t("footer.terms") }}<'),
    ('All products are for research use only.', "t('footer.copyright')"),
]

# === SidebarNav ===
sidebar_path = os.path.join(base, 'components/layout/SidebarNav.vue')
conversions[sidebar_path] = [
    ('>Categories<', '>{{ t("sidebar.categories") }}<'),
    ('Advanced Search', "t('sidebar.advancedSearch')"),
]

# === ProductPage ===
prod_path = os.path.join(base, 'pages/ProductPage.vue')
conversions[prod_path] = [
    ('>Formula<', '>{{ t("product.formula") }}<'),
    ('>Mol. Weight<', '>{{ t("product.molWeight") }}<'),
    ('>Purity<', '>{{ t("product.purity") }}<'),
    ('>Concentration<', '>{{ t("product.concentration") }}<'),
    ('>Storage<', '>{{ t("product.storage") }}<'),
    ('>Shipping<', '>{{ t("product.shipping") }}<'),
    ('Synonyms &amp; Introduction', "t('product.synonyms')"),
    ('>Description<', '>{{ t("product.description") }}<'),
    ('>Package Size<', '>{{ t("product.packageSize") }}<'),
    ('>Quantity<', '>{{ t("product.quantity") }}<'),
    ('>Total<', '>{{ t("product.total") }}<'),
    ('>Add to Cart<', '>{{ t("product.addToCart") }}<'),
    ('>Request Quote<', '>{{ t("product.requestQuote") }}<'),
    ('>Request a Quote<', '>{{ t("product.requestQuote") }}<'),
    ('In Stock', "t('product.inStock')"),
    ('Lead time:', "t('product.leadTime')"),
    ('For research use only.', "t('product.ruo')"),
    ("''Added to cart''", "'Added to cart'"),
    ('showToast(', 'showToast(t('),
    ("''Adding...''", "'Adding...'"),
    ('>Order<', '>{{ t("product.order") }}<'),
    ('>Home<', '>{{ t("common.home", "Home") }}<'),
]

# === CategoryPage ===
cat_path = os.path.join(base, 'pages/CategoryPage.vue')
conversions[cat_path] = [
    ('>Load More<', '>{{ t("category.loadMore") }}<'),
    ('No products in this category yet.', "t('category.noProducts')"),
]

# === ProductCard ===
card_path = os.path.join(base, 'components/product/ProductCard.vue')
# Cards use dynamic data, keep as-is

# === SearchPage ===
search_path = os.path.join(base, 'pages/SearchPage.vue')
conversions[search_path] = [
    ('No results found', "t('search.noResults')"),
    ('Try searching by CAS number, product name, or catalog number.', "t('search.hint')"),
    ('results found', "t('search.results')"),
]

for filepath, replacements in conversions.items():
    if not os.path.exists(filepath):
        print(f'  SKIP: {filepath} not found')
        continue
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    changed = 0
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            changed += 1
        else:
            print(f'  MISS: [{old[:60]}]')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  {os.path.basename(filepath)}: {changed} replacements')
