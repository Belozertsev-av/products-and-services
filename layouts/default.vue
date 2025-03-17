<template>
  <div class="wrapper">
    <ps-header />
    <main
      style="margin-top: 6.1rem"
      :style="device.isMobileOrTablet ? 'padding: 0 1rem' : 'padding: 0 2rem'"
    >
      <company-info
        v-if="!device.isMobileOrTablet && company"
        :company-info="company"
      />
      <category-menu
        v-if="company"
        :agents-count="company.agentsCount"
      />
      <q-separator />
      <slot />
    </main>
    <ps-footer />
  </div>
</template>

<script lang="ts" setup>
import type { ICompanyInfo } from "~/utils/types"

const device = useDevice()

const authStore = useAuthStore()
const company = ref<ICompanyInfo | null>(null)

onBeforeMount(async () => {
  company.value = await $fetch<ICompanyInfo>("/api/companies/1", {
    method: "GET",
    headers: {
      authorization: `Bearer ${authStore.accessToken}`,
    },
  })
})
</script>
