const masks = {
    cpf: cpf => cpf.replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'),

    date: date => date.replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{4})\d+?$/, '$1'),

    fone: phone => phone.replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1'),

    cep: cep => cep.replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(\d{5}-\d{3})\d+?$/, '$1'),

}

export default masks