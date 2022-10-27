// Execute on Page Load
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

// Call API through backend and use the response to populate the table
fetch('/api/launches', options)
    .then(res => res.json())
    .then(json => {
        populateTable(json);
    }).catch(err => {
        console.log(err);
    });


// FUNCTIONS //
function populateTable(results) {
    if (results !== undefined) {
        var table = document.getElementById("space-launch-table");

        const rowClick = e => {
            // Populate Modal
            populateModal(e);

            // Show Modal
            var modal = document.getElementById('details-modal');
            modal.style.display = 'block';

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            // When the user clicks on X, close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }
        };

        // For each entry, insert a new Row and add values to each cell in the table
        for (let i = 0; i < results.length; i++) {
            var tr = document.createElement('tr');
            tr.addEventListener('click', rowClick);

            tr.id = results[i].id;
            var name = document.createElement('td');
            name.innerText = results[i].name;
            name.id = results[i].id;
            var status = document.createElement('td');
            status.innerText = results[i].status_short;
            status.id = results[i].id;
            var datetime = document.createElement('td');
            datetime.innerText = new Date(results[i].datetime).toString();
            datetime.id = results[i].id;
            var provider = document.createElement('td');
            provider.innerText = results[i].provider_name;
            provider.id = results[i].id;
            var type = document.createElement('td');
            type.innerText = results[i].provider_type == null ? 'N/A' : results[i].provider_type;
            type.id = results[i].id;

            tr.appendChild(name);
            tr.appendChild(status);
            tr.appendChild(datetime);
            tr.appendChild(provider);
            tr.appendChild(type);

            table.appendChild(tr);
        }
    }
    else {
        console.log('No data'); // results object is undefined
    }
}

// TODO: Finish after implementing database
function populateModal(e) {
    var title = document.getElementById('modal-launch-title');
    var status = document.getElementById('modal-launch-status');
    var datetime = document.getElementById('modal-launch-datetime');
    var provider = document.getElementById('modal-launch-provider');
    var description = document.getElementById('modal-launch-details');

    fetch('/api/upcoming-launches', options)
        .then(res => res.json())
        .then(json => {
            title.innerText = json.name;
        }).catch(err => {
            console.log(err);
        });

    console.log(e.target.id);
}