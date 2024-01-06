import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

    Route.get('/financial/:year/:month', 'FinancialDashboardsController.getExpenseByMonth').middleware('auth')
    
}).prefix('panel')
