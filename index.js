const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const electricityAPI= require(path.join(__dirname, "electricityAPI"));
const motogpAPI = require(path.join(__dirname,"motogpAPI"));
const uclAPI = require(path.join(__dirname,"uclAPI"));
const port = process.env.PORT || 9999;
const app = express();
const cors = require("cors");
const back = require("./src/back");

back(app);

app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static("./public"));

electricityAPI(app);	
motogpAPI(app);
uclAPI(app);


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");