var express = require('express');
var app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: new Date().valueOf(), utc: Date() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
    let dateString = req.params.date_string;
  
    let dateObject = !isNaN(dateString) ? new Date(parseInt(dateString)) : new Date(dateString);
  
    if (!isNaN(dateObject.getTime())) {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    } else {
      res.json({ "error": "Invalid Date" });
    }
});

app.listen(process.env.PORT || 3000)