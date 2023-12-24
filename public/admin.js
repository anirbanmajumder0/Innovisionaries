function processRow(row, pincode) {
    var result = {};
    for (var i = 1; i < row.data.length; i++) {
        var data = row.data[i];
        if (data !== 'm' && data !== 0) {
            if (!result[row.data[0]]) {
                result[row.data[0]] = [];
            }
            result[row.data[0]].push(pincode[i]);
        }
    }
    return result;
}

// Function to upload data to the server
function uploadData(data) {
    return fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Function to parse CSV file
function parseCsv() {
    const file = document.getElementById('csv-file').files[0];
    const fileSize = file.size;
    let headers = [];

    Papa.parse(file, {
        worker: true,
        dynamicTyping: true,
        step: function(row) {
            const percent = Math.round(row.meta.cursor/ fileSize * 100);
            document.getElementById('loading-bar').style.width = percent + '%';

            if (headers.length === 0) {
                headers = row.data;
            } else {
                const rowData = processRow(row, headers);
                uploadData(rowData);
            }
        },
        complete: function() {
            console.log("All done!");
        }
    });
}