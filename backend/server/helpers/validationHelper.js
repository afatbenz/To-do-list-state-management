const express             = require('express');
const router              = express.Router();
const Joi = require('joi');

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
};

const validateSubmitRegistration = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        confirm_password: Joi.string().required(),
    });
    return schema.validate(data);
};

const validateTokenActivation = (data) => {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    return schema.validate(data);
};

const validateForgotPassword = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(5).required()
    });
    return schema.validate(data);
};

const validateResetPasswordOTP = (data) => {
    const schema = Joi.object({
        otp: Joi.string().required(),
        token: Joi.string().required()
    });
    return schema.validate(data);
};

const validateNewPassword = (data) => {
    const schema = Joi.object({
        password: Joi.string().required(),
        confirm_password: Joi.string().required(),
        token: Joi.string().required(),
    });
    return schema.validate(data);
};

const validateSubmitItem = (data) => {
    const schema = Joi.object({
        headers: {
            Authorization: Joi.string().required(),
        },
        title: Joi.string().required(),
        description: Joi.string().optional()
    });
    return schema.validate(data);
};

const validateUpdateItem = (data) => {
    const schema = Joi.object({
        itemID: Joi.number().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        started_price: Joi.string().required(),
        started_date: Joi.string().required(),
    });
    return schema.validate(data);
};

const validateUpdateStatus = (data) => {
    const schema = Joi.object({
        itemID: Joi.number().required(),
        status: Joi.string().required(),
    });
    return schema.validate(data);
};

const validateGetDetail = (data) => {
    const schema = Joi.object({
        itemID: Joi.string().required()
    });
    return schema.validate(data);
};

const validateDeleteItem = (data) => {
    const schema = Joi.object({
        headers: {
            Authorization: Joi.string().required(),
        },
        itemID: Joi.number().required()
    });
    return schema.validate(data);
};

const validateCompletedItem = (data) => {
    const schema = Joi.object({
        headers: {
            Authorization: Joi.string().required(),
        },
        itemID: Joi.number().required()
    });
    return schema.validate(data);
};

module.exports = {
    validateLogin,
    validateSubmitRegistration,
    validateTokenActivation,
    validateForgotPassword,
    validateResetPasswordOTP,
    validateNewPassword,
    validateSubmitItem,
    validateUpdateItem,
    validateGetDetail,
    validateDeleteItem,
    validateUpdateStatus,
    validateCompletedItem
}