import Route from '@ioc:Adonis/Core/Route'
import './Auth'
import './client'
import './user'
import './category'

Route.get('/', async () => {
  return { hello: 'world' }
})
