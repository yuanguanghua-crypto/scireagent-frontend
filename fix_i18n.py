"""Quick fix: replace key hardcoded text in AppHeader with i18n $t() calls."""
import sys

path = 'E:/试剂网站的/260430代码/reagent-frontend/src/components/layout/AppHeader.vue'
with open(path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# Replace nav links
content = content.replace('>Resources<', '>{{ t("nav.resources") }}<')
content = content.replace('>Support<', '>{{ t("nav.support") }}<')
content = content.replace('>FAQ<', '>{{ t("nav.faq") }}<')
content = content.replace('>Cart<', '>{{ t("nav.cart") }}<')

# Replace search placeholder
old_search = 'placeholder="Search CAS#, product, catalog no..."'
new_search = ':placeholder="t(\'nav.search\')"'
content = content.replace(old_search, new_search)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
