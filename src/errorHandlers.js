// error handler for 400 bad request
export const badRequestHandler = (err, req, res, next) => {
    if(err.status === 400) {
       res.status(400).send({ message: err.message, errorList: err.errorList });
    } else {
        next(err);
    }
}

// error handler for 401 unauthorized
export const unauthorizedHandler = (err, req, res, next) => {
    if(err.status === 401) {
        res.status(401).send({ message: err.message });
    } else {
        next(err);
    }
}

// error handler for 404 not found
export const notFoundHandler = (err, req, res, next) => {
    if(err.status === 404) {
        res.status(404).send({ message: err.message });
    } else {
        next(err);
    }
}

// error handler for 500 internal server error
export const internalServerErrorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ message: err.message });
}