<template>
  <div class="login">
    <div class="login__title title">Annoncé</div>
    <div class="login__text pale-color">
      Чтобы продолжить работу в приложении, авторизируйтесь
    </div>
    <q-form
      class="login__form"
      @submit="onSubmit"
    >
      <q-input
        v-model="form.login"
        :rules="[(val) => !!val || 'Обязательное поле']"
        label="Логин"
        outlined
      />
      <q-input
        v-model="form.password"
        :rules="[(val) => !!val || 'Обязательное поле']"
        filled
        :type="isPasswordType ? 'password' : 'text'"
        label="Пароль"
        outlined
      >
        <template #append>
          <q-icon
            :name="isPasswordType ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPasswordType = !isPasswordType"
          />
        </template>
      </q-input>
      <q-btn
        unelevated
        type="submit"
        color="primary"
        label="Войти"
        :disable="!form.login || !form.password"
        :loading="loading"
      />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth"
import { useQuasar } from "quasar"
import type { IUserCredentials } from "~/utils/types"
definePageMeta({
  layout: "login-layout",
})
const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()

const form = reactive<IUserCredentials>({
  login: "",
  password: "",
})
const isPasswordType = ref(true)
const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  try {
    await authStore.login({
      login: form.login,
      password: form.password,
    })

    $q.notify({
      type: "positive",
      color: "primary",
      message: "Успешный вход!",
      position: "bottom",
    })

    await router.push("/products")
    resetForm()
  } catch (error) {
    $q.notify({
      type: "negative",
      message: error.response?.data?.message || "Ошибка авторизации",
      position: "bottom",
    })
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.login = ""
  form.password = ""
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  height: 100%;
  margin: 0 auto;

  &__title {
    padding-bottom: 2rem;
  }

  &__text {
    padding-bottom: 1rem;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
}
</style>
