module.exports = function(dao) {

  let create = function(req, res, next) {
    let body = req.body;
    dao
      .add(body)
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
    dao
      .getAll(req.query)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        return next(err);
      });
  };
  let show = function(req, res, next) {
    dao
      .get({ _id: req.params.id })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        return next(err);
      });
  };
  let destroy = function(req, res, next) {
    dao
      .destory({ _id: req.params.id })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        return next(err);
      });
  };
  let update = function(req, res, next) {
    delete req.body._id;
    let multi = false;
    dao
      .update({ _id: req.params.id }, req.body, multi)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        next(err);
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
