import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.resource('/', 'ExpensesController').apiOnly().middleware({
        index: ['auth'],
        store: ['auth'],
        show: ['auth'],
        update: ['auth'],
        destroy: ['auth']
    })
    
}).as('expenses').prefix('/expenses')