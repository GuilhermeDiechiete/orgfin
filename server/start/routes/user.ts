import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:id', 'UsersController.show')
    .middleware('auth')
    .where('id', {
      match: /^[1-9][0-9]*$/,
    })

  Route.post('/', 'UsersController.store')

  Route.put('/:id', 'UsersController.update')
    .middleware('auth')
    .where('id', {
      match: /^[1-9][0-9]*$/,
    })

  Route.delete('/:id', 'UsersController.destroy')
    .middleware('auth')
    .where('id', {
      match: /^[1-9][0-9]*$/,
    })
}).prefix('user/')
