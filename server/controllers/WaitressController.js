
module.exports = {
  order: (req, res, next) => {
    console.log("hola");
    res.render('waitress/index');
  }
};
