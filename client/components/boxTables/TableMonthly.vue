<template>
  <div class="box table-container">
    <table class="table is-striped is-fullwidth is-bordered" style="min-width: 800px;">
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th v-if="type === 'expenses'">Parcela</th>
          <th>Categoria</th>
          <th>Conta de Saida</th>
          <th>Destino</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>05-10-2024</td>
          <td>Festa</td>
          <td>200.00</td>
          <td v-if="type === 'expenses'">1-2</td>
          <td>Diversão</td>
          <td>Sicredi</td>
          <td>ABB</td>
          <td>Pendente</td>
        </tr>
        <tr>
          <td>05-10-2024</td>
          <td>Festa</td>
          <td>200.00</td>
          <td v-if="type === 'expenses'">1-2</td>
          <td>Diversão</td>
          <td>Sicredi</td>
          <td>ABB</td>
          <td>Pendente</td>
        </tr>
        <tr>
          <td>05-10-2024</td>
          <td>Festa</td>
          <td>200.00</td>
          <td v-if="type === 'expenses'">1-2</td>
          <td>Diversão</td>
          <td>Sicredi</td>
          <td>ABB</td>
          <td>Pendente</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">

defineProps([ 'type' ])

</script>