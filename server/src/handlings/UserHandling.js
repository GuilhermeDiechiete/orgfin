
const { check , exists, notExists, equalValue, equalFull } = require('../fragments/validators/validators')
const encrypt = require('../fragments/security/encrypt')
const Access = require('../database/access/UserAccess')
const token = require('../fragments/security/token')

module.exports = class UserHandling {

    static async userRegister(req) {
        const user = { ...req.body }

        try {
            // validation
            check(user.name, "O nome é obrigatório.")
            check(user.email, "O e-mail é obrigatório.")
            check(user.phone, "O telefone é obrigatório.")
            check(user.birth, "A data de nascimento é obrigatória.")
            check(user.city, "A cidade é obrigatória.")
            check(user.state, "O estado é obrigatório.")
            check(user.password, "A senha é obrigatória.")
            check(user.confirmpassword, "A confirmação de senha é obrigatória.")
            equalFull(user.password, user.confirmpassword, 'As senhas não conferem.')

            // changes
            const hashpassword = await encrypt.hashPassword(user.password)
            
            user.password = hashpassword
            delete user.confirmpassword

            // access database
            const checkEmail = await Access.findByEmail(user.email)
            exists(checkEmail, 'Por favor, utilize outro e-mail.')

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
            check(user.email, 'E-mail obrigatório.')
            check(user.password, 'Senha obrigatória.')

            // access database
            const checkEmail = await Access.findByEmail(user.email)
            notExists(checkEmail, 'E-mail invalido.')
            
            // validation password
            const getPassword = await Access.getPassword(user.email)
            const checkPassword = await encrypt.comparePasswords(user.password, getPassword.password)
            check(checkPassword, 'Senha Invalida.')

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
            notExists(user, 'Usuário não existe no sistema.')
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
            check(user.name, "O nome é obrigatório.")
            check(user.email, "O e-mail é obrigatório.")
            check(user.phone, "O telefone é obrigatório.")
            check(user.birth, "A data de nascimento é obrigatória.")
            check(user.city, "A cidade é obrigatória.")
            check(user.state, "O estado é obrigatório.")

            // PRECISO CHECAR SE ELE ESTA COM O MESMO EMAIL DELE
            // access database
            
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
            if(req.params.id) user.id = req.params.id
            check(user.email, 'Confirme o e-mail do usuário.')
            check(user.password, 'Digite a senha atual.')
            check(user.newpassword, 'Digite a nova senha.')
            check(user.newconfirmpassword, 'Confirme a nova senha')
            equalFull(user.newpassword, user.newconfirmpassword, 'Senhas não conferem.')

            const checkEmail = await Access.findByEmail(user.email)
            notExists(checkEmail, 'Não existe usuário com esse e-mail.')

            const getPassword = await Access.getPassword(user.email)
            const checkPassword = await encrypt.comparePasswords(user.password, getPassword.password)
            check(checkPassword, 'Senha invalida.')

            const hashPassword = await encrypt.hashPassword(user.newpassword)
            const update = await Access.updatePassword(user.id, hashPassword)

            check(update, 'Não foi possivel atualizar o usuário.')

            return { status: 200,response: 'Senha alterada com sucesso.' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
        

    }
    static async userDelete(req) {
        const id = req.params.id
        try {
            const user = await Access.getUserById(id)
            notExists(user, 'Usuário não existe no sistema.')
            await Access.delete(id)
            return { status: 200, response: 'Usuário deletado com sucesso.' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    
} 