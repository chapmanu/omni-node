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
  search: function(query, options, cb) {
    options = options || {};
    this._search('inside', query, options, cb);
  },
  
  
  /**
   * Perform a search
   *
   * @param {string} - query - The search query.
   */
  searchSample: function(query, options, cb) {
    options = options || {};
    this._search('sample', query, options, cb);
  },
  
  
  /**
   * Insert a record
   */
  insert: function(index, type, id, record, cb) {
    this._insert(index, type, id, record, cb);
  }
  
};



/**
 * PRIVATE
 * Perform a search
 */
Client.prototype._search = function(index, query, options, cb) {
  this.elasticsearch.search({
    index: index || 'inside',
    q: query
  }, function(error, response) {
    if (error) return cb(error);
    cb(null, response);
  });
};


/**
 * PRIVATE
 * Insert a record
 */
Client.prototype._insert = function(index, type, id, record, cb) {
  this.elasticsearch.create({
    index: index,
    type:  type,
    id:    id,
    body:  record
  }, function(error, response) {
    if (error) return cb(error);
    return cb(null, response);
  });
};
 



/** export */
module.exports = Client = new Client();