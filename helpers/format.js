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
    var results = [];
    response.hits.hits.forEach(function(hit) {
      switch(hit._type) {
        
      // Post
      case 'post':
        var result = {
          type:  'post',
          url:   'https://inside.chapman.edu/posts/'+hit._source.id,
          photo: hit._source.author.avatar,
          text:  hit._source.text
        };
        if (hit._source.photos.length > 0) result.photo = hit._source.photos[0].url;
        results.push(result);
        break;
        
      // Blog
      case 'blog':
        var result = {
          type:  'blog',
          url:   hit._source.post.guid,
          text:  hit._source.post.post_title
        };
        if (hit._source.post.image) result.photo = hit._source.post.image.url;
        results.push(result);
        break;
        
      // WWW
      case 'www':
        var result = {
          type:  'www',
          url:   hit._source.url,
          text:  hit._source.title
        };
        if (hit._source.photo) result.photo = hit._source.photo;
        results.push(result);
        break;
      }
    });
    
    // Return
    return results;
  }
  
  
};