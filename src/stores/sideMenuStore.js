import { defineStore } from "pinia";

export const sideMenuStore = defineStore({
  id: "customizeTheme",
  state: () => ({
    miniSidebar: true,
  }),

  getters: {},
  actions: {
    setMiniSideBar(payload) {
      this.miniSidebar = payload;
    },

    setMainSideBar(payload) {
      this.mainSidebar = payload;
    },
  },
});
