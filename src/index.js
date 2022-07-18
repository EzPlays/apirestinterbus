const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // importar los encabezados cors

const app = express();


// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use(require('./routes/asientos'));
app.use(require('./routes/buses'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/usu_bus'));

app.get('/', (req, res) => {
  res.json('interbus api');
});

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});



