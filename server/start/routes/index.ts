import Route from '@ioc:Adonis/Core/Route'
import './Auth'
import './user_infos'
import './user'
import './category'
import './Expenses'

Route.get('/', async () => {
  return { hello: 'world' }
})
