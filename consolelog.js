exports.handler = async (event, context) => {
  const log = (message) => console.log(`${new Date().toISOString()}\t${context.awsRequestId}\t${message}`)

  log(`Test successful with context.awsRequestId: ${context.awsRequestId}`)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Test successful with context.awsRequestId: ${context.awsRequestId}` })
  }
}
