const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const electricityAPI= require(path.join(__dirname, "electricityAPI"));
const motogpAPI = require(path.join(__dirname,"motogpAPI"));
const uclAPI = require(path.join(__dirname,"uclAPI"));

const BASE_API_URL = '/api/v1';
const BASE_PATH = '/api/v1';
const port = process.env.PORT || 80;

const app = express();

app.use(bodyParser.json());
app.use("/", express.static("./public"));

app.get(BASE_PATH + '/electricity-produced-stats/docs/', (req, res) => {
	res.redirect('https://documenter.getpostman.com/view/10851956/SzYUXfsE');
	});

app.get(BASE_API_URL + '/motogp-statistics/docs/', (req, res) => {
	res.redirect('https://documenter.getpostman.com/view/10864755/SzYUa1rg');
	});

app.get(BASE_PATH + '/ucl_stats/docs/', (req, res) => {
	res.redirect('https://documenter.getpostman.com/view/10690065/Szf26BGE');
	});

electricityAPI(app);	
motogpAPI(app);
uclAPI(app);


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");