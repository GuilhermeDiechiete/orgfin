<template>
    <tbody>
        <tr v-for="value in info" :key="value.id">
            <td>{{ value.day }}/{{ value.month }}/{{ value.year }}</td>
            <td>{{ value.description }}</td>
            <td><p class="text-red">R$ {{ value.amount }}</p></td>
            <td>{{ value.category }}</td>
            <td>{{ value.destiny }}</td>
            <td>
                <span v-if="value.status === false">Pendente</span>

                <span v-else-if="value.status === true" class="is-success">Pago</span>
            </td>
            
            <td class="text-red" @click="deleteTransaction(value.id)"><i class="fa-solid fa-circle-xmark"></i></td>

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

  methods: {
    async deleteTransaction(id) {
            try {
                
                const token = localStorage.getItem('userToken');

                const response = await axios.delete(`http://127.0.0.1:4000/transaction/${id}`,
                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })
                this.messageSuccess = response.data.message

                setTimeout(() => {
                    this.messageSuccess = ''
                }, 1000)
            } catch (error) {
                const errorMessage = Array.isArray(error.response?.data?.message) ?
                error.response?.data?.message[0]?.message :
                    "Erro desconhecido";

                this.messageError = errorMessage;
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
            }
        }
  }
};
</script>