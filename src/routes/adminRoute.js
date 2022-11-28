import express from 'express';

const adminRouter = express.Router();


adminRouter.get('/', (req, res) => {
    res.send('Admin dashboard');
}
);

export default adminRouter;


