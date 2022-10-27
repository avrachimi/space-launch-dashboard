const path = require('path');
const cron = require('node-cron');
const express = require('express');
const api_helper = require('./api-helper')
const pagesRouter = require('./routes/pages');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname + '/public')));

app.use('/', pagesRouter);

app.use((req, res, next) => {
    res.status(404).render('404', { page: 'Page not found' });
});

// Schedule job to call LL APIs every hour and update data in database
// Runs at first minute of every hour
cron.schedule('1 * * * *', () => {
    api_helper.getLaunches();
    api_helper.getISSDockedVehicles();
    api_helper.getISSCrew();
    api_helper.getStarshipUpdates();
    console.log('Cron Job Completed: Updated database');
});

app.listen(port, () => console.log(`Server listening on PORT ${port}`));