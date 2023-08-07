module.exports = (err, req, res, next) => {
    console.log(err)
    let status = err.status || 500
    let msg = err.msg || 'Internal server error'
  
    res.status(status).json({msg})
  }