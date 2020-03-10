const express = require("express");
var app = express();
var port= process.env.PORT || 80;
app.use("/", express.static("./public"));
app.get("/time", (request, response) => {
	response.send(new Date());
})
app.listen(port, ()=>{
	console.log("This server is 100% ready")
});

console.log("The server is not 100% ready, please wait");