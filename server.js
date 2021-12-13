const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/crm'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/crm/index.html'));
});

app.listen(process.env.PORT || 4200);
