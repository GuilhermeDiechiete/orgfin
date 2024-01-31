import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.get('/', 'CategoriesController.index')
    Route.post('/', 'CategoriesController.store')
    Route.delete('/:id', 'CategoriesController.destroy')



    

}).prefix('category').middleware('auth')
.where('id', {
        match: /^[0-9]+$/,
        cast: (id) => Number(id),
    })