module.exports = function (app){

	const dataStore = require("nedb");
	const path = require ("path");
	const dbFileName = path.join(__dirname,"motogp.db");
	const BASE_PATH = "/api/v1";
	const db = new dataStore({
					filename: dbFileName,
					autoload: true
	});
	
	var motogp_statistics = [
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

	//---------------- /GET motogp-statistics/loadInitialData -------------------------

	app.get(BASE_PATH + "/motogp-statistics/loadInitialData", (req, res) =>{

		db.insert(motogp_statistics);
		res.send(JSON.stringify(motogp_statistics,null,2));
	});


	//--------------------- GET /motogp-statistics---------------------------------------

	app.get(BASE_PATH+"/motogp-statistics", (req,res) =>{

		db.find({}, (err,motogp_statistics)=> {
			
			if(motogp_statistics == 0){
				res.status(404).send("No hay datos cargados");
			}else{
				res.send(JSON.stringify(motogp_statistics,null,2));	
		}
		})
		
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

	
};