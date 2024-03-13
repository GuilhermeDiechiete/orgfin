
Descrição dos Diretórios: CLIENT

.nuxt : Configurações do framework Nuxt, não ouve alterações

assets
    /css
        main.css : configurações minimas de estilos para o projeto

components : Estão todos os componentes utilizados na construção das paginas.

interfaces
    /interfaces.ts : estão centralizadas as interfaces de objetos utilizados no projeto, como objeto de usuário, category, transaction e account.

layouts
    /default.vue : Contém apenas a parte do menu lateral.

node_modules: arquivos de dependencias.

pages
    auth
        /login.vue : Pagina de login do usuário
    user
        /register.vue : Pagina de registro do usuário
    
    accounts.vue : Pagina para adicionar contas bancárias.
    annual-report.vue : Pagina que exibe a planilha anual do usuário
    categories.vue : Pagina para adicionar categorias, para despesas, rendas e investimentos.
    index.vue : Pagina principal, contém a exibição das tabelas do usuário.

plugins 
    /vuetify.ts : configurações de estilo

public

server

stores : armazenada toda a regra de negocio com o banco de dados, todas as requisições para o servidor estão nesse diretório.

