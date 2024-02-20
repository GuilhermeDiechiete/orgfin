<template>
  <section>
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
            <tr
              v-for="account in accounts"
              key="account.id">
              <td>{{ account.name }}</td>
              <td>R$ {{ account.amount }}</td>
              <td class="has-text-centered">
                <button
                  class="my-btn-delete"
                  @click="deleteAccount(account.id)">
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const storeAccount = useAccountStore();

await storeAccount.index();

const accounts = ref(storeAccount.accounts);

const deleteAccount = async (id:number) => {
  await storeAccount.delete(id); 
  await storeAccount.index();
};

watch(() => storeAccount.accounts, (newAccounts) => {
  accounts.value = newAccounts;
});

</script>