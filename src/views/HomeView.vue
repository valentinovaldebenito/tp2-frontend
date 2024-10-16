<script setup lang="ts">
import type { User } from '@/models/User.model'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { reactive } from 'vue'

const authStore = useAuthStore()
const user: User = reactive<User>(useUserStore().user)

function logout() {
  authStore.logout()
}
</script>

<template>
  <div id="container">
    <div id="user-card">
      <div id="info">
        <span>Nombre: {{ user.firstname }}</span>
        <span>Apellido: {{ user.lastname }}</span>
        <span>Usuario: {{ user.username }}</span>
        <span>Admin: {{ user.isAdmin }}</span>
      </div>
      <div id="button">
        <button @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

#info {
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 85%;
  width: 100%;
}
#button {
  height: 15%;
  width: 100%;
}

#user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 330px;
  height: 330px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 30px 40px;
  border-radius: 15px;
}

button {
  border: 0;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  height: 50px;
  color: #181818;
  cursor: pointer;
}
button:hover {
  filter: drop-shadow(0px 0px 10px rgb(175, 175, 175));
}
</style>
