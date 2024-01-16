import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  // em uso - login
  Route.post('/', 'AuthUsersController.store')

  // falta inplementar
  Route.delete('/', 'AuthUsersController.destroy').middleware('auth')
}).prefix('/auth')
