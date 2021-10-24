import components from "./view.js"
const api = {
    callCepApi: async cep => {
        cep = cep.replace("-", "")
        const data = await fetch(`https://viacep.com.br/ws/${cep}/json`)
            .then(data => data.json())
        if (data.erro) {
            components.cepInput.classList.add("error")
            throw new Error("O cep é invalido")
        }
        return data.uf
    },

    callCovidApi: async state => {
        const url = `https://covid19-brazil-api.vercel.app/api/report/v1/brazil/uf/${state.toLowerCase()}`
        const data = await fetch(url).then(data => data.json())
        return data
    }
}
export default api