/**
 * Format
 */
module.exports = {
  
  results: function(query, options, response) {
    return {
      query:   this._query(query, options),
      info:    this._info(options, response),
      results: this._results(response)
    };
  },
  
  
  
  
  _query: function(query, options) {
    var query = { term: query };
    if (options.limit)    query.limit    = options.limit;
    if (options.per_page) query.per_page = options.per_page;
    if (options.page)     query.page     = options.page;
    if (options.types)    query.types    = options.types;
    
    return query;
  },
  
  _info: function(options, response) {
    var per_page = options.limit || options.per_page || 10;
    var page     = options.page || 1;
    return {
      total:     response.hits.total,
      returned:  response.hits.hits.length,
      per_page:  per_page,
      page:      page,
      num_pages: Math.ceil(response.hits.total/per_page) || 1
    };
  },
  
  _results: function(response) {
    return response.hits.hits;
  }
  
  
};