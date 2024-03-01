import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


    Route.post('/', 'TransactionsController.store')
    Route.delete('/:id', 'TransactionsController.destroy')
    Route.put('/:id', 'TransactionsController.changeStatus')
    
    
    Route.get('/:month/:year', 'TransactionsController.getByMonth')
    Route.get('/:year', 'TransactionsController.getByYear')
       

    

}).prefix('transaction')
.middleware('auth')
.where('id', {
        match: /^[0-9]+$/,
        cast: (id) => Number(id),
    })