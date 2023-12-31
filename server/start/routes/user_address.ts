import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.resource('/', 'UserAddressesController').apiOnly().middleware({
        show: ['auth'],
        update: ['auth'],
    })
    
}).as('user_address').prefix('/user_address')