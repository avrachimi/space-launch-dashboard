const fetch = require('node-fetch');
const db = require('./db-helper.js');
const api_helper = require('./api-helper.js');

const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/api/launches', (req, res) => {
    //  api_helper.getStarshipUpdates(); // testing
    db.getLaunches()
        .then(json => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json));
        }).catch(err => {
            console.log(err);
        });
});

app.get('/api/iss-docked-vehicles', (req, res) => {
    db.getISSDockedVehicles()
        .then(json => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json));
        }).catch(err => {
            console.log(err);
        });
});

app.get('/api/iss-crew', (req, res) => {
    db.getISSCrew()
        .then(json => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json));
        }).catch(err => {
            console.log(err);
        });
});

app.get('/api/starship', (req, res) => {
    db.getStarshipUpdates()
        .then(json => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json));
        }).catch(err => {
            console.log(err);
        });
});

app.listen(3000, () => console.log('Server listening on PORT 3000'));