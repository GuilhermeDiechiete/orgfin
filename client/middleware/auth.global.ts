
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    if (to.path !== '/auth/login' && (!token || !userId)) {
      return navigateTo('/auth/login')
    }
  }
})

