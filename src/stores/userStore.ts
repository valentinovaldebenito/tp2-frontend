import { defineStore } from 'pinia'
import type { User } from '@/models/User.model'

export const useUserStore = defineStore('user-store', {
  state: (): { user: User } => ({
    user: {
      id: 1,
      firstname: 'Valentino',
      lastname: 'Valdebenito',
      username: 'test',
      password: 'test',
      rememberMe: false,
      isAdmin: false,
      jsonWebToken: '',
      refreshTokens: []
    }
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    }
  }
})
