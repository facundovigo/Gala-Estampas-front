const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');


const app = express();



app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);