const fatorial = (n, m) => {
    if (n === 1) return m
    return fatorial(n - 1, m * n)
}

export default fatorial