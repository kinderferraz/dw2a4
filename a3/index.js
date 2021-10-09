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
    id: 0,
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
}, {
    id: 1,
    description: "Criação website",
    amount: 500000,
    date: "23/01/2021",
}, {
    id: 2,
    description: "Internet",
    amount: -20000,
    date: "23/01/2021",
}]

const Transaction = {
    all: transactions,
    //add
    add(newTransaction) {
        this.all.push(newTransaction)
        App.reload()
    },
    //remove

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
        tr.innerHTML = this.innerHTMLTransaction(transaction)
        this.transactionContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ?
            "income" :
            "expense"
        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover transação"></td>
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
        Transaction.all.forEach(t => DOM.addTransaction(t))
        DOM.updateBalance()
    },
    reload() {
        DOM.clearTable()
        this.init()
    }
}

App.init()