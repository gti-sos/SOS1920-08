const express = require("express");
const bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 80;
const BASE_PATH = "/api/v1";
app.use(bodyParser.json());
app.use("/", express.static("./public"));
var electricityProduced = [];
 

//----------------------------------------------API ANGEL-------------------------------------------------------------------

app.get(BASE_PATH + "/electricity-produced-stats/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/10851956/SzYUXfsE");
    });

app.get(BASE_PATH + "/motogp-statistics/docs/", (req, res) => {
        res.redirect("URL POSTMAN");
    });

// GET electricityProduced/loadInitialData
app.get(BASE_PATH + "/electricity-produced-stats/loadInitialData", (req, res)=> {
	var electricityProducedInitial = [
		{"country": "EEUU", 
 		"state": "Alabama", 
		"year": 2018,
 		"hydro": 11142139,
 		"solar": 357252,
 		"coal": 3177520
		}, 
		{"country": "EEUU", 
		 "state": "Arkansas",
		 "year": 2018,
		 "hydro": 3008775,
 		"solar": 203413,
 		"coal": 29996101
		}
		];
	electricityProduced= electricityProducedInitial;
	res.send(JSON.stringify(electricityProducedInitial, null, 2));
	res.sendStatus(200, "Initial Data Created");
});

//GET electricityProduced
app.get(BASE_PATH+ "/electricity-produced-stats", (req, res) =>{
	res.send(JSON.stringify(electricityProduced, null, 2));
	res.sendStatus(200, "Here is your data");
});

// POST electricity-produced-stats 
app.post(BASE_PATH + "/electricity-produced-stats", (req, res) =>{
	var newStat= req.body;
	if(newStat == {} || (newStat.country == null || newStat.country== "")
	  || (newStat.state == null || newStat.state== "")
	  || (newStat.year == null || newStat.year== "")
	  || (newStat.hydro == null || newStat.hydro== "")
	  || (newStat.solar == null || newStat.solar== "")
	  || (newStat.coal == null || newStat.coal== "")){
		res.sendStatus(400, "BAD REQUEST");
	}else{
		electricityProduced.push(newStat);
		res.sendStatus(201, "New stat created");
	}
});

//DELETE electicity-produced-stats 
app.delete(BASE_PATH + "/electricity-produced-stats", (req, res)=>{
	electricityProduced= [];
	res.sendStatus(200, "Data deleted");
});

//PUT NOT ALLOWED ON THE ENTIRE ARRAY

app.put(BASE_PATH + "/electricity-produced-stats", (req, res) =>{
	res.sendStatus(405, "YOU FUCKING DONKEY, THIS IS NOT ALLOWED");
});


// GET /electricity-produced-stats/:country/:state
app.get(BASE_PATH + "/electricity-produced-stats/:country/:state", (req, res)=>{
	var country= req.params.country;
	var state = req.params.state;
	var filteredData= electricityProduced.filter((e) =>{
		return (e.country == country) && (e.state == state);
	});
	if(filteredData.length >= 1){
		res.send(filteredData[0]);
	}else{
		res.send(404, "Data not Found");
	}
});

//GET /electricity-produced-stats/:params
/* app.get(BASE_PATH + "/electricity-produced-stats/:param", (req, res) => {
	var param = req.params.param;
	var filteredDataByParam= electricityProduced.filter((e) =>{
		return ((e.country == param) || (e.state == param) || (e.year == param) || (e.hydro == param) || (e.solar == param) || (e.coal == param));
	});
	if(filteredDataByParam.length >= 1){
		res.send(filteredDataByParam[0]);
	}else{
		res.sendStatus(404, "Data not Found");
	}
	
});
*/
// POST not allowed on a concrete resource
app.post(BASE_PATH + "/electricity-produced-stats/:country/:state", (req, res) =>{
	res.sendStatus(405, "YOU FUCKING DONKEY, THIS IS NOT ALLOWED");
});

// DELETE /electricity-produced-stats/:country/:state

app.delete(BASE_PATH + "/electricity-produced-stats/:state", (req, res) =>{
	var state = req.params.state;
	var filteredDataForDelete= electricityProduced.filter((e)=>{
		return (e.state != state);
	});
	if(filteredDataForDelete.length< electricityProduced.length){
		electricityProduced= filteredDataForDelete;
		res.sendStatus(200, "Data deleted");
	}else{
		res.sendStatus(404, "Data not pressent");
	};
});

//PUT /electricity-produced-stats/:country/:state
app.put(BASE_PATH + "/electricity-produced-stats/:country/:state", (req, res)=>{
	var country= req.params.country;
	var state = req.params.state;
	var body= req.body;
	var filteredDataForUpdate= electricityProduced.filter((e)=>{
		return ((e.country == country) && (e.state == state));
	});
	if(filteredDataForUpdate.length ==1){
		var updatedData= electricityProduced.map((e)=>{
			var updData=e;
			if(e.country == country && e.state == state){
			for(var p in body){
				updData[p]= body[p];
			}
		}
		return (updData);
	});
		electricityProduced= updatedData;
		res.sendStatus(200, "Data modified");
		
	}else{
		res.sendStatus(404, "Data not found");
	}
	
});


//------------------------------------------------API FRAN---------------------------------------------------

var motogp_statistics = [];

//---------------- /GET motogp-statistics/loadInitialData -------------------------

app.get(BASE_PATH + "/motogp-statistics/loadInitialData", (req, res) =>{
	
	var motogp_statisticsInitial = [
		{
		country: "Spain",
		pilot: "Jorge_Lorenzo",
		last_title: 2015,
		world_title: 3,
		victory: 47,
		podium: 114
		},
		{
		country: "Spain",
		pilot: "Marc_Marquez",
		last_title: 2019,
		world_title: 6,
		victory: 56,
		podium: 95
		},
		{
		country: "Italy",
		pilot: "Giacomo_Agostini",
		last_title: 1975,
		world_title: 8,
		victory: 68,
		podium: 88
		},
		{
		country: "Italy",
		pilot: "Valentino_Rossi",
		last_title: 2009,
		world_title: 7,
		victory: 89,
		podium: 198
		},
		{
		country: "Australia",
		pilot: "Mick_Doohan",
		last_title: 1998,
		world_title: 5,
		victory: 54,
		podium: 95
		},
		{
		country: "Australia",
		pilot: "Casey_Stoner",
		last_title: 2011,
		world_title: 2,
		victory: 38,
		podium: 69
		},
		{
		country: "EEUU",
		pilot: "Wayne_Rainey",
		last_title: 1992,
		world_title: 3,
		victory: 24,
		podium: 64
		},
		{
		country: "Great_Britain",
		pilot: "Mike_Hailwood",
		last_title: 1965,
		world_title: 4,
		victory: 37,
		podium: 48
		},
		{
		country: "EEUU",
		pilot: "Eddie_Lawson",
		last_title: 1989,
		world_title: 4,
		victory: 31,
		podium: 78
		},
	];
	
	motogp_statistics = motogp_statisticsInitial;
	res.send(JSON.stringify(motogp_statistics,null,2));
});


//--------------------- GET /motogp-statistics---------------------------------------

app.get(BASE_PATH+"/motogp-statistics", (req,res) =>{
	
	if(motogp_statistics == 0){
		res.status(404).send("No hay datos cargados");
	}else{
		res.send(JSON.stringify(motogp_statistics,null,2));	
	}
	
});

//-------------------- POST /motogp-statistics---------------------------------------

app.post(BASE_PATH+"/motogp-statistics", (req,res) =>{
	
	var newStat = req.body;
	
	if((newStat == "") || (newStat.country == "") || (newStat.name == "")){
		res.sendStatus(400, "BAD REQUEST");
	}else{
		motogp_statistics.push(newStat);
		res.sendStatus(201,"CREATED");
	}
});

// --------------------- PUT /motogp-statistics------------------------------------

app.put(BASE_PATH + "/motogp-statistics", (req,res) => {
		res.sendStatus(405,"Method Not Allowed");
});

//--------------------- DELETE /motogp-statistics-----------------------------------

app.delete(BASE_PATH + "/motogp-statistics", (req,res) => {
	motogp_statistics = [];
	res.sendStatus(200, "OK");
});


//---------------------- GET /motogp-statistics/:pilot----------------------------------

app.get(BASE_PATH+"/motogp-statistics/:pilot", (req,res)=>{
	
	var pilot = req.params.pilot;
	
	var filteredMotogpStatstats = motogp_statistics.filter((c) => {
		return (c.pilot == pilot);
	});
	
	if(filteredMotogpStatstats.length >= 1){
		res.send(filteredMotogpStatstats[0]);
	}else{
		res.sendStatus(404,"NOT FOUND");
	}
});

// ---------------------- POST /motogp-statistics/:pilot----------------------------------

	app.post(BASE_PATH + "/motogp-statistics/:pilot", (req,res) => {
		res.sendStatus(405,"Method NOT Allowed");
	});

//----------------------- PUT /motogp-statistics/:pilot-----------------------------------

	app.put(BASE_PATH + "/motogp-statistics/:pilot", (req,res) => {
		
		var original = req.params.pilot;
		var modificada = req.body.pilot;
		
		if(modificada != original){
			res.sendStatus(400,"BAD REQUEST");
			
		}else{
			var filteredPilot = motogp_statistics.filter(p => p.pilot != original);
			motogp_statistics = filteredPilot;
			motogp_statistics.push(req.body);
			res.sendStatus(200,"OK");
		}
	})



//----------------------- DELETE /motogp-statistics/:pilot--------------------------------

app.delete(BASE_PATH+"/motogp-statistics/:pilot", (req,res)=>{
	
	var pilot = req.params.pilot
	
	var filteredMotogpStatstats = motogp_statistics.filter((c) => {
		return (c.pilot != pilot);
	});
	
	if(filteredMotogpStatstats.length < motogp_statistics.length){
		motogp_statistics = filteredMotogpStatstats;
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(404,"NOT FOUND");
	}
});


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