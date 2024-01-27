import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  // login - em uso
  Route.post('/', 'AuthUsersController.store') 

  // logout 
  Route.delete('/', 'AuthUsersController.destroy').middleware('auth')

}).prefix('/auth')
