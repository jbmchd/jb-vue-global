export default {
  setOptions: (state, payload) => {
    state.options = Object.assign({}, state.default_options, payload); //change the state of the//state
  }
};
