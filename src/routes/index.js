import express from 'express';
import PersonRouter from './person.js';
import InfoRouter from './info.js';

const router = express.Router();

const rootAPI = '/api'

router.use(`/info`, InfoRouter);

router.use(`${rootAPI}/persons`, PersonRouter);


export default router;