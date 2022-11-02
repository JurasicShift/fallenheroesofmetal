const wrapAsync = require('./utilities/wrapasync');
const AppError = require('./utilities/apperror');
const Member = require('./models/members');

const requireLogin = (req, res, next) => {
	// req.session.returnTo = req.originalUrl;
	if (!req.session.login || !req.session.username) {
		req.flash('error', 'Login Required');
		res.redirect(req.session.returnTo);
	} else {
		next();
	}
};

const existingClient = wrapAsync(async (req, res, next) => {
	const b = req.body;
	const use = await Member.exists({ username: b.username });
	const mail = await Member.exists({ email: b.email });
	if (use || mail) {
		req.flash('error', 'Username or email already exists.');
		res.redirect('/signlog');
	} else {
		next();
	}
});

const previousUrl = (req, res, next) => {
	req.session.returnTo = req.originalUrl;
	next();
};

const listManager = (req, res, next) => {
	const id = req.headers['comment-id'];
	const type = req.headers['comment-type'];
	const likeValue = req.headers['like-value'];
	const newObj = { id: id, value: likeValue };
	let list = req.session.likesList;
	let plusMinus = 1;
	if (!list) {
		list = [];
		list.push(newObj);
		req.session.likesList = list;
	} else if (list.length === 0) {
		list.push(newObj);
		req.session.likesList = list;
	} else if (list.length >= 1) {
		let found = false;
		for (let obj of list) {
			if (obj.id === id && obj.value === likeValue) {
				plusMinus = -1;
				let newList = list.filter(val => val != obj);
				req.session.likesList = newList;
				found = true;
				break;
			}
		}
		if (!found) {
			list.push(newObj);
			req.session.likesList = list;
		}
	}
	req.plusMinus = plusMinus;
	next();
};

module.exports = {
	requireLogin,
	existingClient,
	previousUrl,
	listManager,
};
