# Projeto CRUD com NestJS e Vue.js

Este projeto é uma aplicação full stack CRUD com backend em NestJS, frontend em Vue.js, utilizando Prisma ORM para comunicação com o banco de dados MySQL e Axios para requisições HTTP.

# Tecnologias

## Backend
* NestJS - Framework Node.js
* Prisma - ORM para banco de dados
* MySQL - Banco de dados relacional

## Frontend
* Vue.js - Framework JavaScript progressivo
* Axios - Cliente HTTP para APIs

# Requisitos

* Node.js (>= 18.x)
* npm (ou yarn ou pnpm)
* MySQL (>= 8.x) ou PostgreSQL, MariaDB, SQL Server, SQLite, e CockroachDB.
* Git

# Instalação

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/vramoscabral/CRUD-em-Nest.js-e-Vue.js
    ```

2. **Acesse a pasta da aplicação:**
    ```bash
    cd CRUD-em-Nest.js-e-Vue.js
    cd crud-api
    ```

3. **Instale as dependências:**
    ```bash
    npm install
    ```

4. **Configure o arquivo .env com suas credenciais do seu banco de dados:**
    ```bash
    DATABASE_URL="mysql://root:senha@localhost:3306/nome_do_banco"
    ```
    
5. **Gere o client do Prisma:**
    ```bash
    npx prisma generate
    ```

6. **Rode as migrations para criar as tabelas no banco:**
    ```bash
    npx prisma migrate dev
    ```

7. **Execute o seguinte comando para executar o backend:**
    ```bash
    npm run start:dev
    ```

8. **Acesse a pasta do crud-frontend e execute o comando:**
    ```bash
    npm install
    ```

9. **Execute o comando para ligar o frontend:**
    ```bash
    npm run serve
    ```

8. **Abra o seu navegador e cole o link gerado no terminal:**
    ```bash
    Ex: localhost:5137
    ```

📌 Estrutura principal
CRUD-em-Nest.js-e-Vue.js/
├── crud-api/                 # Backend NestJS
│   ├── src/
│   │   ├── database/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── note/
│   │   │   ├── dto/
│   │   │   ├── note.module.ts
│   │   │   ├── note.service.ts
│   │   │   └── note.controller.ts
│   │   └── app.module.ts
│   │   └── main.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── package.json
├── frontend/                 # Frontend Vue.js
│   ├── src/
│   │   ├── router/
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   └── noteService.ts
│   │   ├── views/
│   │   │   └── notesView.vue
│   │   └── main.js
│   └── package.json
└── README.md
 
