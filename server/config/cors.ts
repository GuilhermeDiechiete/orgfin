

import type { CorsConfig } from '@ioc:Adonis/Core/Cors'

const corsConfig: CorsConfig = {
 
  enabled: true, // (request) => request.url().startsWith('/orgfin'),

  origin: ['http://localhost:3000'],
  
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma',
  ],

  credentials: true,

  maxAge: 90,
}

export default corsConfig
