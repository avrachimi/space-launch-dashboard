const express = require('express');
const router = express.Router();

const db = require('../db-helper');

router.get('/', async (req, res) => {
    var iss_crew = await db.getISSCrew();
    var iss_docked = await db.getISSDockedVehicles();
    var starship = await db.getStarshipUpdates();
    var launches = await db.getLaunches();

    res.render('index', { crew: iss_crew, docked_vehicles: iss_docked, starship: starship, launches: launches });
});

router.get('/launches', (req, res) => {
    db.getLaunches()
        .then(json => {
            res.render('launches', { data: json });
        }).catch(err => {
            console.log(err);
        });
});

router.get('/iss', async (req, res) => {
    var crew = await db.getISSCrew();
    var docked_vehicles = await db.getISSDockedVehicles();
    
    res.render('iss', { crew: crew, docked_vehicles: docked_vehicles });
});

router.get('/starship', (req, res) => {
    db.getStarshipUpdates()
        .then(json => {
            res.render('starship', { data: json });
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;