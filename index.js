const express = require("express");
var app = express();
var port= process.env.PORT || 80;

app.get("/time", (request, response) => {
	response.send(new Date());
})
app.listen(port);

console.log("Server ready");