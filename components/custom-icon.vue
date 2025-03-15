<template>
  <svg
    :style="{
      width: size,
      height: size,
      display: inline ? 'inline-block' : 'block',
    }"
    class="icon"
  >
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script lang="ts">
export default {
  name: "CustomIcon",
  inheritAttrs: true,
}
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    size?: string
    inline?: boolean
  }>(),
  {
    size: "1rem",
    inline: false,
  },
)
</script>

<style lang="scss" scoped>
.icon {
  line-height: 1;
  fill: currentcolor;
}
</style>
