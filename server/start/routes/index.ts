import Route from '@ioc:Adonis/Core/Route'

import './user'
import './auth.routes'
import './transaction'
import './search'
import './category'

Route.get('/', async () => {
  return { hello: 'world' }
})
