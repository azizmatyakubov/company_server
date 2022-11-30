import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.status(401).send('Unauthorized')
  
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Forbidden')
            req.user = decoded
            next()
    })
}