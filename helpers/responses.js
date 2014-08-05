/**
 * Responses
 */
module.exports = {
  
  respond: function(req, res, response) {
    if (req.param('jsonp')) {
      return res.status(response.status).jsonp(response.content);
    } else {
      return res.status(response.status).json(response.content);
    }
  },
  
  missing_query: {
    status: 400,
    content: {
      status: 400,
      error: 'No query provided.'
    }
  },
  
  internal_error: {
    status: 500,
    content: {
      status: 500,
      error: 'Internal error.'
    }
  }
  
};