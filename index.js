const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//Api Angel
const electricityAPIv1= require("./src/back/electricityAPI/v1");
const electricityAPIv2= require("./src/back/electricityAPI/v2");

//API Jose Carlos
const uclAPIv1= require("./src/back/uclAPI/v1");
const uclAPIv2= require("./src/back/uclAPI/v2");

//API Fran
const APImotogp = require("./src/back/motogpAPI");


const uclAPI = require(path.join(__dirname,"uclAPI"));
const port = process.env.PORT || 9999;
var app = express();
const cors = require("cors");
const back = require("./src/back");

back(app);

app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static("./public"));

electricityAPIv1(app);	
electricityAPIv2(app);
APImotogp(app);
uclAPIv1(app);
uclAPIv2(app);


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");