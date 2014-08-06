// Dependencies
var express    = require('express');
var bodyParser = require('body-parser');
var fs         = require('fs');
var https      = require('https');


// Controllers
var SearchController = require('../controllers/search_controller.js');
var SampleController = require('../controllers/sample_controller.js');



/**
 * Server
 *
 * @constructor
 */
var Server = function() {
  this.app = express();
};


Server.prototype = {
  
  /**
   * Initialize the express instance
   *
   * @param {string}  - config.host     - Hostname of server (Default 'localhost')
   * @param {number}  - config.port     - Port to listen on  (Default '4000')
   * @param {boolean} - config.https    - Enable https (Default: false)
   * @param {string}  - config.ssl.key  - Path to SSL cert key
   * @param {string}  - config.ssl.cert - Path to SSL cert
   */
  initialize: function(config) {
    // set config
    this.config = {
      host:  config.host  || 'localhost',
      port:  config.port  ||  4000,
      https: config.https ||  false,
      ssl: {
        key:  config.ssl.key  || '/ssl/key/path',
        cert: config.ssl.cert || '/ssl/cert/path'
      }
    };
    
    // Set express options
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.set('jsonp callback name', 'jsonp');
    
    // Load routes
    this.loadRoutes();
  },
  
  
  /**
   * Load routes into express
   */
  loadRoutes: function() {
    this.app.get('/search', SearchController.search);
    this.app.get('/sample', SampleController.search);
  },
  
  
  /**
   * Start the webserver
   */
  start: function() {
    if (this.config.https) {
      var https_config = {
        key:  fs.readFileSync(this.config.ssl.key),
        cert: fs.readFileSync(this.config.ssl.cert)
      };
      https.createServer(https_config, this.app).listen(this.config.port);
    } else {
      this.app.listen(this.config.port);
    }
  }
  
};



/** Export */
module.exports = Server = new Server();