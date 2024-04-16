

export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('userId')
  const authenticated = token && id // Verifica se há token e id para considerar o usuário autenticado

  // Se o usuário não estiver autenticado e não estiver tentando acessar a página de login, redireciona para a página de login
  if (!authenticated && to.path !== '/auth/login') {
    return navigateTo('/auth/login')
  }

  // Se o usuário estiver autenticado e estiver tentando acessar a página de login, redireciona para a página inicial
  if (authenticated && to.path === '/auth/login') {
    return navigateTo('/')
  }

  // Se o usuário estiver autenticado e estiver tentando acessar uma rota diferente da página inicial, redireciona para a página inicial
  if (authenticated && to.path !== '/' && to.path !== '/auth/login') {
    return navigateTo('/')
  }

  // Se nenhum redirecionamento for necessário, permite que o usuário acesse a rota solicitada
})


