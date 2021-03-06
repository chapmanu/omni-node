// Dependencies
var client    = require('../lib/client.js');
var responses = require('../helpers/responses.js');
var format    = require('../helpers/format.js');


/**
 * Sample Controller
 */
module.exports = {
  
  search: function(req, res) {
    // No query
    if (!req.param('q')) {
      return responses.respond(req, res, responses.missing_query);
    }
    
    // Get query
    var query = req.param('q');
    
    // Set options
    var options = {};
    if (req.param('limit'))    options.limit    = req.param('limit');
    if (req.param('per_page')) options.per_page = req.param('per_page');
    if (req.param('page'))     options.page     = req.param('page');
    if (req.param('types'))    options.types    = req.param('types').split(',');
    
    // Do search
    client.searchSample(query, options, function(error, search_results) {
      var results = format.results(query, options, search_results);
      
      if (error) {
        console.log(error);
        return responses.respond(req, res, responses.internal_error);
      }
      
      var response = {
        status: 200,
        content: results
      };
      
      return responses.respond(req, res, response);
    });
    
  }
  
};