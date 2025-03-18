export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  // Проверяем авторизацию (с обновлением токена при необходимости)
  const isAuthenticated = await authStore.checkAuth()

  // Для авторизованных пользователей
  if (isAuthenticated) {
    // Если пытаются перейти на "/" или "/login" — редирект на "/products"
    if (to.path === "/login") {
      return navigateTo("/products", { redirectCode: 301, replace: true })
    }
    return
  }

  // Для неавторизованных пользователей
  if (to.path !== "/login") {
    return navigateTo("/login", { replace: true })
  }
})
