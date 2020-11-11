export default valor => {
    return {
        extrairValorDeMoedaBR(){
            return valor ? Number(valor.replace(/[^0-9,-]+/g,"").replace(',','.')) : 0
        },
        converterParaMoedaBR(){
            return new Intl.NumberFormat('default', { style: 'currency', currency: 'BRL' }).format(valor)
        },
    }
}
