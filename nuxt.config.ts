// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    layoutTransition: { name: "fade", mode: "out-in" },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/device",
    "nuxt-quasar-ui",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "vue-yandex-maps/nuxt",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  quasar: {
    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
        QSelect: {
          outlined: true,
        },
      },
    },
  },
  fonts: {
    families: [
      { name: "Inter", provider: "google" },
      { name: "Noto Sans", provider: "google" },
    ],
  },
  css: ["@/assets/styles/quasar-overrides.scss"],
  yandexMaps: {
    apikey: process.env.YANDEX_MAP_API_KEY,
  },
})
