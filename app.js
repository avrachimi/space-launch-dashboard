const fetch = require('node-fetch');

const express = require('express');
const app = express();

app.listen(3000, () => console.log('Server listening on PORT 3000'));

app.use(express.static('public'));
app.use(express.json());

const API_BASE_URL = "https://lldev.thespacedevs.com/2.2.0"

app.get('/upcoming', (request, response) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(API_BASE_URL + '/launch/upcoming', options)
    .then(res => {
        if (res.status !== 200) {
            console.log('Something went wrong');
            return;
        }
        return res.json();
    })
    .then(json => {
        response.json(json);
    }).catch(err => {
        console.log(err);
    });
});