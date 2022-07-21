const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// para documentacion
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation Interbus",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:5000",
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

const app = express();


// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(swaggerSpec)))

// Routes ez
app.use(require('./routes/asientos'));
app.use(require('./routes/buses'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/usu_bus'));

// Routes niber
app.use(require('./routes/rutas'));
app.use(require('./routes/programaciones'));
app.use(require('./routes/programacion_bus'));
app.use(require('./routes/reserva_ticket'));

app.get('/', (req, res) => {
  res.json('interbus api');
});

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});



