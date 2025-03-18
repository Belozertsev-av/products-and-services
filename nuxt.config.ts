// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    baseApi: process.env.API_BASE_URL,
  },
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
    "@prisma/nuxt",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  quasar: {
    plugins: ["Notify"],
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
  prisma: {
    autoSetupPrisma: true,
  },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },
})
