import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.group(() => {

        Route.group(() => {

            Route.get('/', 'SearchesController.getByYear')
            Route.get('/:month', 'SearchesController.getByMonth')

        }).prefix('/:year')

    }).prefix('/:order')



}).prefix('search').middleware('auth')


