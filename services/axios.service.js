import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

/**
 * Service to call HTTP request via Axios
 */
const axios_config = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = Vue.env.API_BASE_URL;
    Vue.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
  },

  getResource(resource = null, with_scope = true) {
    let scope = with_scope ? Vue.env.API_BASE_URL_SCOPE : ''
    return [scope, resource].join("/");
  },

  query(resource, params) {
    return Vue.axios.get(this.getResource(resource), params).catch(error => {
      throw new Error(`JbAxiosService ${error}`);
    });
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource, slug = "") {
    return Vue.axios.get(`${this.getResource(resource)}/${slug}`).catch(error => {
      throw new Error(`JbAxiosService ${error}`);
    });
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
    return Vue.axios.post(`${this.getResource(resource)}`, params);
  },

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(resource, slug, params) {
    return Vue.axios.put(`${this.getResource(resource)}/${slug}`, params);
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params) {
    return Vue.axios.put(`${this.getResource(resource)}`, params);
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      // console.log(error);
      throw new Error(`JbAxiosService ${error}`);
    });
  }
};

export default axios_config;
