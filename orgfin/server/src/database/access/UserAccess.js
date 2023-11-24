const knex = require('../connection')

module.exports = class UserAccess {
    // encontrar por e-mail - OK
    static async findByEmail(email) {
        try {
            const result = await knex.select('email').from('users').where({ 'email': email }).first();
            return result
        } catch (error) {
            console.log('Erro ao encontrar usuario pelo e-mail, Access.user.findByEmail')
            return false
        }
    }
    // encontrar usuario por e-mail -password - OK
    static async getUserByEmail(email) {
        try {
            const result = await knex.select('id','name','email','phone', 'birth', 'city', 'state').from('users').where({ 'email': email }).first();
            return result
        } catch (error) {
            console.log('Erro ao selecionar usuario pelo email - Access.user.findUserByEmail')
            return false
        }
    }
    // consultar usuário pelo ID - OK
    static async getUserById(id) {
        console.log(id)
        try {
            const result = await knex.select('name','email','phone', 'birth', 'city', 'state').from('users').where({ 'id': id }).first();
            return result
        } catch (error) {
            console.log('Erro ao selecionar usuario pelo email , Access.user.getUserById')
            return false
        }
    }
    // pegar senha do usuario - OK
    static async getPassword(email) {
        try {
            const result = await knex.select('password').from('users').where({ 'email': email }).first();
            return result
        } catch (error) {
            console.log('Erro ao selecionar senha do usuario pelo email', error)
            return false
        }
    }
    // salvar dados de usuario no banco - OK
    static async save(user) {
        try {
            const result = await knex('users').insert(user)
            return result
        } catch (error) {
            console.log('Erro ao salvar usuário no banco', error)
            throw error
        }
    }
    static async update(id, user) {
        try {
            const result = await knex('users')
                .where({ id: id })
                .update({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    birth: user.birth,
                    city: user.city,
                    state: user.state
                });
    
            return result;
        } catch (error) {
            console.error('Erro ao atualizar usuário.', error);
            throw error;
        }
    }
    static async updatePassword(id, newpassword) {
        try {
            const result = await knex('users').where({ id: id }).update({ password: newpassword })
            return result
        } catch (error) {
            console.error('Erro ao atualizar senha de usuário.', error);
            throw error;
        }
    }
    static async delete(id) {
        try {
            const result = await knex('users').where('id', id).del();
            return result;
        } catch (error) {
            console.error('Erro ao excluir usuário no banco', error);
            throw error;
        }
    }
}