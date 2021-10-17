const rules = {
    email: email => email.match(/\S+@\S+\.\S+/) != null,
    date: date => {
        const splitDate = date.split("/")
        if (splitDate.length <= 2) return false
        return (splitDate[0] > 0 && splitDate[0] <= 31) &&
            (splitDate[1] > 0 && splitDate[1] <= 12) &&
            splitDate[2].length == 4
    }
}

export const validate = (e, rule) => {
    const field = e.target
    const value = field.value

    rule(value) ?
        field.classList.remove("errorInput") :
        field.classList.add("errorInput")
}

export default rules;