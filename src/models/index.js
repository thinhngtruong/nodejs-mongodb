import mongoose from 'mongoose';
import dbConfig from '../config/db.config.js';
import personModel from './persons.model.js'

mongoose.Promise = global.Promise;

export default {
    mongoose,
    url: dbConfig.url,
    persons: personModel(mongoose)
}