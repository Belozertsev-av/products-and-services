<template>
  <q-btn
    icon="menu"
    round
    class="profile-menu"
  >
    <img
      src="/avatar.webp"
      alt="avatar"
      class="profile-menu__avatar q-ml-sm"
    />
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
.profile-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  background-color: var(--q-secondary);
  border-radius: 2rem;

  &__avatar {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
  }
}
</style>
