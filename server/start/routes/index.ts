import Route from '@ioc:Adonis/Core/Route'
import './Auth'
import './user_infos'
import './user'
import './category'
import './Expenses'
import './user_address'
import './panel'
import './user_incomes'

Route.get('/', async () => {
  return { hello: 'world' }
})
