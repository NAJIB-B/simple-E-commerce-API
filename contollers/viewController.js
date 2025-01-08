



exports.getOverview = async(req, res, next) => {

  res.render('overview')

}

exports.getSuccessPage = async(req, res, next) => {
  

  res.render('success')

}

exports.getCancelPage = async(req, res, next) => {

  res.render('cancel')

}

exports.getProductPage = async(req, res, next) => {

	res.render('product')
  
  }

  exports.getLoginPage = async(req, res, next) => {

	res.render('login')
  
  }

  exports.getCartPage = async(req, res, next) => {

	res.render('cart')
  
  }
