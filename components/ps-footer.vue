<template>
  <footer
    class="footer"
    :class="device.isMobileOrTablet ? 'column' : 'row'"
    :style="device.isMobileOrTablet ? 'padding: 1rem' : 'padding: 2rem'"
  >
    <div class="footer__copyright">© Annonce 2023</div>
    <ul class="footer__menu">
      <li class="li footer__menu-item pale-color">Документы</li>
      <li class="li footer__menu-item pale-color">О компании</li>
      <li
        v-if="device.isMobileOrTablet"
        class="li footer__menu-item pale-color"
      >
        Продавцам
      </li>
      <li
        v-if="device.isMobileOrTablet"
        class="li footer__menu-item pale-color"
      >
        Покупателям
      </li>
      <li
        v-if="device.isMobileOrTablet"
        class="li footer__menu-item pale-color"
      >
        Разместить объявление
      </li>
    </ul>
    <div class="footer__lang">
      <custom-icon
        icon="lang-rus"
        size="1.4em"
      />
      <span>Русский</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const device = useDevice()
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  gap: 3rem;
  align-items: center;
  width: 100%;
  height: 5.8rem;
  background-color: var(--q-footer);
  border-top: 1px solid rgb(0 0 0 / 24%);

  &__menu {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  &__menu-item {
    cursor: pointer;
  }

  &__lang {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
  }
}

.column {
  flex-direction: column;
  align-items: flex-start;
  height: fit-content;

  .footer__menu {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
