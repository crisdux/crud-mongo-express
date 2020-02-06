const express = require ('express');
const app = express();
const path = require('path');
const colors = require('colors');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
//importar rutas
const indexRoutes = require('./routes/index');

//configuraciones
app.set('port', process.env.PORT || 3000); //validacion si el puerto 3000 esta disponible
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
//app.use(bodyParser.urlencoded({extended:false}));

//conexion a bbase de datos
mongoose.connect('mongodb://localhost:27017/crud-mongo')
    .then(db=>console.log('Base de datos conectada'))
    .catch(err=>console.log(err));

app.use(express.urlencoded({extended:false}));
//app.use(express.json());

//routes
app.use('/', indexRoutes);

app.listen(app.get('port'), ()=> {
    console.info(`Servidor en el puerto ${app.get('port')}`.green);
});

module.exports = mongoose;
