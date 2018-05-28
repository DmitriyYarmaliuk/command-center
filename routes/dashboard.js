const express = require('express')
const Joi = require('joi')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', '/app/index.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../', '/app/about.html'));
});

module.exports = router


