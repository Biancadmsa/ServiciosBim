const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const enviarCorreo = (nombre, email, mensaje) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Nuevo mensaje desde el formulario de contacto',
    html: `<p>Nombre: ${nombre}</p>
           <p>Correo: ${email}</p>
           <p>Mensaje: ${mensaje}</p>`
  };

  return transporter.sendMail(mailOptions);
};

app.post('/enviar-correo', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos.' });
  }

  enviarCorreo(nombre, email, mensaje)
    .then(() => {
      res.status(200).json({ message: '¡Correo electrónico enviado correctamente!' });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Error al enviar el correo electrónico.' });
    });
});

app.listen(port, () => {
  console.log(`Servidor está corriendo en http://localhost:${port}`);
});
