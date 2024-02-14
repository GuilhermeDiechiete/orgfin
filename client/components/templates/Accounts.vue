<template>
  <section>
    <BtnNext to="/" />
   
    <Messages />
   
    <div class="my-box">
      <h1 class="my-title"><IconCategory />Contas</h1>
    </div>
    
    <div class="my-box">
      <form action="" method="post" class="fullwidth">

        <FormLabel text="Nome da instituição ou local de aplicação:"/>
        <input v-model="name" type="text" class="my-input">

        <FormLabel text="Valor atual em conta:"/>
        <input v-model="amount" type="number" class="my-input">

        <BtnFullWidthSuccess text="Criar" @click.prevent="addAccount"/>
      </form>
    </div>

    <div class="my-box">
      <div class="my-table-container fullwidth">
        <table class="my-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" key="account.id">
              <td>{{ account.name }}</td>
              <td>R$ {{ account.amount }}</td>
              <td> <button class="my-button-delete" @click="deleteAccount(account.id)">Excluir</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
const storeAccount = useAccountStore()

const name = ref('')
const amount = ref()

await storeAccount.index()

const accounts = storeAccount.accounts

const addAccount = async () => {
  await storeAccount.create(name.value, amount.value)
  name.value = '' 
  amount.value = ''
  await storeAccount.index() 
}

const deleteAccount = async (id:number) => {
  await storeAccount.delete(id) 
  await storeAccount.index()
}



</script>