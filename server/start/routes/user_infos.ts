import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.resource('/', 'UserInfosController').apiOnly().middleware({
        show: ['auth'],
        update: ['auth'],
    })
    
}).as('user_infos').prefix('/user_infos')