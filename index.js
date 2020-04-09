const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const electricityAPI= require(path.join(__dirname, "electricityAPI"));
const motogpAPI = require(path.join(__dirname,"motogpAPI"));

const port = process.env.PORT || 80;

const BASE_PATH = "/api/v1"; 

const app = express();
app.use(bodyParser.json());
app.use("/", express.static("./public"));

electricityAPI(app, BASE_PATH);	
motogpAPI(app);

app.get(BASE_PATH + "/motogp-statistics/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/10864755/SzYUa1rg");
    });

app.get(BASE_PATH + "/ucl_stats/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/10690065/SzYUa1nB");
    });

//----------------------------------------------API ANGEL-------------------------------------------------------------------



//------------------------------------------------API FRAN---------------------------------------------------



//-----------------------------API JOSE CARLOS-------------------------------------------------------------------
var ucl_stats = [];

app.get(BASE_PATH + "/ucl_stats/loadInitialData", (req, res) =>{
	
	var ucl_statsInitial = [
		{
		"country": "England",
		"team": "Liverpool FC",
		"last_title": 2019,
		"title": 6,
		"season": 22,
		"match": 216,
		"victory":121
		},
		{
		"country": "Spain",
		"team": "Real Madrid CF",
		"last_title": 2018,
		"title": 13,
		"season": 44,
		"match": 437,
		"victory":262
		}
	];
	ucl_stats = ucl_statsInitial;
		res.send(JSON.stringify(ucl_stats,null,2));
	});
//GET /ucl-stats

app.get(BASE_PATH+"/ucl_stats", (req,res) =>{
	
	if(ucl_stats == 0){
		res.status(404).send("NO DATA FOUND");
	}else{
		res.send(JSON.stringify(ucl_stats,null,2));	
	}
	
});

//POST /ucl-stats

app.post(BASE_PATH+"/ucl_stats", (req,res) =>{
	
	var newStat = req.body;
	
	if((newStat == "") || (newStat.country == "") || (newStat.team == "")
	  || (newStat.last_title == null || newStat.last_title== "")
	  || (newStat.title == null || newStat.title== "")
	  || (newStat.season == null || newStat.season== "")
	  || (newStat.match == null || newStat.match== "")
	  || (newStat.victory == null || newStat.victory== "")){
		res.sendStatus(400, "BAD REQUEST");
	}else{
		ucl_stats.push(newStat);
		res.sendStatus(200,"CREATED");
	};
});

//PUT /ucl_stats

app.put(BASE_PATH + "/ucl_stats", (req,res) => {
		res.sendStatus(405,"Method Not Allowed");
});

//DELETE /ucl-stats

app.delete(BASE_PATH + "/ucl_stats", (req,res) => {
	ucl_stats = [];
	res.sendStatus(200, "OK");
});

//GET /ucl-stats/:team

app.get(BASE_PATH+"/ucl_stats/:team", (req,res)=>{
	
	var team = req.params.team;
	
	var filteredUclStats = ucl_stats.filter((c) => {
		return (c.team == team);
	});
	
	if(filteredUclStats.length >= 1){
		res.send(filteredUclStats[0]);
	}else{
		res.sendStatus(404,"NOT FOUND");
	}
});

//POST /ucl-stats/:team

	app.post(BASE_PATH + "/ucl-stats/:team", (req,res) => {
		res.sendStatus(405,"Method NOT Allowed");
	});

// PUT /ucl-stats/:team

	app.put(BASE_PATH + "/ucl_stats/:country/:team", (req,res) => {
		
		var original = req.params.team;
		var modified = req.body.team;
		
		if(modified != original){
			res.sendStatus(400,"BAD REQUEST");
			
		}else{
			var filteredTeam = ucl_stats.filter(p => p.team != original);
			ucl_stats = filteredTeam;
			ucl_stats.push(req.body);
			res.sendStatus(200,"OK");
		}
	});

app.put(BASE_PATH + "/ucl_stats", (req, res) =>{
	res.sendStatus(405, "");
});



//DELETE /ucl-stats/:team

app.delete(BASE_PATH+"/ucl_stats/:team", (req,res)=>{
	
	var team = req.params.team
	
	var filteredUclStats = ucl_stats.filter((c) => {
		return (c.team != team);
	});
	
	if(filteredUclStats.length < ucl_stats.length){
		ucl_stats = filteredUclStats;
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(404,"NOT FOUND");
	}
});



app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");