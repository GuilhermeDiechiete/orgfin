<template>
  <form action="" method="post" class="box bg-dark2 mb-6">
    <h1 class="my-title"><IconPlus /> Nova Transação</h1>

    <FormLabel text="Data" />
    <input type="date" class="my-input">

    <FormLabel text="Tipo de Transação:" />
    <input type="text" class="my-input">

    <FormLabel text="Descrição:" />
    <input type="text" class="my-input">

    <FormLabel text="Numero da parcela atual." />
    <input type="text" class="my-input">

    <FormLabel text="Numero total de parcelas." />
    <input type="text" class="my-input">

    <FormLabel text="Valor" />
    <input type="text" class="my-input">

    <FormLabel text="Categoria" />
    <input type="text" class="my-input">

    <FormLabel text="Conta de saída" />
    <input type="text" class="my-input">

    <FormLabel text="Destino" />
    <input type="text" class="my-input">

    <BtnFullWidthSuccess
      text="Criar"
      class="mt-5 bg-green"
    />
  </form>
</template>