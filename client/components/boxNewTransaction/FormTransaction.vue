
<template>
  <form class="box mb-4">
    <InputForm
      label="Data:"
      type="date"
    />
    <InputForm
      label="Tipo de transação"
      placeholder="Despesa, renda, investimento"
      type="text"
    />
    <InputForm
      label="Descrição:"
      placeholder="Lanche, Salário, Renda Fixa"
      type="text"
    />
    <InputForm
      label="Valor: R$"
      placeholder="R$ 500"
      type="number"
    />
    <InputForm
      label="Parcela Atual"
      placeholder="1"
      type="number"
    />
    <InputForm
      label="Total de Parcelas"
      placeholder="10"
      type="number"
    />
    <InputForm
      label="Categoria"
      placeholder="Diversão, Extra, Fundo de emergência"
      type="text"
    />
    <InputForm
      label="Conta de saída"
      placeholder="Conta do banco XXXX"
      type="text"
    />
    <InputForm
      label="Destino do valor"
      placeholder="Lancheria xxx, Banco xxx"
      type="text"
    />
    <BtnFullWidth text="Criar" />
  </form>
</template>