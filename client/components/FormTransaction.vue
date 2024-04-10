<template>
  <div class="text-center">
    <v-btn block size="x-large" text="ADICIONAR TRANSAÇÃO" @click="sheet = !sheet" class="btn-add-transaction bg-orange-darken-4"/>
  
    <v-bottom-sheet v-model="sheet">
      <v-card class="text-center" height="50%">
        <v-card-text>
          <v-btn variant="text" @click="sheet = false">
            fechar
          </v-btn>
  
          <form class="my-box-form">
            <h3 class="mb-6">NOVA TRANSAÇÃO</h3>
            <Messages />
            <v-radio-group inline v-model="transaction.type">
              <v-radio label="Despesa" value="expense"></v-radio>
              <v-radio label="Renda" value="income"></v-radio>
              <v-radio label="Investimento" value="investment"></v-radio>
            </v-radio-group>
          
            <v-text-field v-model="transaction.date" label="Data" variant="underlined" type="date"/>
            <v-text-field v-model="transaction.description" label="Descrição" variant="underlined" type="text"/>
            <v-text-field v-model="transaction.installment" label="Numero parcela Atual" variant="underlined" type="number"/>
            <v-text-field v-model="transaction.total_installments" label="Numero de parcelas totais" variant="underlined" type="number"/>
            <v-text-field v-model="transaction.amount" label="Valor R$" variant="underlined" type="number"/>
            <v-select v-model="transaction.category" :items="categories" item-title="name" label="Categorias" />
            <v-select v-model="transaction.account" :items="accounts" item-title="name" label="Conta de Saída/Entrada" />
            <v-text-field v-model="transaction.destiny" label="Destino" variant="underlined" />
            <v-btn block @click.prevent="addTransaction" class="bg-orange-darken-4">adicionar</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>




<!-- BOTÃO + FORMULÁRIO DE NOVA TRANSAÇÃO -->

<script setup lang="ts">
const sheet = ref(false)
import type { Category, Account } from '~/interfaces/interfaces'

// STORES
const store = useTransactionStore() 
const storeCategory = useCategoryStore() 
const storeAccount = useAccountStore() 
const storeGlobal = useGlobalStore()

const date = storeGlobal.dataISO


await storeCategory.index()
await storeAccount.index()
// LISTAS PARA INPUTS DO FORMULÁRIO
const categories: Category[] = storeCategory.categories
const accounts: Account[] = storeAccount.accounts

// VALOR RESPONSAVEL POR ABRIR E FECHAR FORMULÁRIO

// CONDIÇÃO PARA BUSCAR INFORMAÇÕES PARA O FORMULÁRIO


// INPUTS DO FORMULÁRIO
const transaction = ref({
  date: date, 
  type: 'expense', 
  description: '', 
  amount: 0, 
  installment: 1,
  total_installments: 1,
  category: '',
  account: '',
  destiny: '',
  status: false
})

// CHAMAR CATEGORIAS E CONTAS QUANDO ABRIR O FORMULARIO

// METODO RESPONSAVEL POR ENVIAR DADOS PARA API
const addTransaction = async () => {
  await store.create(transaction.value) // Tentativa de envio
  await store.getByMonth() // Faz uma busca atualizada dos valores 
}
</script>




