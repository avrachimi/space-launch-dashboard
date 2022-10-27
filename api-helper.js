require('dotenv').config();

const fetch = require('node-fetch');
const db = require('./db-helper.js');

const BASE_URL = process.env.API_BASE_URL;

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

function getLaunches() {
    fetch(BASE_URL + '/launch/upcoming', options)
        .then(res => {
            if (res.status !== 200) {
                console.log('Something went wrong while retrieving upcoming launches data from LL API');
                return;
            }
            return res.json();
        })
        .then(json => {
            db.insertLaunches(json.results);
        }).catch(err => {
            console.log(err);
        });
}

function getISSDockedVehicles() {
    fetch(BASE_URL + '/spacestation/4', options)
        .then(res => {
            if (res.status !== 200) {
                console.log('Something went wrong while retrieving ISS Docked Vehicle data from LL API');
                return;
            }
            return res.json();
        })
        .then(json => {
            db.insertISSDockedVehicles(json.docking_location); // Only pass the docked vehicles data array
        }).catch(err => {
            console.log(err);
        });
}

function getISSCrew() {
    fetch(BASE_URL + '/spacestation/4', options)
        .then(res => {
            if (res.status !== 200) {
                console.log('Something went wrong while retrieving ISS Crew data from LL API');
                return;
            }
            return res.json();
        })
        .then(json => {
            db.insertISSCrew(json.active_expeditions[0].crew); // Only pass the crew data array
        }).catch(err => {
            console.log(err);
        });
}

function getStarshipUpdates() {
    fetch(BASE_URL + '/dashboard/starship', options)
        .then(res => {
            if (res.status !== 200) {
                console.log('Something went wrong while retrieving Starship data from LL API');
                return;
            }
            return res.json();
        })
        .then(json => {
            db.insertStarshipUpdates(json.updates);
        }).catch(err => {
            console.log(err);
        });
}

module.exports = {
    getLaunches,
    getISSDockedVehicles,
    getISSCrew,
    getStarshipUpdates
};