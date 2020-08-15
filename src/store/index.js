import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import state from "./state";
import appSyncPlugin from "@/store/plugins/appSync";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [appSyncPlugin]
});
