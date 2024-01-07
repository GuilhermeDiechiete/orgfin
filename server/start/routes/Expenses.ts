import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.resource('/', 'ExpensesController').apiOnly().middleware({
      
        store: ['auth'],
        destroy: ['auth']
    })
    Route.put('/:id', 'ExpensesController.update').middleware('auth');
    
}).prefix('/expenses')