const express = require('express')
const app = express();
const cors = require('cors')
const session = require('express-session');
let bodyParser = require('body-parser');
const keycloak = require('./keycloak-confilg/keycloak-config').initKeycloak();

var memoryStore = new session.MemoryStore();
app.use(session({
    secret: '7d052dd7-cf40-4609-969e-05da7cf9b4cc',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));
  
app.use(keycloak.middleware());

const path = require('path')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const dbCon = require('./dbconfig/dbconfig')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


dbCon.connect(function (err) {
  if (err) {
    console.log("connect faild");
  }

  if (!err) {
    console.log("connected");
  }
});



const lottery = require('./routes/CRUD.routes/lottery.route')
const company = require('./routes/CRUD.routes/company.route')
const brance = require('./routes/CRUD.routes/brance.route')
const installment = require('./routes/CRUD.routes/installment.route')
const lottery_out = require('./routes/CRUD.routes/lottery_out.route');
const move_lottery = require('./routes/CRUD.routes/move_lottery.route')
const seller = require('./routes/CRUD.routes/seller.route')
const persent = require('./routes/CRUD.routes/persent.route')
const thork = require('./routes/CRUD.routes/thork.route')
const unit = require('./routes/CRUD.routes/unit.route')
const user = require('./routes/CRUD.routes/user.route')
const typeofpersent = require('./routes/CRUD.routes/type_of_persent.route')

const win = require('./routes/import.routes/win.route')
const sell = require('./routes/import.routes/sell.route');


const report_lottery_free = require('./routes/report.routes/report_lottery_free.route')
const report_lottery_notsell = require('./routes/report.routes/report.lottery.not.sell.route')
const selllessthan = require('./routes/report.routes/report.selllessthan.route')
const report_num6 = require('./routes/report.routes/report.num6.route')
const report_lottery_sell = require('./routes/report.routes/report_lottery_sell.route');
const own_all = require('./routes/report.routes/own.all.route')
const sum_own_all = require('./routes/report.routes/sum.own.all.route')
const own_some = require('./routes/report.routes/own.some.route')
const sum_own_some = require('./routes/report.routes/sum.own.some.route')
const sum_income = require('./routes/report.routes/income.route')
//const get_value_sell = require('./routes/report.routes/get.value.sell.route')
const dasboard_grash_income = require('./routes/report.routes/dasboard_income_grash.route')
const dasboard_grash_own = require('./routes/report.routes/dasboard_own_grash.route')
const bill = require('./routes/CRUD.routes/bill.route')

const login = require('./routes/CRUD.routes/login.route')

const swaggerJSDoc = require('swagger-jsdoc');

global.__basedir = __dirname;

app.use('/', lottery)
app.use('/', company)
app.use('/', brance)
app.use('/', installment)
app.use('/', lottery_out)
app.use('/', move_lottery)
app.use('/', win)
app.use('/', sell)
app.use('/', seller)
app.use('/', persent)
app.use('/', thork)
app.use('/', unit)
app.use('/', user)
app.use('/', report_lottery_free)
app.use('/', report_lottery_notsell)
app.use('/', selllessthan)
app.use('/', report_num6)
app.use('/', report_lottery_sell)
app.use('/', own_all)
app.use('/', sum_own_all)
app.use('/', own_some)
app.use('/', sum_own_some)
app.use('/', sum_income)
//app.use('/', get_value_sell)
app.use('/', dasboard_grash_income)
app.use('/', dasboard_grash_own)
app.use('/', bill)
app.use('/', login)
app.use('/', typeofpersent)


const port = process.env.port || 8000;
const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Excel_Finance_API"
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT"
        },
      }
    }
    ,
    security: [{
      jwt: []
    }],
  swagger: "3.0",
    servers: [
      {
        url: `http://localhost:${port}`
      }
    ],
  },



  apis: ['./routes/CRUD.routes/*.js',
    './routes/report.routes/*.js',
    './routes/import.routes/*.js']

  //apis: ['server.js']
}


const swaggerDocs = swaggerJSDoc(option)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


app.get('/', (req, res) => {
  res.send("Hello world")
})

app.listen(port, console.log(`Server Running on port ${port}`))
module.exports = app;
