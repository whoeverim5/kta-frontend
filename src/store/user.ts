import { defineStore } from 'pinia';

type UserState = {
  account: string | null;
  password: string | null;
  email: string | null;
};

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    account: null,
    password: null,
    email: null,
  }),
});

export default useUserStore;
