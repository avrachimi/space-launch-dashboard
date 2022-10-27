// Execute on Page Load
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

// Call API through backend and use the response to populate the table
fetch('/upcoming', options)
    .then(res => res.json())
    .then(json => {
        populateTable(json);
    }).catch(err => {
        console.log(err);
    });


// FUNCTIONS //
function populateTable(data) {
    var results = data.results;
    if (results !== undefined) {
        var table = document.getElementById("space-launch-table");
        const rowClick = e => {
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
            status.innerText = results[i].status.abbrev;
            status.id = results[i].id;
            var datetime = document.createElement('td');
            datetime.innerText = new Date(results[i].net).toString();
            datetime.id = results[i].id;
            var provider = document.createElement('td');
            provider.innerText = results[i].launch_service_provider.name;
            provider.id = results[i].id;
            var type = document.createElement('td');
            type.innerText = results[i].launch_service_provider.type == null ? 'N/A' : results[i].launch_service_provider.type;
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