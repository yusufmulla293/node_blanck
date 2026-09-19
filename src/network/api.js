const express = require("express");

const ipMiddleware = require("../middleware/ip.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const encryptionMiddleware = require("../middleware/encryption.middleware");
const rateLimitMiddleware = require("../middleware/rateLimit.middleware");
const validateRequiredFields = require("../middleware/validation.middleware");

const router = express.Router();

const getMiddlewares = (options = {}) => {
    const middlewares = [];

    if (options.ip) {
        middlewares.push(ipMiddleware);
    }

    if (options.rateLimit) {
        middlewares.push(rateLimitMiddleware);
    }

    if (options.encryption) {
        middlewares.push(
            express.text({
                type: ["text/plain", "application/encrypted"],
            }),
            encryptionMiddleware
        );
    }

    if (options.FieldValidation) {
        middlewares.push(
            validateRequiredFields(options.FieldValidation)
        );
    }

     if (options.auth) {
        middlewares.push(authMiddleware);
    }

    return middlewares;
};

const defaultHandler = (req, res) => {
    return res.json({
        success: true,
        message: "API is working"
    });
};

const post = (path, options = {}, controller = defaultHandler) => {
    router.post(path, ...getMiddlewares(options), controller);
};

const get = (path, options = {}, controller = defaultHandler) => {
    router.get(path, ...getMiddlewares(options), controller);
};

const put = (path, options = {}, controller = defaultHandler) => {
    router.put(path, ...getMiddlewares(options), controller);
};

const patch = (path, options = {}, controller = defaultHandler) => {
    router.patch(path, ...getMiddlewares(options), controller);
};

const deleteApi = (path, options = {}, controller = defaultHandler) => {
    router.delete(path, ...getMiddlewares(options), controller);
};

module.exports = {
    get,
    post,
    put,
    patch,
    delete: deleteApi,
    router
};