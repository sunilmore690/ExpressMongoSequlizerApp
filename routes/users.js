/* GET users listing. */

module.exports = function(router) {
  router.post("/login", 'users#authenticate');
};
