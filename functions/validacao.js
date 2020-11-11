import regex from './../regex'

export default value => {
    return {
        cpf: (sem_algoritmo) => {
            let cpf = value
          if (!cpf) {
            return false
          }

          let cpf_validado = true

          let strCPF = cpf.match(/\d+/g).join([])

          if(sem_algoritmo){
            return regex.cpf_numbers.test(strCPF)
          }

          var Soma
          var Resto
          Soma = 0
          if (strCPF == '00000000000') cpf_validado = false

          for (let i = 1; i <= 9; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
          Resto = (Soma * 10) % 11

          if (Resto == 10 || Resto == 11) Resto = 0
          if (Resto != parseInt(strCPF.substring(9, 10))) cpf_validado = false

          Soma = 0
          for (let i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
          Resto = (Soma * 10) % 11

          if (Resto == 10 || Resto == 11) Resto = 0
          if (Resto != parseInt(strCPF.substring(10, 11))) cpf_validado = false

          return cpf_validado
        },
        cnpj: (sem_algoritmo) => {
            let cnpj = value
          if (!cnpj) {
            return false
          }

          let cnpj_validado = true

          cnpj = cnpj.replace(/[^\d]+/g, '')

          if(sem_algoritmo){
            return regex.cnpj_numbers.test(cnpj)
          }

          if (cnpj == '') {
            cnpj_validado = false
          }

          if (cnpj.length != 14) {
            cnpj_validado = false
          }

          // Elimina CNPJs invalidos conhecidos
          if (
            cnpj == '00000000000000' ||
            cnpj == '11111111111111' ||
            cnpj == '22222222222222' ||
            cnpj == '33333333333333' ||
            cnpj == '44444444444444' ||
            cnpj == '55555555555555' ||
            cnpj == '66666666666666' ||
            cnpj == '77777777777777' ||
            cnpj == '88888888888888' ||
            cnpj == '99999999999999'
          ) {
            cnpj_validado = false
          }

          if (cnpj_validado) {
            // Valida DVs
            let tamanho = cnpj.length - 2
            let numeros = cnpj.substring(0, tamanho)
            let digitos = cnpj.substring(tamanho)
            let soma = 0
            let pos = tamanho - 7

            for (let i = tamanho; i >= 1; i--) {
              soma += numeros.charAt(tamanho - i) * pos--
              if (pos < 2) {
                pos = 9
              }
            }
            let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
            if (resultado != digitos.charAt(0)) {
              cnpj_validado = false
            }

            tamanho = tamanho + 1
            numeros = cnpj.substring(0, tamanho)
            soma = 0
            pos = tamanho - 7
            for (let i = tamanho; i >= 1; i--) {
              soma += numeros.charAt(tamanho - i) * pos--
              if (pos < 2) {
                pos = 9
              }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
            if (resultado != digitos.charAt(1)) {
              cnpj_validado = false
            }
          }
          return cnpj_validado
        },
        igual_a: ($this) => {
            let campo = value
          let child = $this.$parent.$children.filter(child => {
            return child.id == campo
          })

          if (child.length) {
            return child[0].vmodel == $this.value
          }
          else {
            return true
          }
        }
      }
}
