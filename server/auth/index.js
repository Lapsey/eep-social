const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const db = require('../db/usersDB');
const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router();

router.post()

module.exports = router;