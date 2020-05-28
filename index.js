const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//Api Angel
const electricityAPIv1= require("./src/back/electricityAPI/v1");
const electricityAPIv2= require("./src/back/electricityAPI/v2");
//
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

electricityAPIv1(app);	
electricityAPIv2(app);
motogpAPI(app);
uclAPI(app);


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");