import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser'; // Importa body-parser

const app = express();
const port = 3000;

// Middleware para procesar JSON y datos de formularios codificados
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuración para servir archivos estáticos
app.use('/favicon', express.static(path.join(__dirname, 'public', 'favicon')));
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));
app.use('/style.css', express.static(path.join(__dirname, 'public', 'style.css')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar el envío del formulario de contacto
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

// Configuración del transporte para enviar correos electrónicos con nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'biancadmsadf16@gmail.com',
    pass: 'brjp kvbh ljtp fnzv'
  }
});

// Función para enviar correo electrónico
const enviarCorreo = (nombre, email, mensaje) => {
  const mailOptions = {
    from: 'biancadmsadf16@gmail.com',
    to: 'biancadmsadf16@gmail.com',
    subject: 'Nuevo mensaje desde el formulario de contacto',
    html: `<p>Nombre: ${nombre}</p>
           <p>Correo: ${email}</p>
           <p>Mensaje: ${mensaje}</p>`
  };

  return transporter.sendMail(mailOptions);
};

// Servidor escuchando en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor está corriendo en http://localhost:${port}`);
});
