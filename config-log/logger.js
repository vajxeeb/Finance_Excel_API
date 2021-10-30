
const winston = require('winston')
//const exppresswinston = require('express-winston')
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'log.log',
        level: 'error',
        format: winston.format.combine( winston.format.timestamp(),winston.format.json()),
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(),winston.format.json()),
        // level: 'warn',
        // format: winston.format.combine(winston.format.timestamp(),winston.format.json()),
      })
    ],
    meta: true,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; },
   
  })
  
  module.exports = logger;