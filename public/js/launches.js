// FUNCTIONS //
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