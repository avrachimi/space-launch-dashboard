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

3. Create Database tables using queries found at the end of the ```db-helper.js``` file

4. Install all dependencies
```sh
npm install
```

5. Run!
```sh
npm start
```