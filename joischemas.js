const AppError = require('./utilities/apperror');
const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = joi => ({
	type: 'string',
	base: joi.string(),
	messages: {
		'string.escapeHTML': '{{#label}} must not include HTML!',
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {},
				});
				if (clean !== value)
					return helpers.error('string.escapeHTML', { value });
				return clean;
			},
		},
	},
});

const Joi = BaseJoi.extend(extension);

const joiLogin = (req, res, next) => {
	const memberSchema = Joi.object().keys({
		username: Joi.string().trim().required().escapeHTML(),
		password: Joi.string().trim().min(8).required().escapeHTML(),
	});

	const { error } = memberSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

const joiSignup = (req, res, next) => {
	const memberSchema = Joi.object().keys({
		username: Joi.string().trim().required().escapeHTML(),
		email: Joi.string().email().trim().required().escapeHTML(),
		password: Joi.string().trim().min(8).required().escapeHTML(),
		confirmPassword: Joi.string().trim().min(8).required().escapeHTML(),
		signupCheck: Joi.string().required().escapeHTML(),
	});

	const { error } = memberSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

const joiArticle = (req, res, next) => {
	const articleSchema = Joi.object().keys({
		title: Joi.string().trim().required().escapeHTML(),
		article: Joi.string().trim().required().escapeHTML(),
	});

	const { error } = articleSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

const joiComment = (req, res, next) => {
	const commentSchema = Joi.object().keys({
		comment: Joi.string().trim().required().escapeHTML(),
	});
	const { error } = commentSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports = {
	joiLogin,
	joiSignup,
	joiArticle,
	joiComment,
};
