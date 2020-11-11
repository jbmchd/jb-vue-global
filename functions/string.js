import regex from './../regex'

export default string => {
    return {
        toUpperFirstLetter : () => {
          return string ? string[0].toUpperCase() + string.slice(1) : string
        },
        toLowerFirstLetter : () => {
          return string ? string[0].toUpperCase() + string.slice(1) : string
        },
        removerEspacos : () => {
          return string.replace(regex.espacos, '')
        },
        removerAcentos : () => {
          string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        }
    }
}
