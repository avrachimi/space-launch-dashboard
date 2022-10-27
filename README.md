# Space Launch Dashboard

**Frontend: HTML, CSS, Javascript**  
**Backend: Node.js**  
**Database: MySQL**  

Using the [Launch Library API](https://ll.thespacedevs.com).

### Pages
- /launches
- /iss
- /starship

## How to Install and Run
**You should already have Node and MySQL server installed and running.**

1. Clone this repository
```sh
git clone https://github.com/avrachimi/space-launch-dashboard.git
```

2. Create a ```.env``` file in the root directory of the project and add the appropriate environment variables
```
DB_HOST=yourHostAddress
DB_USER=yourDatabaseUsername
DB_PASSWORD=yourDatabasePassword
DB_NAME=yourDatabaseTableName

API_BASE_URL=https://lldev.thespacedevs.com/2.2.0
```

3. Create Database and Database Tables using the queries below
```
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
```

4. Install all dependencies
```sh
npm install
```

5. Run!
```sh
npm start
```