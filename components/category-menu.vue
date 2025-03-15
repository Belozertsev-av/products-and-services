<template>
  <div
    class="categories"
    :style="device.isMobileOrTablet ? 'padding: 0.5rem 0;' : 'padding: 2rem 0;'"
  >
    <nuxt-link
      to="/products"
      class="link"
    >
      <q-btn padding="sm">Товары и услуги</q-btn>
    </nuxt-link>
    <nuxt-link
      to="/agents"
      class="link"
    >
      <q-btn padding="sm">
        <span class="q-mr-sm">Агенты</span>
        <span class="label-large">{{ agentsCount }}</span>
      </q-btn>
    </nuxt-link>
    <nuxt-link
      to="/about"
      class="link"
    >
      <q-btn padding="sm">О Компании</q-btn>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  agentsCount: number
}>()
const device = useDevice()
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
</style>
