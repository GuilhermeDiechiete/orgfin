import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.post('/', 'UsersController.store')
    

    Route.group(() => {

        Route.get('/', 'UsersController.show')
        Route.put('/', 'UsersController.update')
        Route.delete('/', 'UsersController.destroy')

    })
    .prefix('/:id')
    .middleware('auth')
    .where('id', {
        match: /^[0-9]+$/,
        cast: (id) => Number(id),
    })

}).prefix('user')