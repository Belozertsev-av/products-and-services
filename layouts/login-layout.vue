<template>
  <div class="wrapper">
    <main
      :style="device.isMobileOrTablet ? 'padding: 0 1rem' : 'padding: 0 2rem'"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <slot />
      </transition>
    </main>
  </div>
</template>

<script lang="ts" setup>
const device = useDevice()
</script>
