import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.get('/', 'AdminController.index') // busca todos os usuários do sistema
    Route.delete('/:id', 'AdminController.destroy') // deleta o usuário do sistema
    Route.put('/:id', 'AdminController.changeRole') // atualiza papel do usuário

}).prefix('admin').middleware('auth')