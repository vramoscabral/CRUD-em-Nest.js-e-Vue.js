# Projeto CRUD com NestJS e Vue.js

![Tela Principal](main_screen.png)

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

# Sobre a aplicação

Essa aplicação permite ao usuário a realização de quatro operações com Anotações: Criar, consultar, editar e remover. A interface se comunica com a camada do backend que contém funções de operação lógica que irão processar comandos e alterar o conteúdo do banco de dados. Cada anotação contém um único ID, não visível ao usuário pela interface front-end, somente para fim de identificação rápida pelo back-end.

Na função Adicionar, o usuário determina o Título e também o Conteúdo de uma nova anotação, que será registrada no banco de dados. A função Ver Todos consulta o banco de dados e retorna todas as anotações existentes, apenas para consulta, os títulos aparecem e ao escolher um título, se vê o conteúdo da anotação. A função Editar retorna todas as anotações que estão no banco de dados, e ao selecionar um título, o usuário pode alterar o conteúdo da anotação e/ou o próprio título. Por último, a função Deletar permite que o usuário apague qualquer anotação que estiver no banco de dados.

O framework NestJS foi utilizado no backend desse projeto, e está configurado na pasta ```crud-api/```, juntamente com o Prisma ORM (Mapeamento Objeto-Relacional), que facilita a comunicação do código com o banco de dados, eliminando a necessidade de escrever scripts SQL para consulta. Para o front-end foi utilizado o Vue.js, framework JavaScript que possibilita a construção de interfaces dinâmicas e responsivas para interação com os usuários. Foi configurado na pasta ```crud-frontend/``` juntamente com o Axios, serviço de cliente HTTP que foi usado para se comunicar com a API desenvolvida nesse projeto.

# Instalação

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/vramoscabral/CRUD-em-Nest.js-e-Vue.js
    ```

2. **Acesse a pasta do backend:**
    ```bash
    cd CRUD-em-Nest.js-e-Vue.js
    cd crud-api
    ```

3. **Instale as dependências:**
    ```bash
    npm install
    ```

4. **Crie e configure um arquivo .env com suas credenciais do seu banco de dados:**
    ```bash
    DATABASE_URL="mysql://root:senha@localhost:3306/nome_do_banco"
    altere root e senha para seu user e senha do mysql
    nome do banco ex: crud-api
    ```
    
5. **Gere o client do Prisma:**
    ```bash
    npx prisma generate
    ```

6. **Rode as migrations para criar as tabelas no banco:**
    ```bash
    npx prisma migrate dev
    ```

7. **Execute o seguinte comando deixar executando o backend:**
    ```bash
    npm run start:dev
    ```

8. **Abra um novo terminal e acesse a pasta do crud-frontend e execute o comando:**
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

# 📌 Estrutura principal

```
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
│   │   ├── app.module.ts
│   │   └── main.ts
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
│   │   └── main.ts
│   └── package.json
└── README.md
```

# Arquivos

## Backend (NestJS)

#### **Arquivos Principais**
* ```src/main.ts```: Arquivo principal que inicializa a aplicação NestJS e configura o servidor;
* ```src/app.module.ts```: Módulo raiz da aplicação que importa todos os outros módulos;

#### **Configuração do Banco de Dados**
* ```src/database/prisma.service.ts```: Serviço que fornece acesso ao cliente do Prisma;
* ```src/database/prisma.module.ts```: Módulo que exporta o serviço do Prisma para uso em outros módulos;
* ```prisma/schema.prisma```: Schema do Prisma que define o modelo do banco de dados (modelo Note com Id, título e anotação);
* ```prisma/migrations/```: Diretório que armazena todas as migrations do banco de dados;

#### **Módulo de Notes (CRUD)**
* ```src/note/note.module.ts```: Módulo que organiza os componentes relacionados às notas;
* ```src/note/note.controller.ts```: Controlador que define as rotas da API para operações CRUD;
* ```src/note/note.service.ts```: Serviço com as lógicas das operações com notas (create, read, update e delete);
* ```src/note/dto/```: Diretório com Data Transfer Objects para validação de dados;

#### **Configuração do Projeto**
* ```package.json```: Arquivo de configuração do npm com dependências e scripts;

### 🔜 Frontend (Vue.js)

#### **Arquivos Principais**
* ```src/main.ts```: Arquivo principal que inicializa a aplicação Vue.js;

#### **Gerenciamento de Estado e Roteamento**
* ```src/router/index.ts```: Configuração das rotas da aplicação Vue.js;

#### **Serviços e API**
* ```src/services/noteService.ts```: Serviço que encapsula as chamadas HTTP para a API usando Axios;

#### **Componentes e Views**
* ```src/views/notesView.vue```: Componente principal que gerencia a interface de CRUD de notas;

#### **Configuração do Projeto**
* ```package.json```: Arquivo de configuração do npm com dependências e scripts;

### 📋 Arquivo Raiz
* ```README.md```: Documentação principal do projeto com instruções de instalação e uso;
