import { fetchWrapper } from '@/helpers/fetchWrapper'
import type { User } from '@/models/User.model'
import router from '@/router'
import { defineStore } from 'pinia'

const baseURL = `${import.meta.env.VITE_API_URL}/users`

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    auth: {} as { loading: boolean; data?: User | null; refreshTokenTimeout: number | null }
  }),
  actions: {
    async login(username: string, password: string) {
      this.auth.data = await fetchWrapper.post(`${baseURL}/authenticate`, { username, password }, { credentials: 'include' })
      this.startRefreshTokenTimer()
    },
    logout() {
      fetchWrapper.post(`${baseURL}/revoke-token`, {}, { credentials: 'include' })
      this.stopRefreshTokenTimer()
      this.auth.data = null
      router.push({ name: 'login' })
    },
    async refreshToken() {
      this.auth.data = await fetchWrapper.post(`${baseURL}/refresh-token`, {}, { credentials: 'include' })
      this.startRefreshTokenTimer()
    },
    startRefreshTokenTimer() {
      if (!this.auth.data || !this.auth.data.jsonWebToken) return

      //Parsear de objeto JSON de base64
      const jwtBase64 = this.auth.data.jsonWebToken.split('.')[1]
      const decodedJWT = JSON.parse(atob(jwtBase64))

      //Crear un timeout para refrescar le token antes de que expire
      const expires = new Date(decodedJWT.exp * 1000)
      const timeout = expires.getTime() - Date.now() - 60 * 1000

      this.auth.refreshTokenTimeout = setTimeout(this.refreshToken, timeout)
    },
    stopRefreshTokenTimer() {
      if (this.auth.refreshTokenTimeout) {
        clearTimeout(this.auth.refreshTokenTimeout)
        this.auth.refreshTokenTimeout = null
      }
    }
  }
})
