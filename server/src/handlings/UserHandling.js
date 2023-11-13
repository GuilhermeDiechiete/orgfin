
const V = require('../fragments/validators')
const encrypt = require('../fragments/security/encrypt')
const Access = require('../database/access/UserAccess')
const token = require('../fragments/security/token')

module.exports = class UserHandling {

    static async userRegister(req) {
        const user = { ...req.body }

        try {
            V.check(user.name, "nome").notNull()
            V.check(user.email, "e-mail").notNull()
            V.check(user.phone, "telefone").notNull()
            V.check(user.birth, "data de nascimento").notNull()
            V.check(user.city, "cidade").notNull()
            V.check(user.state, "estado").notNull()
            V.check(user.password, "senha").notNull()
            V.check(user.confirmpassword, "confirmação de senha").notNull()
            V.check(user.password, 'senha').eguals(user.confirmpassword, 'confirmação de senha')

            const hashpassword = await encrypt.hashPassword(user.password)
            
            user.password = hashpassword
            delete user.confirmpassword

            // access database
            const checkEmail = await Access.findByEmail(user.email)
            V.check(checkEmail, 'e-mail').existsMsg('O e-mail já existe, por favor utilize outro.')

            await Access.save(user)

            return { status: 200, response: 'Usuário cadastrado com sucesso.'}
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async userLogin(req) {
        const user = { ...req.body }

        try {
            // validations
            V.check(user.email, 'e-mail')
            V.check(user.password, 'senha')

            // access database
            const checkEmail = await Access.findByEmail(user.email)
            V.check(checkEmail,'e-mail').notExists()
            
            // validation password
            const getPassword = await Access.getPassword(user.email)
            const checkPassword = await encrypt.comparePasswords(user.password, getPassword.password)
            V.check(checkPassword, 'senha').invalidMsg('Senha invalida')

            // create token
            const getUserByEmail = await Access.getUserByEmail(user.email)
            const tk = await token.createUserToken(getUserByEmail)

            return { status: 200, response: 'Login efetuado com sucesso.', token: tk}
        } catch (error) {
            return { status: 400, response: error.message }
        }
        
    }
    static async userProfile(req) {
        const id = req.params.id 
        try {
            const user = await Access.getUserById(id)
            V.check(user,'usuário').notExists()

            return { status: 200, response: user }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async userEdit(req) {
        const id = req.params.id
        const user = { ...req.body }
        
        try {
            // validation
            user.id = id
            V.check(user.name, "nome").notNull()
            V.check(user.email, "e-mail").notNull()
            V.check(user.phone, "telefone").notNull()
            V.check(user.birth, "data de nascimento").notNull()
            V.check(user.city, "cidade").notNull()
            V.check(user.state, "estado").notNull()

            const getUser = await Access.getUserById(id)

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
            
            const update = await Access.update(id, user)

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