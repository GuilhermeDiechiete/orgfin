



#### ROTAS 

POST        /user ──────────────────────────── UsersController.store [ criar usuário ]
GET|HEAD    /user/:id ──────────────────────── UsersController.show [ buscar usuário ]
PUT         /user/:id ──────────────────────── UsersController.update [ atualizar usuário ]
DELETE      /user/:id ──────────────────────── UsersController.destroy [ deletar usuário ]


POST        /auth ──────────────────────────── AuthController.store [ login ]
DELETE      /auth ──────────────────────────── AuthController.destroy [ logout ]


GET|HEAD    /category ──────────────────────── CategoriesController.index [ buscar lista de categorias ]
POST        /category ──────────────────────── CategoriesController.store [ criar categoria ]
DELETE      /category/:id ──────────────────── CategoriesController.destroy [ deletar categoria ]


POST        /transaction ───────────────────── TransactionsController.store [ criar transação ]
DELETE      /transaction/:id ───────────────── TransactionsController.destroy [ excluir transação ]


GET|HEAD    /search/:order/:year ───────────── SearchesController.getByYear [ buscar transações por ano ]
GET|HEAD    /search/:order/:year/:month ────── SearchesController.getByMonth [ buscar transações por mês ]

GET|HEAD    / ──────────────────────────────── Closure [ index ]