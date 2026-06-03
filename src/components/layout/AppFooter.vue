<template>
  <footer style="background:var(--color-neutral-800);color:var(--color-neutral-400)">
    <div class="container-site py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <div class="flex items-center gap-2 mb-3">
          <div class="badge" style="background:var(--color-primary-500)">SR</div>
          <span class="text-white font-semibold text-sm">SciReagent</span>
        </div>
        <p class="text-xs leading-relaxed">{{ $t('footer.tagline') }}</p>
      </div>
      <div>
        <h4 class="text-white text-xs font-semibold uppercase tracking-wider mb-3">{{ $t("footer.products") }}</h4>
        <ul class="flex flex-col gap-1.5 text-xs list-none">
          <li><router-link to="/category/modified-nucleotides" class="hover:text-white transition-colors no-underline" style="color:inherit">Modified Nucleotides</router-link></li>
          <li><router-link to="/category/8-oxo-modified-nucleotides" class="hover:text-white transition-colors no-underline" style="color:inherit">8-Oxo Series</router-link></li>
          <li><router-link to="/category/2-thio-modified-nucleotides" class="hover:text-white transition-colors no-underline" style="color:inherit">2-Thio Series</router-link></li>
          <li><router-link to="/category/6-thio-modified-nucleotides" class="hover:text-white transition-colors no-underline" style="color:inherit">6-Thio Series</router-link></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white text-xs font-semibold uppercase tracking-wider mb-3">{{ $t("footer.support") }}</h4>
        <ul class="flex flex-col gap-1.5 text-xs list-none">
          <li><a href="#" class="hover:text-white transition-colors no-underline" style="color:inherit">{{ $t("footer.datasheets") }}</a></li>
          <li><a href="#" class="hover:text-white transition-colors no-underline" style="color:inherit">{{ $t("footer.ordering") }}</a></li>
          <li><a href="#" class="hover:text-white transition-colors no-underline" style="color:inherit">{{ $t("footer.shipping") }}</a></li>
          <li><a href="#" class="hover:text-white transition-colors no-underline" style="color:inherit">{{ $t("footer.terms") }}</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white text-xs font-semibold uppercase tracking-wider mb-3">{{ $t("footer.contact") }}</h4>
        <ul class="flex flex-col gap-1.5 text-xs list-none">
          <li>info@sci-reagent.com</li>
          <li>For Research Use Only</li>
        </ul>
      </div>
    </div>
    <div class="text-center py-4 text-xs" style="border-top:1px solid var(--color-neutral-700);color:var(--color-neutral-600)">
      &copy; {{ new Date().getFullYear() }} SciReagent. {{ $t('footer.copyright') }}
    </div>
  </footer>
</template>
