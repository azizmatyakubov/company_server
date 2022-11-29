import jwt from 'jsonwebtoken';

export default {
    sign: (payload, secret, options) => {
        return jwt.sign(payload, secret, options);
    },
    verify: (token, secret, options) => {
        return jwt.verify(token, secret, options);
    }
}
