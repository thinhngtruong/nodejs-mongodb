import express from 'express';
import router from './routes/index.js';
import db from './models/index.js';
import handleErrorMiddleware from './middleware/handleError.js'
import loggerMiddleware from './middleware/logger.js'

const app = express();

const PORT = process.env.PORT || 8000;

// Logger middleware
app.use(loggerMiddleware);

// Connect DB
db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log("Connected to the database!");
	})
	.catch(err => {
		console.log("Cannot connect to the database!", err);
		process.exit();
	});

app.use(express.json());

app.use(router);

// Error handler middleware
app.use(handleErrorMiddleware)

app.get('/', (req, res) => {
	res.send(`Hello world`)
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})