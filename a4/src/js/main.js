import masks from "./modules/masks.js";
import rules, { validate } from "./modules/validations.js";
import submit from "./modules/submission.js"

document.querySelectorAll("input")
    .forEach(inputField => {
        const field = inputField.dataset.js
        if (field == undefined) return
        inputField.addEventListener("input", e => {
            e.target.value = masks[field](e.target.value)
        }, false)
    })


document.querySelector("#email").addEventListener("input",
    e => validate(e, rules.email)
)

document.querySelector("#dt_nasc").addEventListener("input",
    e => validate(e, rules.date))

document.querySelector(".form").addEventListener("submit", submit)