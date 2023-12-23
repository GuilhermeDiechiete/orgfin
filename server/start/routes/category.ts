import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.resource('/', 'CategoriesController').apiOnly().middleware({
        index: ['auth'],
        store: ['auth'],
        show: ['auth'],
        update: ['auth'],
        destroy: ['auth']
    })
    
}).as('categories').prefix('/categories')