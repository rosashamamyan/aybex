const ApiError = require("../exeptions/apiError")

module.exports = function (err, req, res, next) {
    console.log(err);
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.stats(500).json({message: "Internal Server Error"})
}