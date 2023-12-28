import Route from '@ioc:Adonis/Core/Route'

Route.get('/panel/:year', 'PanelsController.show').middleware('auth')
Route.get('/panel/:year/:month', 'PanelsController.showByMonth').middleware('auth')