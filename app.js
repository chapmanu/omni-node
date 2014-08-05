// Dependencies
var client = require('./lib/client.js');
var server = require('./lib/server.js');




/**
 * Configuration
 */
var config = {
  
  // Server Configuration
  server: {
    host: 'localhost',
    port:  4000,
    https: false,
    ssl: {
      key:  '/path/to/key',
      cert: '/path/to/cert'
    }
  },
  
  // Client Configuration
  client: {
    host: 'localhost',
    port:  9200
  }
  
};




/**
 * Initialization
 */
client.initialize(config.client);
server.initialize(config.server);




/**
 * Start Server
 */
process.nextTick(function() {
  console.log("Server listening at " + config.server.host+':'+config.server.port);
  server.start();
}.bind(this));