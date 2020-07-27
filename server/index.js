const express = require('express');
const volleyball = requrie('volleyball');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(volleyball());
app.use(cors({
    origin: 'http://localhost:8080'
}));

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode == 200 ? 500 : res.statusCode);
    res.json({
        message: err.message,
        stack: err.stack
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(5050, () => {
    console.log('listening on port 5050');
})