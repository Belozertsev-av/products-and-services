<template>
  <header
    class="header"
    :style="device.isMobileOrTablet ? 'padding: 0 1rem' : 'padding: 0 2rem'"
  >
    <div
      v-if="device.isMobileOrTablet"
      class="header__block"
    >
      <q-btn
        class="header__burger-menu"
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
    </div>
    <div class="header__block">
      <div class="header__logo title">Annoncé</div>
      <div
        v-if="!device.isMobileOrTablet"
        class="header__catalog"
      >
        <q-btn round>
          <custom-icon
            icon="categories"
            size="1.2rem"
            class="q-mr-sm"
          />
          <span>Категории</span>
        </q-btn>
      </div>
    </div>
    <div
      v-if="!device.isMobileOrTablet"
      class="header__block"
    >
      <div class="header__location row flex-center">
        <custom-icon icon="location" />
        <span class="q-ml-sm-sm">Ростов-на-Дону</span>
      </div>
      <q-separator
        vertical
        inset
      />
      <q-btn
        flat
        round
        >Разместить объявление</q-btn
      >
      <q-btn
        icon="menu"
        round
        class="header__profile-btn"
      >
        <img
          src="/avatar.webp"
          alt="avatar"
          class="header__avatar q-ml-sm"
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
    </div>
    <div
      v-else
      class="header__block"
    >
      <q-btn
        class="header__burger-menu"
        round
        flat
      >
        <custom-icon
          size="1.6rem"
          icon="cart"
        />
      </q-btn>
    </div>
  </header>
</template>

<script setup lang="ts">
const device = useDevice()

const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4.5rem;
  background-color: var(--q-header);

  &__block {
    display: flex;
    gap: 1.8rem;
    align-items: center;
  }

  &__profile-btn {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    background-color: var(--q-secondary);
    border-radius: 2rem;
  }

  &__avatar {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
  }

  &__logo {
    font-family: "Noto Sans", sans-serif;
  }

  &__burger-menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
