<template>
  <div class="wrapper">
    <ps-header />
    <main
      :style="device.isMobileOrTablet ? 'padding: 0 1rem' : 'padding: 0 2rem'"
    >
      <company-info
        v-if="!device.isMobileOrTablet"
        :company-info="company"
      />
      <category-menu :agents-count="company.agentsCount" />
      <q-separator />
      <slot />
    </main>
    <ps-footer />
  </div>
</template>

<script lang="ts" setup>
import type { ICompanyInfo } from "~/utils/types"

const device = useDevice()

const company = ref<ICompanyInfo>({
  name: "Наследие",
  phoneNumber: "+7 (951) 669-21-54",
  img: "company_logo.webp",
  agentsCount: 6,
  premium: true,
  rate: 4.7,
  reviewCount: 19,
})
</script>
