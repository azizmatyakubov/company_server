export const role = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
        return res.status(401).send('Unauthorized')
        }
        next()
    }
}