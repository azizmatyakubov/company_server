export const role = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))  {
        return res.status(401).send('Unauthorized')
        } 
        next()
    }
}

export const adminOrOwner = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.id === req.params.id) {
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
 
}
