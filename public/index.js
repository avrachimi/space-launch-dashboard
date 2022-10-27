function populateTable(data) {
    var results = data.results;
    if (results !== undefined) {
        var table = document.getElementById("space-launch-table");

        // For each entry, insert a new Row and add values to each cell in the table
        for (let i = 0; i < results.length; i++) {
            let row = table.insertRow();
            row.id = results[i].id;
            let name = row.insertCell(0);
            name.innerHTML = results[i].name;
            let status = row.insertCell(1);
            status.innerHTML = results[i].status.abbrev;
            let datetime = row.insertCell(2);
            datetime.innerHTML = new Date(results[i].net).toString();
            let provider = row.insertCell(3);
            provider.innerHTML = results[i].launch_service_provider.name;
            let type = row.insertCell(4);
            type.innerHTML = results[i].launch_service_provider.type == null ? 'N/A' : results[i].launch_service_provider.type;
        }
    }
    else {
        console.log('No data'); // results object is undefined
    }
}

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