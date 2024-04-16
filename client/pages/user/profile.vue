<template>
    <NuxtLayout :name="layout">
        <section class="my-container">
            <HeaderPage title="Meu Perfil" description="Minhas informações" icon="fa-solid fa-user"/>
            <v-form class="my-box-form">
                <v-text-field :label="user.username" variant="outlined">
                </v-text-field>
                <v-text-field :label="user.email"  variant="outlined">
                </v-text-field>
                <v-btn block class="mb-2 bg-deep-orange-darken-3" size="x-large" text="Atualizar Informações"/>
            </v-form>

            <v-btn block class="mb-2 bg-deep" size="x-large" text="alterar senha" @click="sheet = !sheet" />
            <v-bottom-sheet v-model="sheet">

            <v-card class="text-center" height="60%">
                <v-card-text>
                <v-btn variant="text" @click="sheet = !sheet">
                    fechar
                </v-btn>
                <form-new-password /> <!-- FORMULARIO DE CATEGORIAS -->
                </v-card-text>
            </v-card>
            </v-bottom-sheet>
            
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
const layout = 'default'
const sheet = ref(false)
const storeUser = useUserStore()
await storeUser.show()

const user = storeUser.user
</script>