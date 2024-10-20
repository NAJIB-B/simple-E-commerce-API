



exports.getOverview = async(req, res, next) => {

  res.render('overview')

}

exports.getSuccessPage = async(req, res, next) => {
  

  res.render('success')

}

exports.getCancelPage = async(req, res, next) => {

  res.render('cancel')

}
