const Handling = require('../handlings/UserHandling')

module.exports = class UserController {

    static async register(req, res) {
        try {
            const data = { ...req.body }
            const result = await Handling.userRegister(data) 
            res.status(result.status).json({ data: result.response })
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async login(req, res) {
        try {
            const data = { ...req.body }
            const result = await Handling.userLogin(data) 
            res.status(result.status).json({ data: result.response, token: result.token })
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async profile(req, res) {
        try {
            const userId = req.params.id 
            const result = await Handling.showProfile(userId) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async editProfile(req, res) {
        try {
            const userId = req.params.id
            const data = { ...req.body }
            const result = await Handling.editProfile(userId, data) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async editPass(req, res) {
        try {
            const data = req.body
            const result = await Handling.userEditPass(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async delete(req, res) {
        try {
            const data = req.body
            const result = await Handling.userDelete(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
}