const winston = require('winston')
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
})

exports.handler = async (event, context) => {
  const log = (params) => {
    return {
      requestId: context.awsRequestId, // required
      timestamp: new Date().toISOString(), // required
      ...params
    }
  }
  logger.info(`Test successful with context.awsRequestId: ${context.awsRequestId}`, log({ arg: 'custom argument' }))

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Test successful with context.awsRequestId: ${context.awsRequestId}` })
  }
}
