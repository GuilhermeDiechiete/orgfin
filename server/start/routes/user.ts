import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.resource('/', 'UsersController').apiOnly().middleware({
        show: ['auth'],
        update: ['auth'],
    })
    
}).as('user').prefix('/user')