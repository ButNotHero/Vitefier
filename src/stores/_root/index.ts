import { acceptHMRUpdate, defineStore } from 'pinia';

export const useRootStore = defineStore('root', {
  state: () => ({
    count: 2,
  }),
  getters: {
    getDouble(state) {
      return state.count * 2;
    },
  },
  actions: {
    resetState() {
      this.$reset();
    },
    increase() {
      ++this.count;
    },
  },
});

// @ts-ignore
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useRootStore, import.meta.hot));
