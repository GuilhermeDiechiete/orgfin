

export default defineNuxtRouteMiddleware((to, from) => {
    const role = to.params.role
    if(!role) {
        return navigateTo('/')
    }
})
