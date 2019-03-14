const express = require('express')
const sls = require('serverless-http')
const app = express()
const winston = require('winston')
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
})

app.get('/', (req, res, next) => {
  console.log('Hello World!')
  res.status(200).send('Hello World!')
})
app.get('/404', (req, res, next) => {
  console.log('Resource not found!')
  res.status(404).send('Resource not found!')
})
app.get('/500', (req, res, next) => {
  try {
    throw new Error('Server error.')
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})
app.get('/error', (req, res, next) => {
  throw new Error('Server error.')
})
app.get('/timeout', (req, res, next) => {
  setTimeout(() => { }, 10000)
})

app.get('/w', (req, res, next) => {
  const log = (params) => {
    return {
      requestId: req.headers['x-request-id'], // required
      timestamp: new Date().toISOString(), // required
      ...params
    }
  }

  logger.info('Hello World!', log({ arg: 'another argument' }))
  res.status(200).send('Hello World!')
})
app.get('/w/404', (req, res, next) => {
  logger.error('Resource not found!')
  res.status(404).send('Resource not found!')
})
app.get('/w/500', (req, res, next) => {
  try {
    throw new Error('Server error.')
  } catch (error) {
    logger.error(error.message, error)
    res.status(500).send(error.message)
  }
})

module.exports.server = sls(app)
