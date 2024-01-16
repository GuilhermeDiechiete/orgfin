<template>
    <section class="message">
        <div v-if="message.length > 0 " class="notification is-danger my-3">
            {{ message }}
        </div>
        
    </section>
</template>


<script>
    export default {
    props: {
        message: {
            type: String,
            default: ''
        },
      
    },
    };
</script>