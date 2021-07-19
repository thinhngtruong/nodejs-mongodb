import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people 
            \n${new Date()}`);
});

export default router;