import api from "./api.js";
const components = {
    cepInput: document.querySelector("#cep-input form input"),

    cepContainer: document.querySelector("#cep-input"),

    dataContainer: document.querySelector("#data-container"),

    cards: document.querySelectorAll(".card"),

    stateTitle: document.querySelector("#results-title"),

    updateCards: function(data) {
        this.stateTitle.innerHTML = data.state
        this.cards.forEach(card => {
            const number = data[card.id]
            card.lastElementChild.innerHTML = number
        })

    }
}

const processSubmit = async form => {
    try {
        const state = await api.callCepApi(form["cep"].value)
        const data = await api.callCovidApi(state)
        components.updateCards(data)
    } catch (_) {}
}

export default components
export { processSubmit }