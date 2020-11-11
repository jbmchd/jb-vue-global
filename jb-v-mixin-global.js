export default {
  props: ['value'],
  data() {
    return {
      atualizar_componente: false,
      value_data: this.value
    }
  },
  computed: {
    _id() {
      let id = this.id || `uid_${this._uid}`
      return id.toString()
    },
    vmodel: {
      get() {
        return this.value || this.value_data
      },
      set(v) {
        this.value_data = v
      }
    }
  },
  watch: {
    value(v) {
      this.vmodel = v
    }
  },
  methods: {
    atualizarComponente() {
      this.atualizar_componente = !this.atualizar_componente
    },
  }
}