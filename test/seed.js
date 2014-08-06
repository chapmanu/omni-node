var async  = require('async');
var client = require('../lib/client.js');

var posts = require('./samples/posts.json');
var blogs = require('./samples/blogs.json');
var www   = require('./samples/www.json');

/**
 * Configuration
 */
var config = {
  
  // General
  index: 'sample',
  
  
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


async.eachSeries(posts, function(post, callback) {
  console.log("Inserting post - "+post.id+" - "+post.text);
  client.insert(config.index, 'post', post.id, post, function(error, response) {
    if (error) {
      callback(error);
    } else {
      callback();
    }
  });
});

async.eachSeries(blogs, function(blog, callback) {
  console.log("Inserting blog - "+blog.post["ID"]+" - "+blog.post["post_title"]);
  client.insert(config.index, 'blog', blog.post["ID"], blog, function(error, response) {
    if (error) {
      callback(error);
    } else {
      callback();
    }
  });
});

async.eachSeries(www, function(www, callback) {
  console.log("Inserting www - "+www.id+" - "+www.title);
  client.insert(config.index, 'www', www.id, www, function(error, response) {
    if (error) {
      callback(error);
    } else {
      callback();
    }
  });
});