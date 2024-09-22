var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

require('./infrastructure/banco_dados')
var router_user = require('./controllers/UserController');
var router_produto = require('./controllers/ProdutoContoller');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gerenciar usuários
*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// libera o acesso
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
})


// criando os endpoints
app.use('/usuario',router_user);
app.use('/items', router_produto);



// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crud Estoque com Swagger',
      version: '1.0.0',
      description: 'Uma aplicação Express documentada com Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3002', // URL base da API
      },
    ],
  },
  apis: ['./interfaces/controllers/*.js'], // Caminho para os arquivos com anotações Swagger
};

// Definir rota do Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
