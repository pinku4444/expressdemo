const notFoundRoute = (req,res,next) => {
    let error  = new Error();
    error.statusCode = 404;
    error.msg  = "url not found";
    next(error);
}

export default notFoundRoute;