const knex = require('../connection')

module.exports = class UserAccess {
    // consultar usuário pelo e-mail
    static async findByEmail(email) {
        try {
            const result = await knex.select('email').from('users').where({ 'email': email }).first();
            return result
        } catch (error) {
            console.log('Erro ao selecionar usuario pelo email', error)
            return false
        }
    }
    // consultar usuário pelo e-mail
    static async getUserByEmail(email) {
        try {
            const result = await knex.select('id','name','email','phone', 'birth', 'city', 'state').from('users').where({ 'email': email }).first();
            return result
        } catch (error) {
            console.log('Erro ao selecionar usuario pelo email', error)
            return false
        }
    }
    // consultar usuário pelo ID
    static async getUserById(id) {
        try {
            const result = await knex.select('name','email','phone', 'birth', 'city', 'state').from('users').where({ 'id': id }).first();
            return result
        } catch (error) {
            console.log('Erro ao selecionar usuario pelo email', error)
            return false
        }
    }
    // pegar senha do usuario
    static async getPassword(email) {
        try {
            const result = await knex.select('password').from('users').where({ 'email': email }).first();
            return result
        } catch (error) {
            console.log('Erro ao selecionar senha do usuario pelo email', error)
            return false
        }
    }
    // salvar dados de usuario no banco
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