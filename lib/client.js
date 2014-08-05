// Dependencies
var elasticsearch = require('elasticsearch');


/** @const */ var ELASTICSEARCH_HOST     = 'localhost';
/** @const */ var ELASTICSEARCH_PORT     =  9200;
/** @CONST */ var ELASTICSEARCH_LOGLEVEL = 'trace';


/**
 * ElasticSearch Client
 *
 * @constructor
 * @param {string} - config.host - Hostname of elasticsearch instance (Default localhost).
 * @param {number} - config.port - Port of elasticsearch instance (Default 9200).
 * @param {string} - config.log_level - Logging level of client (Default 'trace').
 */
var Client = function(config) {
  this.elasticsearch = new elasticsearch.Client({
    host: (config.host || ELASTICSEARCH_HOST) + ':' + (config.port || ELASTICSEARCH_PORT),
    log: config.log_level || ELASTICSEARCH_LOGLEVEL
  });
};



/** export */
module.exports = Client;