const error = {
    ERROR_INVALID_EMAIL: { status: 400, messageResponse: 'E-mail invalido.' },
    ERROR_INVALID_PASSWORD: { status: 400, messageResponse: 'Senha Invalida.' },
    ERROR_INVALID_USER: { status: 400, messageResponse: 'Usuário invalido.' },
    ERROR_INVALID_ID: { status: 400, messageResponse: 'ID invalido.' },
  
    ERROR_EXISTS_EMAIL: { status: 401, messageResponse: 'Por favor, utilize outro e-mail.' },
  
    ERROR_PASSWORD_CREATION: { status: 501, messageResponse: 'Erro no processo de criação - pass.' },
    ERROR_CREATE_TOKEN: { status: 501, messageResponse: 'Erro ao criar token' },
  
    ERROR_REGISTER: { status: 500, messageResponse: 'Erro ao tentar criar usuário.' },
    ERROR_LOGIN: { status: 500, messageResponse: 'Erro ao tentar efetuar login.' },
    ERROR_LIST_USERS: { status: 500, messageResponse: 'Erro ao tentar listar usuários.' },
    ERROR_LIST_USER: { status: 500, messageResponse: 'Erro ao tentar acessar usuário.' },
    ERROR_DELETE: { status: 500, messageResponse: 'Erro ao tentar remover o usuário.' },
    ERROR_UPDATE: { status: 500, messageResponse: 'Erro ao tentar atualizar o usuário.' },
    ERROR_UPDATE_PASSWORD: { status: 500, messageResponse: 'Erro ao tentar atualizar senha.' },
  };
  
  const success = {
    SUCCESS_REGISTER: { status: 200, messageResponse: 'Usuário criado com sucesso.' },
    SUCCESS_LOGIN: { status: 200, messageResponse: 'Login efetuado com sucesso.' },
    SUCCESS_DELETE: { status: 200, messageResponse: 'Usuário removido com sucesso.' },
    SUCCESS_UPDATE: { status: 200, messageResponse: 'Usuário atualizado com sucesso.' },
    SUCCESS_UPDATE_PASSWORD: { status: 200, messageResponse: 'Senha atualizada com sucesso.' },
  };
  
  module.exports = { error, success };