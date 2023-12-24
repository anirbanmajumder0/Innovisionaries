function parseRow(row, pincode) {
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

  // Upload the result to the server
  fetch('/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  })
  .then(response => response.json())
  //.then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });

  return result;
}

function parseCsv() {
  var i = 0;
  var pincode = [];
  var file = document.getElementById('csv-file').files[0];
  var size = file.size;
  var percent = 0;

  Papa.parse(file, {
    worker: true,
    dynamicTyping: true,
    step: function(row) {
      if (i === 0) {
        pincode = row.data;
        i++;
      } else {
        parseRow(row, pincode);
      }
      var progress = row.meta.cursor;
      console.log(progress);
      percent = Math.round(progress / size * 100);
      document.getElementById('loading-bar').style.width = percent + '%';
    },
    complete: function() {
      console.log("All done!");
    }
  });
}