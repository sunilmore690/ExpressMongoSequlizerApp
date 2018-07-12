
module.exports = function(dao,model_name) {
  let create = function(req, res, next) {
    let body = req.body;
    dao
      .add(model_name, body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(e) {
        return next(e);
      });
  };
  let index = async function(req, res, next) {

    //async await approach
    // try{
    //   let data = await dao.getAll(model_name,req.query);
    //   return res.json(data)
    // }catch(e){
    //   return next(e)
    // }
    //promise approach
    dao.getAll(model_name, req.query).then((data)=> {
      res.json(data)
    }).catch((err)=>{
      return next(err)
    })
  };
  let show = function(req, res, next) {
    dao.get(model_name, { _id: req.params.id }, function(err, user) {
      if (err) return next(err);
      res.json(user);
    });
  };
  let destroy = function(req, res, next) {
    dao.destory(dao, { _id: req.params.id }, function(err, result) {
      if (err) return next(err);
      res.json(result);
    });
  };
  let update = function(req, res, next) {
    delete req.body._id;
    dao.update(model_name, { _id: req.params.id }, req.body, function(
      err,
      user
    ) {
      if (err) return next(err);
      res.json(user);
    });
  };
  return {
    create,
    index,
    show,
    destroy,
    update
  };
};
