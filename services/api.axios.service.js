/**
 * ESTE ARQUIVO PRECISA SER REPLICADO
 */
import axios from "axios";
// import store from "@/core/store";
import store from "vuex"; //injetar o a pasta do vuex aqui
// import AxiosService from "@/core/services/axios.service";
import AxiosService from "./axios.service";

const axios_interceptor_request_success = config => {
  // Antes da request
  store.dispatch("axios/incrementar_processos");
  return config;
};

const axios_interceptor_request_error = error => {
  // Erro na request
  store.dispatch("axios/decrementar_processos");
  return Promise.reject(error);
};

const axios_interceptor_response_success = response => {
  store.dispatch("axios/decrementar_processos");
  return response;
};

const axios_interceptor_response_error = async ({ response }) => {
  // Qualquer resultado diferente de 2xx
  store.dispatch("axios/decrementar_processos");
  response.data = await store.dispatch(
    "axios/verificarErroResponse",
    response.data
  );
  return Promise.reject(response);
};

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
  ...AxiosService,
  init() {
    axios.interceptors.request.use(
      axios_interceptor_request_success,
      axios_interceptor_request_error
    );
    axios.interceptors.response.use(
      axios_interceptor_response_success,
      axios_interceptor_response_error
    );
    AxiosService.init();
  }
};

export default {ApiService, interceptors: {
                                request:{
                                  axios_interceptor_request_success,
                                  axios_interceptor_request_error,
                                },
                                response: {
                                  axios_interceptor_response_success,
                                  axios_interceptor_response_error
                                }
                              }
              };
