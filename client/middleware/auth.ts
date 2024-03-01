


export default defineNuxtRouteMiddleware(async (to, from) => {
  const storeUser = useUserStore()
  await storeUser.show()
  if (storeUser.authenticated === false) {
    navigateTo('/auth/login')
  } else {
    console.log('nao pode')
  }
})



  


