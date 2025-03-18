<template>
  <q-btn
    class="burger-menu"
    icon="menu"
    round
    flat
  >
    <q-popup-proxy>
      <q-card style="min-width: 200px">
        <q-card-section class="bg-primary text-white">
          {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
        </q-card-section>

        <q-card-actions vertical>
          <q-btn
            v-close-popup
            flat
            label="Выйти"
            align="left"
            @click="authStore.logout"
          />
        </q-card-actions>
      </q-card>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
.burger-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
