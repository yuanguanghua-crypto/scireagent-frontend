<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { faqSchema } from '../composables/schema'

const faqs = [
  {
    question: 'What purity grade are SciReagent modified nucleotides?',
    answer: 'All SciReagent modified nucleotides are ≥90% purity by HPLC, with most products ≥95%. Each product datasheet specifies the exact purity and analytical method used. For critical applications, we recommend requesting a Certificate of Analysis (COA) for your specific lot.',
  },
  {
    question: 'How should I store modified nucleotides?',
    answer: 'All SciReagent modified nucleotides should be stored at -20°C upon receipt. Avoid repeated freeze-thaw cycles. For long-term storage (>6 months), we recommend storage at -80°C. Products are shipped with blue ice to maintain cold chain during transit.',
  },
  {
    question: 'What concentration are your nucleotide solutions?',
    answer: 'Most SciReagent nucleotide solutions are supplied at 100 mM concentration in nuclease-free water. Some specialty products (e.g., fluorescent-labeled nucleotides) are supplied at 10 mM. The exact concentration is specified on each product page and datasheet.',
  },
  {
    question: 'How do I place a purchase order (PO)?',
    answer: 'We accept purchase orders from universities, research institutes, and biotech companies. Email your PO to orders@sci-reagent.com with your institution details, billing address, and product catalog numbers. For large orders or custom synthesis, use the Request Quote button on any product page.',
  },
  {
    question: 'What is the shelf life of modified nucleotides?',
    answer: 'When stored at -20°C, SciReagent modified nucleotides are stable for 12 months from the date of manufacture. Lyophilized products may have extended stability. Each product datasheet includes specific stability data and recommended storage conditions.',
  },
  {
    question: 'Are SciReagent products suitable for GMP manufacturing?',
    answer: 'SciReagent products are for Research Use Only (RUO) and are not manufactured under GMP conditions. For GMP-grade materials, please contact us about our custom synthesis services. We can provide documentation including Certificates of Analysis and MSDS for all products.',
  },
  {
    question: 'How can I search products by CAS number?',
    answer: 'Enter the CAS number (with or without hyphens) in the search bar at the top of any page. For example, searching "3056945-23-1" or "3056945231" will find 8-Oxo-dATP. You can also search by catalog number (e.g., SC8063), product name, or molecular formula.',
  },
  {
    question: 'What shipping methods do you use?',
    answer: 'All nucleotide products are shipped with blue ice via FedEx or UPS Express. Shipping is CPT (Carriage Paid To) per Incoterms 2020. Delivery typically takes 2-5 business days depending on destination. Customs duties and import taxes are the responsibility of the recipient.',
  },
]

useSeo({
  title: 'FAQ — Ordering, Storage & Product Information',
  description: 'Frequently asked questions about SciReagent modified nucleotides: purity grades, storage conditions, ordering process, shipping methods, and technical specifications.',
  jsonld: [faqSchema(faqs)],
})
</script>

<template>
  <div class="max-w-3xl">
    <h1 class="text-2xl font-bold mb-2" style="color:var(--color-text-primary)">Frequently Asked Questions</h1>
    <p class="text-sm mb-8" style="color:var(--color-text-tertiary)">Ordering, storage, and technical information for SciReagent products.</p>

    <div class="space-y-6">
      <article v-for="(faq, i) in faqs" :key="i" class="card p-5">
        <h2 class="text-base font-semibold mb-2" style="color:var(--color-text-primary)">{{ faq.question }}</h2>
        <p class="text-sm leading-relaxed" style="color:var(--color-text-secondary)">{{ faq.answer }}</p>
      </article>
    </div>

    <div class="mt-8 p-5 rounded-lg" style="background:var(--color-bg-subtle)">
      <p class="text-sm" style="color:var(--color-text-secondary)">
        <strong>Didn't find your answer?</strong> Contact our technical support team at
        <a href="mailto:support@sci-reagent.com" style="color:var(--color-link)">support@sci-reagent.com</a>
      </p>
    </div>
  </div>
</template>
