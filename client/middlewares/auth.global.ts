const store = useUserStore()


export default defineNuxtRouteMiddleware( async (to, from) => {

    console.log('executando middlware' , to.path, store.user.id, store.user.email, localStorage.getItem('token'))
    await store.show()
    if (to.path !== '/auth/login' && (!store.user.id || !store.user.email)) {
      return navigateTo('/auth/login')
    }
    if(!localStorage.getItem('userId') || !localStorage.getItem('token')){
      return navigateTo('auth/login')
    }
  
})

