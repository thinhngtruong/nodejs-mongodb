import express from 'express';
import db from '../models/index.js'

const Person = db.persons;

const router = express.Router();

router.get('/', (req, res, next) => {
    Person.find({})
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Person.findById(id)
        .then(person => {
            if (person) {
                res.send(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => {
            next(err);
        })
});

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, number } = req.body;
    const newPerson = {
        name,
        number
    }
    Person.findByIdAndUpdate(id, newPerson, { new: true })
        .then(updatedPerson => {
            if (updatedPerson) {
                res.send(updatedPerson)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => {
            next(err);
        })
});

router.post('/', (req, res, next) => {
    const { name, number } = req.body;
    const id = Math.random();

    if (!name) {
        return res.status(400).send({
            error: 'Missing name'
        })
    }

    if (!number) {
        return res.status(400).send({
            error: 'Missing number'
        })
    }

    const newPerson = new Person({
        id,
        name,
        number
    })

    newPerson
        .save()
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => {
            next(err);
        });
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params
    Person.findByIdAndRemove(id)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => {
            next(err);
        })
});

export default router;