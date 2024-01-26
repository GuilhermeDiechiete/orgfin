import Route from '@ioc:Adonis/Core/Route'

  // em uso - painel de buscar por mes
Route.group(() => {

    Route.get('/', 'CategoriesController.index')
    Route.post('/', 'CategoriesController.store')
    Route.delete('/:id', 'CategoriesController.destroy')

})
.middleware('auth')
.prefix('categories')

