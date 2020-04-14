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

electricityAPI(app);	
motogpAPI(app);
uclAPI(app);


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");