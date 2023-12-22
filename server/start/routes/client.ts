import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.resource('/', 'ClientController').apiOnly().middleware({
        show: ['auth'],
        store: ['auth'],
        update: ['auth'],
    })
    
}).prefix('/client')