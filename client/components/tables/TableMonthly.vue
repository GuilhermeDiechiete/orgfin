<template>
  <div class="my-table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th v-if="type === 'expenses'">
            Parcelas
          </th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Conta de Saída</th>
          <th>Destino</th>
          <th>Status</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>02-03-2024</td>
          <td>Carro</td>
          <td v-if="type === 'expenses'">
            24 -48
          </td>
          <td>333,69</td>
          <td>Essenciais</td>
          <td>Sicredi</td>
          <td>Sicredi</td>
          <td>Pendente</td>
          <td>X</td>
        </tr>
        <tr>
          <td>02-03-2024</td>
          <td>Carro</td>
          <td v-if="type === 'expenses'">
            24 -48
          </td>
          <td>333,69</td>
          <td>Essenciais</td>
          <td>Sicredi</td>
          <td>Sicredi</td>
          <td>Pendente</td>
          <td>X</td>
        </tr>
        <tr>
          <td>02-03-2024</td>
          <td>Carro</td>
          <td v-if="type === 'expenses'">
            24 -48
          </td>
          <td>333,69</td>
          <td>Essenciais</td>
          <td>Sicredi</td>
          <td>Sicredi</td>
          <td>Pendente</td>
          <td>X</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps(['type'])

</script>