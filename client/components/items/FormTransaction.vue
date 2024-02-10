<template>
  <form
    action=""
    method="post"
    class="box bg-dark2 mt-4 mb-6"
  >
    <h1 class="title is-4 text-white"><IconPlus /> Nova Transação</h1>
    <FormLabel text="Data" />
    <input
      id=""
      type="date"
      name=""
      class="input is-fullwidth bg-dark text-white"
    >

    <FormLabel text="Tipo de Transação:" />
    <input
      type="text"
      class="input is-fullwidth bg-dark text-white"
    >

    <FormLabel text="Descrição:" />
    <input
      type="text"
      class="input is-fullwidth bg-dark text-white"
    >

    <FormLabel text="Numero da parcela atual." />
    <input
      type="text"
      class="input is-fullwidth bg-dark text-white"
    >

    <FormLabel text="Numero total de parcelas." />
    <input
      type="text"
      class="input is-fullwidth bg-dark text-white"
    >

    <FormLabel text="Valor" />
    <input
      type="text"
      class="input is-fullwidth bg-dark text-white"
    >

    <FormLabel text="Categoria" />
    <input
      type="text"
      class="input is-fullwidth bg-dark text-white"
    >

    <FormLabel text="Conta de saída" />
    <input
      type="text"
      class="input is-fullwidth bg-dark text-white"
    >

    <FormLabel text="Destino" />
    <input
      type="text"
      class="input is-fullwidth bg-dark text-white"
    >

    <BtnFullWidth
      text="Criar"
      class="mt-5 bg-green"
    />
  </form>
</template>