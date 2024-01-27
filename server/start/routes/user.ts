import Route from '@ioc:Adonis/Core/Route'

Route.post('/', 'UsersController.store').prefix('user')

Route.group(() => {

  Route.get('/', 'UsersController.show') // em uso
  Route.put('/', 'UsersController.update')
  Route.delete('/', 'UsersController.destroy')
  
})
.prefix('user')
.middleware('auth')
// .where('id', { match: /^[1-9][0-9]*$/, })
