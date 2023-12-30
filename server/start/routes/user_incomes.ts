import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.resource('/', 'UserIncomesController').apiOnly().middleware({

        show: ['auth'],
        store: ['auth'],
        destroy: ['auth']
    }).as('incomes')

    Route.get('/:year', 'UserIncomesController.showIncomesByYear').middleware('auth').as('incomes.showIncomesByYear')

}).prefix('/incomes')
