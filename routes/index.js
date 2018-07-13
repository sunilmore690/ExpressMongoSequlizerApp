/* GET home page. */
module.exports = function(router) {
  router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
  });
};
