# OrgFin - Organização Financeira

## Tecnologias Utilizadas no Backend

Typescript: https://www.typescriptlang.org/

PostgreSQL: https://www.postgresql.org/docs/

Adonis.js: https://docs.adonisjs.com/guides/introduction


## Tecnologias Utilizadas no FrontEnd

Typescript: https://www.typescriptlang.org/

Nuxt3: https://nuxt.com/docs/getting-started/introduction

Pinia: https://pinia.vuejs.org/introduction.html

BulmaCSS: https://bulma.io/documentation/overview/start/




#### Desenvolvido por <strong>Guilherme Diechiete da Silva</strong>


## ROTAS BACKEND

POST        /user ──────────────────────────── UsersController.store [ criar usuário ]

GET|HEAD    /user/:id ──────────────────────── UsersController.show [ buscar usuário ]

PUT         /user/:id ──────────────────────── UsersController.update [ atualizar usuário ]

DELETE      /user/:id ──────────────────────── UsersController.destroy [ deletar usuário ]

##

POST        /auth ──────────────────────────── AuthController.store [ login ]

DELETE      /auth ──────────────────────────── AuthController.destroy [ logout ]

##

GET|HEAD    /category ──────────────────────── CategoriesController.index [ buscar lista de categorias ]

POST        /category ──────────────────────── CategoriesController.store [ criar categoria ]

DELETE      /category/:id ──────────────────── CategoriesController.destroy [ deletar categoria ]

##

POST        /transaction ───────────────────── TransactionsController.store [ criar transação ]

DELETE      /transaction/:id ───────────────── TransactionsController.destroy [ excluir transação ]

##

GET|HEAD    /search/:order/:year ───────────── SearchesController.getByYear [ buscar transações por ano ]

GET|HEAD    /search/:order/:year/:month ────── SearchesController.getByMonth [ buscar transações por mês ]

GET|HEAD    / ──────────────────────────────── Closure [ index ]


## ROTAS FRONTEND

## Configurações para testar o projeto

Nos diretórios [ server ] e [ client ] , execute o comando "npm install" para instalar as dependências:

```
npm install
```

Após instalar todas as dependências, precisamos configurar o banco de dados na sua maquina, é necessario ter instalado o PostgreSQL, se quiser testar outros bancos, apenas deve ajustas as configurações do DB no arquivo de configuração.

Abra o banco de dados PostgreSQL e crie um banco de dados com o nome de sua preferência, depois vá até o arquivo ".env" no diretório server do projeto e ajuste as informações.

```
PG_HOST=localhost
PG_PORT=5432
PG_USER=  <nome-de-usuario-no-banco-de-dados>
PG_PASSWORD=1  <senha-do-usuario>
PG_DB_NAME=  <nome-do-banco-criado>

```

Após ajustar as informações, é necessário fazer criar as migrações(tabelas) no banco de dados, mas é simples, no terminal, execute:

```
node ace migration:run
```

execute o comando para iniciar o backend do projeto, execute: 

```
npm run dev
```


Agora por fim, com o terminal aberto no diretório [ client ], execute o comando "npm run dev" para iniciar o frontend:

```
npm run dev
```

Agora abra o navegador no endereço: 

```
http://localhost:3000/
```

















Desenvolvedores do projeto: Guilherme Diechiete da Silva

