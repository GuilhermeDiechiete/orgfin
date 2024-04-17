import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


    Route.post('/', 'TasksController.store') // create tasks
    Route.delete('/:id', 'TasksController.destroy') // delete tasks
    Route.put('/:id', 'TasksController.changeStatus') // update status
    
    Route.get('/', 'TasksController.index')
       

    

}).prefix('tasks')
.middleware('auth')
.where('id', {
        match: /^[0-9]+$/,
        cast: (id) => Number(id),
    })