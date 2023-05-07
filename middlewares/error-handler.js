const errorHandler = (err, req, res, next) => {
    // log error 
    console.log(err.message)
    res.status(500).json({msg: 'Something went wrong, please try again.'})
    next()
} 

module.exports = errorHandler;