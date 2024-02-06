<template>
  <div class="box mt-4">
    <h1 class="title is-2 has-text-centered">
      Login
    </h1>
    <form
      action=""
      method="post"
    >  
      <InputForm
        label="Nome de usuário:"
        placeholder="Guilherme"
        type="text"
      />
      <InputForm
        label="E-mail:"
        placeholder="email@gmail.com"
        type="email"
      />
      <InputForm
        label="Senha:"
        placeholder="******"
        type="password"
      /> 
  
      <BtnFullWidth text="Entrar" />
    </form>

    <div class="has-text-centered">
      <NuxtLink to="/auth/login">
        Já tem uma conta? Faça Login!
      </NuxtLink>
    </div>
  </div>
</template>