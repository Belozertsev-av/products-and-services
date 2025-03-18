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
import type { ICompany, ICompanyInfo, IStatistics } from "~/utils/types"
import { useAPI } from "~/composables/useAPI"

const device = useDevice()

const company = ref<ICompany | null>(null)

onBeforeMount(async () => {
  const companyId = 1 // STUB

  const [companyInfo, companyRating] = await Promise.all([
    await useAPI().get<ICompanyInfo>(`companies/${companyId}`),
    await useAPI().get<IStatistics>("companies/rating", {
      params: {
        id: companyId,
      },
    }),
  ])

  if (companyInfo && companyRating) {
    company.value = {
      ...companyInfo,
      ...companyRating,
    }
  }
})
</script>
