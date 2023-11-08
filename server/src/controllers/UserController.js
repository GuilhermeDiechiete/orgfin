
const Handling = require('../handlings/UserHandling')

module.exports = class UserController {

    static async register(req, res) {
        try {
            const result = await Handling.userRegister(req) 
            res.status(result.status).json({ message: result.response })
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async login(req, res) {
        try {
            const result = await Handling.userLogin(req) 
            res.status(result.status).json({ message: result.response, token: result.token })
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async profile(req, res) {
        try {
            const result = await Handling.userProfile(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async edit(req, res) {
        try {
            const result = await Handling.userEdit(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async editPass(req, res) {
        try {
            const result = await Handling.userEditPass(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async delete(req, res) {
        try {
            const result = await Handling.userDelete(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
}