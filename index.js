const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const electricityAPI= require(path.join(__dirname, "electricityAPI"));
const motogpAPI = require(path.join(__dirname,"motogpAPI"));
const uclAPI = require(path.join(__dirname,"uclAPI"));


const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());
app.use("/", express.static("./public"));

app.get(BASE_API_URL + '/motogp-statistics/docs/', (req, res) => {
		res.redirect('https://documenter.getpostman.com/view/10864755/SzYUa1rg');
	});

electricityAPI(app);	
motogpAPI(app);
uclAPI(app);


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");