const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const routeIndex = require('./routes/index');
const AppError = require('./utilities/apperror');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';

if (environment !== 'production') {
	require('dotenv').config();
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/fhmtest';

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB...');
	})
	.catch(err => {
		console.log("THERE'S BEEN AN ERROR: ", err);
	});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
const secret = process.env.SESSION_SECRET;
const store = MongoStore.create({ mongoUrl: dbUrl, touchAfter: 24 * 60 * 60 });

store.on('error', function (e) {
	console.log('SESSION STORE ERROR:', e);
});

const sessionOptions = {
	store: store,
	name: 'edgeoftime',
	secret: secret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		// secure: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};
app.use(session(sessionOptions));
app.use(flash());
app.use(mongoSanitize());
app.use(cors());
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);

app.use((req, res, next) => {
	res.header('Cross-Origin-Opener-Policy', 'unsafe-none');
	res.header('Origin-Agent-Cluster', '?0');
	next();
});

app.use((req, res, next) => {
	const date = new Date();
	res.locals.login = req.session.login || false;
	res.locals.date = date.toLocaleString('en-GB');
	res.locals.username = req.session.username || 'none';
	res.locals.current = req.url;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use((req, res, next) => {
	if (req.query._method === 'DELETE') {
		req.method = 'DELETE';
		req.url = req.path;
	}
	next();
});

app.use('/', routeIndex);

// ==================================================
// INTERCEPT PARTICULAR MONGOOSE ERRORS
// ==================================================

const handleValidationErr = err => {
	return new AppError(
		`VALIDATION FAILED...CHECK REQUIRED FIELDS ARE COMPLETE`,
		400
	);
};

const handleCastErr = err => {
	return new AppError(
		'CAST ERROR, SOMETHING WENT WRONG. IS USER INFORMATION CORRECT?',
		400
	);
};

app.use((err, req, res, next) => {
	if (err.name === 'ValidationError') err = handleValidationErr(err);
	if (err.name === 'CastError') err = handleCastErr(err);
	next(err);
});

//======================================================

app.all('*', (req, res, next) => {
	next(new AppError('Page Not Found!!!', 404));
});

app.use((err, req, res, next) => {
	const { status = 500 } = err;
	if (!err.message) err.message = 'Oh No, Something Went Wrong';
	const page = 'Error';
	res.status(status).render('error', { err, page });
});

app.listen(port, () => {
	console.log(`APP LISTENING ON ${port}`);
});
