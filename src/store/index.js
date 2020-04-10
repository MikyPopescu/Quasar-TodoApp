import Vue from "vue";
import Vuex from "vuex";

// we first import the module

import tasks from "./store-taks";

Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tasks
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
