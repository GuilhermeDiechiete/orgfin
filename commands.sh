
npm init adonis-ts-app@latest server # cria a estrutura do projeto

# START PROJECT

node ace serve --watch
node ace serve --watch --no-assents
node ace build --produtions --no-assents
node ace serve --watch --encore-args="--port 5000"


# CREATE FILES

node ace make:controller User -r  # -r -> cria estrutura do controller

node ace make:middleware Auth

node ace make:validator CreateUser
node ace make:prldfile validator

node ace make:migration users   # criar migração
node ace make:seeder User
node ace make:model User -m     # -m cria a migração junto com o model
node ace make:model User -f


# MIGRATIONS

node ace migration:run          # cria as migrações no banco de dados
node ace migration:run --dry-run
node ace migration:rollback
node ace migration:rollback --dry-run
node ace migration:reset
node ace migration:refresh
node ace migration:refresh --seed
node ace migration:fresh --seed



node ace configure encore


node ace list:routes
node ace list:routes --json > routes.json


# BANCO DE DADOS

node ace configure @adonisjs/lucid

# CREATE: config/database.ts
# UPDATE: .env,.env.example
# UPDATE: tsconfig.json { types += "@adonisjs/lucid" }
# UPDATE: .adonisrc.json { commands += "@adonisjs/lucid/build/commands" }
# UPDATE: .adonisrc.json { providers += "@adonisjs/lucid" }


# TOKEN 

node ace configure @adonisjs/auth

# CREATE: app/Models/User.ts
# CREATE: database/migrations/1619578304190_users.ts
# CREATE: contracts/auth.ts
# CREATE: config/auth.ts
# CREATE: app/Middleware/Auth.ts file already exists
# CREATE: app/Middleware/SilentAuth.ts file already exists
# UPDATE: .adonisrc.json { providers += "@adonisjs/auth" }
# CREATE: ace-manifest.json file
