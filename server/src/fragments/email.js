const nodemailer = require('nodemailer');


async function emailRegister(userEmail) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'diechiete@gmail.com',
            pass: 'g18d11s99'
        }
    });

    const mailOptions = {
        from: 'diechiete@gmail.com',
        to: userEmail,
        subject: 'Registro realizado com sucesso.',
        text: 'Bem vindo a OrgFin, organize sua situação financeira com mais facilidade.'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}

module.exports = emailRegister
