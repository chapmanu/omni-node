// Dependencies
var elasticsearch = require('elasticsearch');


// Defaults
/** @const */ var ELASTICSEARCH_HOST = 'localhost';
/** @const */ var ELASTICSEARCH_PORT =  9200;
/** @const */ var ELASTICSEARCH_LOG  = 'trace';



/**
 * ElasticSearch Client
 *
 * @constructor
 * @param {string} - config.host - Hostname of elasticsearch instance (Default localhost).
 * @param {number} - config.port - Port of elasticsearch instance (Default 9200).
 * @param {string} - config.log  - Log configuration of client (Default 'trace').
 */
var Client = function(config) {
  if (config) this.connect(config);
};


Client.prototype = {
  
  /**
   * Initialize & connet to ElasticSearch instance
   *
   * @param {string} - config.host - Hostname of elasticsearch instance (Default localhost).
   * @param {number} - config.port - Port of elasticsearch instance (Default 9200).
   * @param {string} - config.log  - Log configuration of client (Default 'trace').
   */
  initialize: function(config) {
    // Set config
    this.config = {
      host: config.host || ELASTICSEARCH_HOST,
      port: config.port || ELASTICSEARCH_PORT,
      log:  config.log  || ELASTICSEARCH_LOG
    };
    
    // start elasticsearch
    var host = this.config.host + ':' + config.port;
    var log  = this.config.log;
    this.elasticsearch = new elasticsearch.Client({
      host: host,
      log: log
    });
  },
  
  
  /**
   * Perform a search
   *
   * @param {string} - query - The search query.
   */
  search: function(query, options) {
    options = options || {};
    this._search(query, options);
  }
  
};



/**
 * PRIVATE
 * Perform a search
 */
Client.prototype._search = function(query, options) {
  
};
 



/** export */
module.exports = Client = new Client();