import Route from '@ioc:Adonis/Core/Route'

import './user'
import './auth-user'
import './transaction'
import './search'

Route.get('/', async () => {
  return { hello: 'world' }
})
