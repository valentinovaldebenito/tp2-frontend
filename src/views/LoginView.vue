<script setup lang="ts">
import { reactive } from 'vue'
import type { User } from '@/models/User.model'
//Importaciones locales
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
const router = useRouter()

//Importaciones de librerías
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  username: Yup.string().required('Nombre de Usuario requerido'),
  password: Yup.string().required('Contraseña requerida')
})

const authStore = useAuthStore()
const userStore = useUserStore()
import { useRouter } from 'vue-router'

/* const user: User = reactive<User>({
  username: '',
  password: '',
  rememberMe: false
}) */

if (authStore.auth.data) {
  router.push('/')
}

function handleSubmit(values: any, { setErrors }: any) {
  const { username, password } = values
  authStore
    .login(username, password)
    .then(() => {
      router.push('/')
    })
    .catch((error) => setErrors({ apiError: error }))
}
</script>

<template>
  <div id="container">
    <div id="card">
      <h1>Login</h1>
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" id="loginForm">
        <div class="input-box">
          <div class="input-div">
            <Field name="username" type="text" :class="{ 'is-invalid': errors.username || errors.apiError }" placeholder="Usuario" required />
          </div>
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>

        <div class="input-box">
          <div class="input-div">
            <Field name="password" type="password" :class="{ 'is-invalid': errors.password || errors.apiError }" placeholder="Contraseña" required />
          </div>
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>

        <div class="rem-for">
          <div>
            <label><input type="checkbox" placeholder="Recordarme" />Recordarme</label>
          </div>
          <div>
            <span>Olvidé mi contraseña</span>
          </div>
        </div>

        <div class="input-div">
          <button type="submit">
            <span v-show="!isSubmitting">INGRESAR</span>
            <p v-show="isSubmitting" class="loader"></p>
          </button>
        </div>
        <div v-if="errors.apiError" class="error-alert">{{ errors.apiError }}</div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
#card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
  height: 400px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 30px 40px;
  border-radius: 15px;
}

.error-alert {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5px;
  color: rgba(255, 25, 25, 0.962);
}

.rem-for {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: small;
  width: 100%;
}

.rem-for input {
  margin-top: 6px;
  margin-right: 6px;
}
.rem-for span:hover {
  cursor: pointer;
  text-decoration: underline;
}

.input-box {
  width: 100%;
  height: 75px;
  padding: 0 10px;
}

.input-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: medium;
  position: relative;
  width: 100%;
  height: 50px;
}

.input-div input {
  color: whitesmoke;
  font-size: medium;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding-left: 12px;
  width: 100%;
  height: 100%;
}

.input-div input .is-invalid {
  color: red;
}

.invalid-feedback {
  height: 5px;
  margin-top: 8px;
  font-size: small;
}

#loginForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 50px 60px;
}

button {
  border: 0;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  height: 100%;
  color: #181818;
  cursor: pointer;
}
button:hover {
  filter: drop-shadow(0px 0px 10px rgb(175, 175, 175));
}
button p {
  font-size: 1.2 rem;
  font-weight: 600;
  color: #333;
}

.loader {
  margin: auto 0;
  width: 24px;
  height: 24px;
  border: 4px solid rgb(152, 152, 152);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#container {
  font-size: larger;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
