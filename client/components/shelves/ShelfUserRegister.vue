<template>
  <section>
    <div class="shelf">
      <h1 class="title is-4 text-orangered">
        Registro de usuário
      </h1>
    </div>
    <Messages />

    <div class="shelf">
      <form
        action=""
        method="post"
        class="my-box"
      >
        <FormLabel text="Nome de usuário" />
        <input
          v-model="username"
          type="text"
          class="input bg-dark is-fullwidth"
        >

        <FormLabel text="E-mail" />
        <input
          v-model="email"
          type="text"
          class="input bg-dark is-fullwidth"
        >

        <FormLabel text="Senha" />
        <input
          v-model="password"
          type="text"
          class="input bg-dark is-fullwidth"
        >

        <FormLabel text="Confirmação de senha" />
        <input
          v-model="confirmPassword"
          type="text"
          class="input bg-dark is-fullwidth"
        >

        <BtnFullWidth
          text="Enviar"
          class="bg-green mt-6"
          iconame=""
          @click.prevent="store.register(username, email, password, confirmPassword)"
        />
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">


const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const store = useUserStore()


</script>