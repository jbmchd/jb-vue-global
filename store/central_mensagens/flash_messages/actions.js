import componentes from "@jbmchd/jb-v-global/componentes";
import jb_functions from "@jbmchd/jb-v-global/functions";

export default {
  showError({ dispatch }, options) {
    options = Object.assign(
      {
        icon: "error",
        timer: 3000
      },
      options
    );
    dispatch("show", options);
  },
  showSuccess({ dispatch }, options) {
    options = Object.assign(
      {
        icon: "success",
        timer: 3000
      },
      options
    );
    dispatch("show", options);
  },
  show({ state, commit }, options) {
    options.html = jb_functions.object(options.html).toHtmlList();

    commit("setOptions", options);
    if (state.options.html || state.options.text || state.options.title) {
      componentes.toast(state.options);
    }
  },
  limpar({ dispatch }) {
    dispatch("show", {
      icon: null,
      timer: 1
    });
  }
};
