var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page.*/
router.get('/', function (req, res, next) {
  res.render('contacto.hbs');
});

router.post('/', async (req, res, next) => {
  
  var Nombre = req.body.Nombre;
  var Apellido = req.body.Apellido;
  var Email = req.body.Email;
  var Telefono = req.body.Teléfono;
  var Mensaje = req.body.Mensaje;

  console.log(req.body);

  var obj = {
    to: 'alesalcedo@gamail.com',
    subject: 'Contacto desde',
    html: Nombre + " " + Apellido + " se contacto y necesita mas informacion a este correo: " + Email + ". <br> Ademas, hizo el siguiente comentario: " + Mensaje + ". <br> Su telefono es " + Telefono,
  };

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado',
  });

});

module.exports = router;
