const rules = {
    cep: cep => cep.replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(\d{5}-\d{3})\d+?$/, '$1')
}

export default rules