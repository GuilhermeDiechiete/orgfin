module.exports = class AuthController {

  static async validate(req, res){
    res.json({ message: 'Você está autenticado', user: req.user})
}};
