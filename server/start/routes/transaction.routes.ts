import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


    Route.post('/', 'TransactionsController.store')
    Route.delete('/:id', 'TransactionsController.destroy')
    Route.put('/:id', 'TransactionsController.changeStatus')
    
    Route.group(() => {

        Route.group(() => {

            Route.get('/', 'TransactionsController.getByYear')
            Route.get('/:month', 'TransactionsController.getByMonth')

        }).prefix('/:year')

    }).prefix('/:order')

}).prefix('transaction')
.middleware('auth')
.where('id', {
        match: /^[0-9]+$/,
        cast: (id) => Number(id),
    })