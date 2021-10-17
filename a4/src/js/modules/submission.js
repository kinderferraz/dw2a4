import User from "./user.class.js"

const validateFormFields = (form) => {
    const errorFields = Array.from(form.elements)
        .filter(e => e.classList.contains("errorInput"))

    if (!errorFields.length)
        return

    throw new Error("Formulário preenchido incorretamente.")
}

const submit = e => {
    e.preventDefault()
    const form = e.target

    try {
        validateFormFields(form)
    } catch (error) {
        alert(error.message)
        return
    }

    const data = new User(form["nome"].value,
        form["cpf"].value,
        form["dt_nasc"].value,
        form["email"].value,
        form["fone"].value,
        form["cep"].value)
    console.log(data);
}

export default submit