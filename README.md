# Projeto CRUD com NestJS, Prisma, MySQL e Vue.js

Este projeto é uma API CRUD construída com NestJS, utilizando Prisma ORM para comunicação com o banco de dados MySQL.

# Requisitos

* Node.js (>= 18.x)
* npm (ou yarn ou pnpm)
* MySQL (>= 8.x) ou PostgreSQL, MariaDB, SQL Server, SQLite, e CockroachDB.
* Git (opcional, somente se for clonado o repositório)

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

7. **Execute o seguinte comando:**
    ```bash
    npm run start:dev
    ```

8. **Abra o seu navegador e cole o seguinte link:**
    ```bash
    localhost:3000
    ```

📌 Estrutura principal
src/
 ┣ database/
 ┃ ┣ prisma.module.ts
 ┃ ┗ prisma.service.ts
 ┣ note/
 ┃ ┣ dto/
 ┃ ┣ note.module.ts
 ┃ ┣ note.service.ts
 ┃ ┗ note.controller.ts
 ┗ app.module.ts
