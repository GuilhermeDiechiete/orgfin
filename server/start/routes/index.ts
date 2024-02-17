import Route from '@ioc:Adonis/Core/Route'

import './user.routes'
import './auth.routes'
import './category.routes'
import './transaction.routes'
import './account.routes'

Route.get('/', async () => {
  return { hello: 'world' }
})
