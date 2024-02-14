<template>
  <section>
    <BtnNext to="/" />
   
    <Messages />
   
    <div class="my-box">
      <h1 class="my-title"><IconCategory />Contas</h1>
    </div>
    
    <div class="my-box">
      <form action="" method="post" class="fullwidth">
        <FormLabel text="Nome da instituição ou local de aplicação:"/>
        <input type="text" class="my-input">

        <FormLabel text="Valor atual em conta:"/>
        <input type="text" class="my-input">

          <BtnFullWidthSuccess text="Criar" />
        </form>
      </div>

  </section>
</template>