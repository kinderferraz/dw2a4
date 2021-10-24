import components, {
    processSubmit
} from "./view.js";
import rules from "./rules.js"

components.cepInput.addEventListener("input", e => {
    e.target.value = rules.cep(e.target.value)
}, false)

components.cepContainer.addEventListener("submit", e => {
    e.preventDefault()
    processSubmit(e.target)
}, false)

console.log(components.cepInput);