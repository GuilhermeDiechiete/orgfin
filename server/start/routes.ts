
import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.resource('/users', 'UsersController').apiOnly()

}).prefix('/orgfin')

