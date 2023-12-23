import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.resource('/', 'ClientController').apiOnly().middleware({
        index: ['auth'],
        update: ['auth'],
    })
    
}).prefix('/client')