module.exports = (err,req,res,next) => {
    console.log("test");
    if(!err.statusCode) {
        err.statusCode = 500;
    }
    const errorResponse = {
        status : false,
        code : err.statusCode,
        errors : err.msg
    }
    res.status(err.statusCode).json(errorResponse);

}
