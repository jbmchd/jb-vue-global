import regex from './../regex'
import string from './string'

export default value => {
    return {
        remover: () => {
            return !value ? value : value.toString().replace(/(\.|\/|\-)/g, '')
        },
        cpf: () => {
            let cpf = value
            return cpf ? cpf.toString().replace(regex.cpf_numbers, '$1.$2.$3-$4') : cpf
        },
        cnpj: () => {
            let cnpj = value
            return cnpj ? cnpj.toString().replace(regex.cnpj_numbers, '$1.$2.$3/$4-$5') : cnpj
        },
        cartao_credito: () => {
            let numero = value
            var str = string.removerEspacos(numero);
            var numberChunks = str.match(/.{1,4}/g); //separa o numero em grupos de 4
            var result = numberChunks.join(" ");
            return result;
        },
        moeda: (digits) => {
            if (parseFloat(value)) {
                value = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: digits || 2
                }).format(value);
            }

            return value;
        }
    }
}
