import { Counter } from './Counter.jsx'
import { RepositoryItem } from './RepositoryItem.jsx'
import '../styles/repositories.scss'

const repos = [{
    name: 'DW2A4',
    description: 'Atividades de desenvovimento web (JS + React)',
    link: 'https://github.com/kinderferraz/dw2a4'
}, {
    name: 'Emacs Init',
    description: 'Arquivos de inicialização do editor emacs',
    link: 'https://github.com/kinderferraz/emacs-init'
}, {
    name: 'Vovo Bot',
    description: 'Bot em JS para criar imagens de bom dia enviadas direto no WhatsApp',
    link: ''
}]

export function RepositoryList() {
    return (
        <section className="repository-list">
            <h2>Lista de Respositórios</h2>
            <ul>
                {repos.map((repo, idx) =>
                    <RepositoryItem repo={repo} key={idx}></RepositoryItem>
                )}
                <Counter></Counter>
            </ul>
        </section>
    )
}