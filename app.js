const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use('/*', (req, res, next) => next({ status: 404 }));

app.use((err, req, res, next) => {
    if(err.status === 404) res.status(404).send({ message: '404: Page Not Found.' })
    else next(err);
});

app.use((err, req, res, next) => {
    if(err.status === 400) res.status(400).send({ message: '400: Bad Request.' })
    else next(err);
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: '500: Internal Server Error.'})
})

module.exports = app;