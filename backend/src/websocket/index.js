const OrderBookServer = require('./OrderBookServer')

const server = new OrderBookServer()
server.start()

module.exports = server
