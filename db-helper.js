require('dotenv').config();

var mysql = require('mysql');

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// GET //
function getLaunches() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM launches`, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function getISSDockedVehicles() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM iss_docked_vehicles`, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function getISSCrew() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM iss_crew`, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function getStarshipUpdates() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM starship_updates`, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

// INSERT //
function insertLaunches(data) {
    const sql = 'INSERT INTO `launches` (`name`,`status_short`,`status_long`,`datetime`,`provider_name`,`provider_type`,`rocket_name`,`mission_name`) VALUES ?';
    let bulk_items = [];
    data.forEach(launch => {
        bulk_items.push([
            launch.name,
            launch.status.abbrev,
            launch.status.name,
            new Date(launch.net).toISOString().slice(0, 19).replace('T', ' '),
            launch.launch_service_provider.name,
            launch.launch_service_provider.type,
            launch.rocket.configuration.name,
            launch.mission.name
        ]);
    });

    // Bulk Insert
    db.query(sql, [bulk_items], (err, result) => {
        if (err) throw err;
        return result;
    });
}

function insertISSDockedVehicles(data) {
    const sql = 'INSERT INTO `iss_docked_vehicles` (`name`,`docked_at`) VALUES ?';
    let bulk_items = [];
    data.forEach(vehicle => {
        bulk_items.push([
            vehicle.name,
            vehicle.docked ? new Date(vehicle.docked.docking).toISOString().slice(0, 19).replace('T', ' ') : null
        ]);
    });

    // Bulk Insert
    db.query(sql, [bulk_items], (err, result) => {
        if (err) throw err;
        return result;
    });
}

function insertISSCrew(data) {
    const sql = 'INSERT INTO `iss_crew` (`name`,`role`,`agency`,`img_url`) VALUES ?';
    let bulk_items = [];
    data.forEach(update => {
        bulk_items.push([
            update.comment,
            update.info_url
        ]);
    });

    // Bulk Insert
    db.query(sql, [bulk_items], (err, result) => {
        if (err) throw err;
        return result;
    });
}

function insertStarshipUpdates(data) {
    const sql = 'INSERT INTO `starship_updates` (`comment`,`info_url`, `created_on`) VALUES ?';
    let bulk_items = [];
    data.forEach(update => {
        bulk_items.push([
            update.comment,
            update.info_url,
            new Date(update.created_on).toISOString().slice(0, 19).replace('T', ' ')
        ]);
    });

    // Bulk Insert
    db.query(sql, [bulk_items], (err, result) => {
        if (err) throw err;
        return result;
    });
}

module.exports = {
    getLaunches,
    getISSDockedVehicles,
    getISSCrew,
    getStarshipUpdates,
    insertLaunches,
    insertISSDockedVehicles,
    insertISSCrew,
    insertStarshipUpdates
};

/*
Queries for creation of tables

CREATE TABLE launches (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    status_short VARCHAR(10),
    status_long VARCHAR(255),
    datetime DATETIME,
    provider_name VARCHAR(255),
    provider_type VARCHAR(50),
    rocket_name VARCHAR(255),
    mission_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE iss_docked_vehicles (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    docked_at DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE iss_crew (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    role VARCHAR(255),
    agency VARCHAR(255),
    img_url VARCHAR(2083),
    PRIMARY KEY (id)
);

CREATE TABLE starship_updates (
    id INT NOT NULL AUTO_INCREMENT,
    comment VARCHAR(2000),
    info_url VARCHAR(2083),
    created_on DATETIME,
    PRIMARY KEY (id)
);
*/