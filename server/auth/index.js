const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const db = require('../db/usersDB');
const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router();

const schema = joi.object().keys({
    username: joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(3).max(30).required(),
    password: joi.string().trim().min(8).required()
});

function createTokenSendResponse(user, res, next) {
    const payload = {
        _id: user._id,
        username: user.username
    };

    jwt.sign(payload, 'PSrP5edQqCGivoPS6Dl1', {
        expiresIn: '1d',
    }, (err, token) => {
        if (err) {
            loginError(res, next);
        } else {
            res.json({ token });
        }
    });
}

router.post('/signup', (req, res, next) => {
    const result = joi.validate(req.body, schema);

    if (result.error === null) {
        users.findOne({
            username: req.body.username
        }).then(user => {
            if (user) {
                const error = new Error('That username already exists.');
                res.status(409);
                next(error);
            } else {
                bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {
                    const newUser = {
                        username: req.body.username,
                        password: hashedPassword
                    };

                    users.insert(newUser).then(insertedUser => {
                        // delete insertedUser.password;
                        // res.json(insertedUser);

                        createTokenSendResponse(insertedUser, res, next)
                    });
                });
            }
        });
    } else {
        res.status(422);
        next(result.error);
    }
});

function loginError(res, next) {
    res.status(422);
    const error = new Error('Unable to login');
    next(error);    
}

router.post('/login', (req, res, next) => {
    const result = joi.validate(req.body, schema);
    if (result.error === null) {
        users.findOne({
            username: req.body.username
        }).then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password).then(result => {
                    if (result) {
                        createTokenSendResponse(user, res, next);
                    } else {
                        loginError(res, next);
                    }
                });                
            } else {
                loginError(res, next);
            }
        });
    } else {
        loginError(res, next);
    }
});

module.exports = router;

module.exports = router;