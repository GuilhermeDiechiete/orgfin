
## Routes

GET|HEAD    /user/:id ────────────────────────────── UsersController.show [ BUSCAR INFORMAÇÕES DO USUÁRIO ]
POST        /user ────────────────────────────────── UsersController.store [ CRIAR UM USUÁRIO ]
PUT         /user/:id ────────────────────────────── UsersController.update [ ATUALIZAR INFORMAÇÕES DO USUÁRIO ]
DELETE      /user/:id ────────────────────────────── UsersController.destroy [ DELETAR UM USUÁRIO ]

POST        /auth ────────────────────────────────── AuthUsersController.store [ LOGIN - CRIAR TOKEN ]
DELETE      /auth ────────────────────────────────── AuthUsersController.destroy [ LOGOUT - DELETAR TOKEN ]

POST        /transaction ─────────────────────────── TransactionsController.store [ CRIAR TRANSAÇÃO ]
DELETE      /transaction ─────────────────────────── TransactionsController.destroy [ DELETAR TRANSAÇÃO ]

GET|HEAD    /filter/:type/:year ──────────────────── FilterTransactionsController.filterTypeYear [ FILTRAR TRANSAÇÃO PELO TIPO E ANO ]
GET|HEAD    /filter/:type/:year/:month ───────────── FilterTransactionsController.filterTypeYearMonth [ FILTRAR TRANSAÇÃO PELO TIPO, ANO E MÊS ]





# Main commands for working with Adonis.js

npm init adonis-ts-app@latest server [ CRIAR PROJETO ]

npm i @adonisjs/lucid@18.4.0 [ PACOTE PARA O BANCO DE DADOS ]

node ace configure @adonisjs/lucid [ INICIAR A CONFIGURAÇÃO DO BANCO DE DADOS ]

npm i @adonisjs/auth [ PACOTE PARA AUTENTICAÇÃO DE USUÁRIO ]

node ace configure @adonisjs/auth [ CONFIGURAR OS ARQUIVOS DE AUTENTICAÇÃO ]

node ace make:model User [ CRIAR ARQUIVO DE MODELS ]

node ace make:migration users [ CRIA ARQUIVO DE MIGRATION ]

node ace make:model User -m [ CRIAR ARQUIVO DE MODEL E MIGRATION ]

node ace migration:run [ CRIA AS MIGRAÇÕES NO BANCO DE DADOS ]

node ace make:validator User [ CRIA ARQUIVO DE VALIDAÇÃO ]

node ace make:controller User [ CRIA ARQUIVO DE CONTROLLER ]