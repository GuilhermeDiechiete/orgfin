<template>
    <tbody>
        <tr v-for="value in info" :key="value.id">
            <td>{{ value.month }} / {{ value.year }}</td>
            <td>{{ value.description }}</td>
            <td><p class="text-red">R$ {{ value.amount }}</p></td>
            <td>{{ value.category }}</td>
            <td>{{ value.destiny }}</td>
            <td>
                <span v-if="value.status === false">Pendente</span>

                <span v-else-if="value.status === true" class="is-success">Pago</span>
            </td>
            
            <td class="text-red"><i class="fa-solid fa-circle-xmark"></i></td>
        </tr>
    </tbody>

  </template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: () => []
    }
  },
};
</script>