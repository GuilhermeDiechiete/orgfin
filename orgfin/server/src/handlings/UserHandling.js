
// tools
const V = require('../fragments/validators')
const encrypt = require('../fragments/encrypt')
const token = require('../fragments/token')

// database access
const Access = require('../database/access/UserAccess')

module.exports = class UserHandling {
    static async userRegister(user) {
        try { 
            V.check(user.name, "nome").notNull()
            V.check(user.email, "e-mail").notNull().email()
            V.check(user.phone, "telefone").notNull().phone()
            V.check(user.birth, "data de nascimento").notNull()
            V.check(user.city, "cidade").notNull()
            V.check(user.state, "estado").notNull()
            V.check(user.password, "senha").notNull().minLength(5)
            V.check(user.confirmpassword, "confirmação de senha").notNull()
            V.check(user.password, 'senha').eguals(user.confirmpassword, 'confirmação de senha')

            const hashpassword = await encrypt.hashPassword(user.password)
            
            user.password = hashpassword
            delete user.confirmpassword

            const checkEmail = await Access.findByEmail(user.email)
            V.check(checkEmail, 'e-mail').existsMsg('O e-mail já existe, por favor utilize outro.')

            const save = await Access.save(user)
            V.check(save, 'salvar usuário').errorIn('Erro ao salvar o usuário.')

            return { status: 200, response: 'Usuário cadastrado com sucesso.'}
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async userLogin(user) {
        try {
            V.check(user.email, 'e-mail').notNull().email()
            V.check(user.password, 'senha').notNull()

            const checkEmail = await Access.findByEmail(user.email)
            V.check(checkEmail,'e-mail').notExistsMsg('E-mail invalido.')
            
            const getPassword = await Access.getPassword(user.email)
            const checkPassword = await encrypt.comparePasswords(user.password, getPassword.password)
            V.check(checkPassword, 'senha').invalidMsg('Senha invalida')

            const userData = await Access.getUserByEmail(user.email)
            const tk = await token.createUserToken(userData)

            return { status: 200, response: 'Login efetuado com sucesso.', token: tk}
        } catch (error) {
            return { status: 400, response: error.message }
        }
        
    }
    static async showProfile(userId) {
        try {
            const user = await Access.getUserById(userId)
            V.check(user,'usuário').notExistsMsg('Usuário não existe.')

            return { status: 200, response: user }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async editProfile(userId, user) {
        try { // validation
            user.id = userId
            V.check(user.name, "nome").notNull()
            V.check(user.email, "e-mail").notNull().email()
            V.check(user.phone, "telefone").notNull().phone()
            V.check(user.birth, "data de nascimento").notNull()
            V.check(user.city, "cidade").notNull()
            V.check(user.state, "estado").notNull()

            // validation email
            const getUser = await Access.getUserById(user.id)

            if(getUser && user.email !== getUser.email) {
                const consultEmail = await Access.findByEmail(user.email)
                if(consultEmail) {
                    return { status: 400, response: 'E-mail já está em uso.' }
                }
            } else if(getUser && user.email == getUser.email){
                user.email = user.email
            } else {
                return { status: 400, response: 'Não foi possivel atualizar usuário.' }
            }
            
            await Access.update(user.id, user)

            return { status: 200, response: 'Usuário atualizado com sucesso.' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async userEditPass(req) {
        const user = { ...req.body }
        try {
            // falta 
            return { status: 200,response: 'Senha alterada com sucesso.' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
        

    }
    static async userDelete(req) {
        const id = req.params.id
        try {
            const user = await Access.getUserById(id)
            V.check(user, 'usuário').notNullMsg('Usuário não existe')
            await Access.delete(id)
            return { status: 200, response: 'Usuário deletado com sucesso.' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    
} 