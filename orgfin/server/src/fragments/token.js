const jwt = require('jsonwebtoken');

exports.createUserToken = async (user) => {
  const token = jwt.sign(
    { name: user.name, id: user.id , email: user.email},
    process.env.JWT_SECRET,
    { expiresIn: '6h' },
  );

  if (!token) {
    return null;
  }
  return token;
};

exports.getUserToken = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  return token;
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido, faça login.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded.id) {
      res.status(401).json({message: 'Usuário não informado'})
      return
    }
    if(!decoded.name) {
      res.status(401).json({message: 'Nome de usuário não informado'})
      return
    }
    if(!decoded.email) {
      res.status(401).json({message: 'E-mail de suário não informado'})
      return
    }
    req.user = decoded;
   
    next();

  } catch (err) { 
    if (err.name === 'TokenExpiredError') {
    res.status(401).json({ message: 'O Token expirou, faça login novamente!' });
  } else {
    res.status(403).json({ message: 'O Token é inválido, faça login novamente!' });
  }
}};
