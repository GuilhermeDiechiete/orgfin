<template>
  <section class="center">
    <BtnNormal
      text="Categorias"
      icon="fa-solid fa-layer-group icon-color mr-3"
      @click="activeForm('category')"
    />
    <BtnNormal
      text="Contas"
      icon="fa-solid fa-building-columns icon-color mr-3"
      @click="activeForm('account')"
    />
    <BtnNormal
      text="Relatórios"
      icon="fa-solid fa-print icon-color mr-3"
    />

    <div>
      <IconXmark
        v-if="active === 'category' || active === 'account'"
        @click="disableForm"
      />
      <FormCategory v-if="active === 'category'" />
      <FromAccount v-if="active === 'account'" />
    </div>
  </section>
</template>

<script setup lang="ts">

const active = ref('')

const activeForm = (name:string) => {
  active.value = name
}
const disableForm = () => {
  active.value = ''
}

</script>

