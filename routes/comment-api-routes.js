var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the comments
  app.get("/api/comments", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Comment.findAll({
      where: query,
      include: ([db.User],[db.Image])
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // Get route for retrieving a single Comment
  app.get("/api/comments/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, db.User and db.Post
    db.Comment.findOne({
      where: {
        id: req.params.id
      },
      include: ([db.User],[db.Image])
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // POST route for saving a new post
  app.post("/api/comments", function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // DELETE route for deleting comments
  app.delete("/api/comments/:id", function(req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // PUT route for updating comments
  app.put("/api/comments", function(req, res) {
    db.Comment.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbComment) {
      res.json(dbComment);
    });
  });
};
