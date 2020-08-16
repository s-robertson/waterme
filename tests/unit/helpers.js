import Vuex from "vuex";
import merge from "lodash/merge";

export const createStore = (defaultOptions = {}, overrides = {}) => {
  return new Vuex.Store(merge(defaultOptions, overrides));
};
