import Route from '@ioc:Adonis/Core/Route'
import './Auth'
import './client'

Route.get('/', async () => {
  return { hello: 'world' }
})
