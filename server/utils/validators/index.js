const Joi = require("joi")


const userSignUpSchema = Joi.object({
    username:Joi.string().max(50).min(3).required().messages({
        'string.base': 'Username must be a string.',
        'string.empty': 'Username cannot be empty.',
        'string.min': 'Username must be at least 3 characters long.',
        'string.max': 'Username cannot be longer than 50 characters.',
        'any.required': 'Username is required.'
    }),
    email:Joi.string().trim().email().required().messages({
        'string.base': 'Email must be a string.',
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Please provide a valid email address.',
        'any.required': 'Email is required.'
    }),
    password:Joi.string().min(8).max(50).required().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password cannot be empty.',
        'string.min': 'Password must be at least 6 characters long.',
        'string.max': 'Password cannot be longer than 50 characters.',
        'any.required': 'Password is required.'
    }),
})
const userLoginSchema = Joi.object({
    email:Joi.string().email().required().messages({
        'string.base': 'Email must be a string.',
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Please provide a valid email address.',
        'any.required': 'Email is required.'
    }),
    password:Joi.string().required().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password cannot be empty.',
        'any.required':'password is required'})
})
module.exports = {userSignUpSchema,userLoginSchema};