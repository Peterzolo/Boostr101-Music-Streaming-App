 
 const Joi = require('joi')
 const passwordComplexity = require('joi-password-complexity')


exports.validate = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(10).required(),
		email: Joi.string().email().required(),
		password: passwordComplexity().required(),
		month: Joi.string().required(),
		date: Joi.string().required(),
		year: Joi.string().required(),
		gender: Joi.string().valid("male", "female", "non-binary").required(),
	});
	return schema.validate(user);
};
