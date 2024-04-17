
import { defineStore } from "pinia";
import type { TaskCreate } from '~/interfaces/interfaces'

const API = 'http://localhost:4000/tasks'

export const useTasksStore = defineStore('tasks', {

    state: () => {
        return {
            tasks: ref([]),
            // messages
            msgError: ref(''),
            msgSuccess: ref('')
        }
    },
    actions: {
        async create( task: TaskCreate ) {
            try {
                if(typeof localStorage !== 'undefined'){
                    const token = localStorage.getItem('token')
                   if(token) {
                   this.msgSuccess = await $fetch(`${API}`, {
                    method: 'POST',
                    headers: {
                        Authorization: token
                    },
                    body: {
                        date: task.date,
                        status: task.status,
                        name: task.name,
                        description: task.description
                    }
                }) 
                }}
                setTimeout(() => {
                    this.msgSuccess = ''
                },2000)
            } catch (error: any) {
                if (error.response._data.message) {
                    this.msgError = error.response._data.message;
                } else {
                    this.msgError = 'Erro ao processar a solicitação.';
                }
                setTimeout(() => {
                    this.msgError = ''
                },2000)
            }
        },
        async index() {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token')
                   if(token) {
                    this.tasks = await $fetch(`${API}`, {
                        method: 'GET',
                        headers: {
                            Authorization: token
                        },
                    })
                } 
                }
            } catch (error) {
                console.log(error)
            }
        },
        async delete(id: number) {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token')
                   if(token) {
                    this.msgSuccess = await $fetch(`${API}/${id}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: token
                        },
                    })
                } 
                }
            } catch (error) {
                console.log(error)
            }
        },
        async changeStatus (id: number) {
            try {
                if(typeof localStorage !== 'undefined') {
                    const token = localStorage.getItem('token');
                   if(token) {
                    await $fetch(`${API}/${id}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: token
                        },
                    });
                } 
                
                }
            } catch (error:any) {
                if (error.response._data.message) {
                    this.msgError = error.response._data.message;
                } else {
                    this.msgError = 'Erro ao processar a solicitação.';
                }
                setTimeout(() => {
                    this.msgError = ''
                }, 1500 )
            }
        }
        
}})