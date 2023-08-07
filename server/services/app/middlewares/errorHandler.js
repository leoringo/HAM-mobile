module.exports = (err, req, res, next) => {
    console.log(err);

    let status = err.status || 500
    let message = err.message || 'Internal Server Error'

    switch(err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = err.errors[0].message;
            break
    }


    res.status(status).json({ message })
}