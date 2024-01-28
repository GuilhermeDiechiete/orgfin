<template>
    <div class="box">
        conteudo anual
    </div>
</template>

<script lang="ts">

export default {

    data: () => ({
        
        outputs: [],
        token: localStorage.getItem('userToken') || undefined,
        year: '',
        messageError: ''
    }),

    async fetch({ $axios }) {

        try {
            this.outputs = await $axios.$get(`http://127.0.0.1:4000/gettransactions/${this.year}`), {

                headers: {
                    'Authorization': this.token,
                }
            }



        } catch (error: any) {
            this.messageError = error.response.data.message 
                setTimeout(() => {
                    this.messageError = '';
                }, 2000);
        }
    },


   
    }
}

</script>