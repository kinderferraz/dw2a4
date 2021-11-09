---
theme : "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: true
title: "Node.js"
---

# Node.js
## Alkindar Rodrigues
SP3029956

---

### História
- Lançado em 2009
- Isola o ambiente v8 do Chrome
- Leva o JS ao back-end e outras plataformas

--

#### Propostas
- Unificar o desenvolvimento web ao redor<br>de uma linguagem
- Facilitar a geração dinâmica (server-side)<br>de páginas web
- Aumentar o throughtput e escalabilidade

---

### Features
- Arquitetura orientada a eventos
- I/O assíncrono
- Package manager próprio

---

## Detalhes técnicos

--

### Single Thread Event Loop
- Uma thread (main), que cria outras a partir<br>de eventos
- Uma fila de tarefas compartilhada é usada<br>para controlar pendencias 

--

- Implementa o pattern observer para<br>identificar mudanças nas tarefas filhas
- Quando notificada a thread main ativa o<br>callback da thread filha

--

<img src="./node-event-loop.jpeg">
<small>Figura 1: Esquema de funcionamento do Event Loop</small>

---

### Outros detalhes
- Possibilidade de add-ons em C/C++
- Stdlib enorme para operações como:
  - Construção de apis
  - Manipulação de arquivos
  - Criptografia
- REPL

---

## Algumas libs

--

### Back end
- Express
- NestJS

--

### Outras
- Twit
- Open-wa
- Iteration