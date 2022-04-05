import { defineStore } from 'pinia';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  email: string;
};

type UserState = {
  users: User[];
};

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
  }),
  getters: {},
  actions: {
    async getAllUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => {
          this.users = json;
        });
      // const res = await axios.get('/users');
      // this.users = res.data;
    },
  },
});
