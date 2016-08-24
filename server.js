/**
 * Created by Nix on 8/24/2016.
 */
var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));
