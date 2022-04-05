import { defineStore } from 'pinia';

type AuthUser = {
  name: string;
  email: string;
};

type AuthState = {
  loggedIn: boolean;
  user: AuthUser | null;
};

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    loggedIn: false,
    user: null,
  }),
  getters: {},
  actions: {
    login(email: string, password: string) {
      if (email === 'admin@example.com' && password === 'secret') {
        this.loggedIn = true;
        this.user = {
          name: 'John Doe',
          email,
        };

        return true;
      }
      return false;
    },
    logout() {
      this.loggedIn = false;
      this.user = null;
    },
  },
});
