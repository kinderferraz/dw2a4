/* Manipulação de tabela */

const Utils = {
    formatCurrency(amount) {
        const signal = amount < 0 ? "-" : ""
        let value = String(amount).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    },

    formatAmount(value) {
        return Math.round(value * 100)
    },

    formatDate(date) {
        const splitedDate = date.split("-")
        return splitedDate.reverse().join("/")
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("kinder.finances:transactions")) || []
    },

    set() {
        localStorage.setItem('kinder.finances:transactions',
            JSON.stringify(Transaction.all))
    }
}

const Modal = {
    toggle() {
        const modal = document.querySelector(".modal-overlay")
        modal.classList.contains("active") ?
            modal.classList.remove("active") :
            modal.classList.add("active")
    },
}

const transactions = [{
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
}, {
    description: "Criação website",
    amount: 500000,
    date: "23/01/2021",
}, {
    description: "Internet",
    amount: -20000,
    date: "23/01/2021",
}]

const Transaction = {
    all: Storage.get(),
    add(newTransaction) {
        this.all.push(newTransaction)
        Storage.set()
        App.reload()
    },

    remove(idx) {
        this.all.splice(idx, 1)
        App.reload()
    },

    incomes() {
        const income = this.all.reduce((acc, t) => {
            return t.amount > 0 ? t.amount + acc : acc
        }, 0)
        return income
    },

    expenses() {
        const expense = this.all.reduce((acc, t) => {
            return t.amount < 0 ? t.amount + acc : acc
        }, 0)
        return expense
    },

    total() {
        return this.incomes() + this.expenses()
    },
}

const DOM = {
    transactionContainer: document.querySelector("#data-table tbody"),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.dataset.index = index
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        DOM.transactionContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, idx) {
        const CSSclass = transaction.amount > 0 ?
            "income" :
            "expense"
        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg"
                    alt="Remover transação"
                    onclick="Transaction.remove(${idx})">
                </td>
        `
        return html
    },

    updateBalance() {
        document
            .querySelector("#income p")
            .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document
            .querySelector("#expenses p")
            .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document
            .querySelector("#total p")
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTable() {
        this.transactionContainer.innerHTML = ""
    }

}

const App = {
    init() {
        Transaction.all.forEach(DOM.addTransaction)
        DOM.updateBalance()
        Storage.set()
    },

    reload() {
        DOM.clearTable()
        this.init()
    }
}

App.init()


/* Captura de dados */
const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    submit(e) {
        e.preventDefault()
        let values = this.getValues()
        try {
            this.validateFields(values)
            values = this.formatValues(values)
            this.saveTransaction(values)
            Form.clearFields()
            Modal.toggle()
        } catch (e) {
            alert(e.message)
        }
    },

    validateFields(newTransaction) {
        const { description, amount, date } = newTransaction
        if (description.trim() === "" || amount.trim() === "" || date.trim() === "")
            throw new Error("Formulário incompleto. Por favor, preencha todos os campos ")
    },

    formatValues(values) {
        let { description, amount, date } = values
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        return { description, amount, date }
    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },

    clearFields() {
        this.description.value = ""
        this.amount.value = ""
        this.date.value = ""
    }
}