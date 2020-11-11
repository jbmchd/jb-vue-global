
export default array => {
    return {
        removerElementosVazios: () => {
            return array.filter(el => {
                return !!el
            })
        },
    }
}
