<template>
    <div class="text-center">
      <v-btn block size="x-large" text="ADICIONAR TRANSAÇÃO" @click="sheet = !sheet" class="btn-add-transaction"/>
  
      <v-bottom-sheet v-model="sheet">
        <v-card class="text-center" height="50%">
          <v-card-text>
            <v-btn variant="text" @click="sheet = !sheet">
              fechar
            </v-btn>
  
            <form class="my-box-form">

                <h3 class="mb-6">Adicionar Transação</h3>
                <Messages />
                <v-radio-group inline v-model="transaction.type">
                    <v-radio label="Despesa" value="expense"></v-radio>
                    <v-radio label="Renda" value="income"></v-radio>
                    <v-radio label="Investimento" value="investment"></v-radio>
                </v-radio-group>

                <v-text-field v-model="transaction.date" label="Data" variant="underlined" type="date"/>
                <v-text-field v-model="transaction.description" label="Descrição" variant="underlined" />
                <v-text-field v-model="transaction.installment" label="Numero parcela Atual" variant="underlined" />
                <v-text-field v-model="transaction.total_installments" label="Numero de parcelas totais" variant="underlined" />
                <v-text-field v-model="transaction.amount" label="Valor R$" variant="underlined" />
                <v-select v-model="transaction.category" :items="categories" item-title="name" label="Categorias"></v-select>
                <v-select v-model="transaction.account" :items="accounts" item-title="name" label="Conta de Saída/Entrada"></v-select>
                <v-text-field v-model="transaction.destiny" label="Destino" variant="underlined" />
                <v-btn block @click.prevent="addTransaction"> Criar </v-btn>
                </form>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </div>
  </template>

<script setup lang="ts">
const sheet = ref(false)
const storeCategory = useCategoryStore()
const storeAccount = useAccountStore()

if(sheet) {
  await storeCategory.index()
  await storeAccount.index()
}


const categories = ref(storeCategory.categories)
console.log(categories)
const accounts = ref(storeAccount.accounts)

const store = useTransactionStore()


const transaction = ref({
    date: '',
    type: 'expense',
    description: '',
    installment: '1',
    total_installments: '1',
    amount: '',
    category: '',
    account: '',
    destiny: '',
    status: false
  });

const addTransaction = async () => {
  await store.create(transaction.value)
  await store.getByMonth()
}

</script>

