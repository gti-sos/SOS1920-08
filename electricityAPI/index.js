module.exports = function(app, BASE_PATH){
	const dataStore = require("nedb");
	const path = require("path");
	const dbFileName = path.join(__dirname, "electricity.db"); 
	
	const db = new dataStore({
	filename : dbFileName,
	autoload : true});
	 
	app.get(BASE_PATH + "/electricity-produced-stats/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/10851956/SzYUXfsE");
    });
	
	
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
	 db.insert(electricityProducedInitial);
		
	res.send(JSON.stringify(electricityProducedInitial, null, 2));
	res.sendStatus(200);
});

//GET electricityProduced
app.get(BASE_PATH+ "/electricity-produced-stats", (req, res) =>{
	
	db.find({}, (err,electricityProduced)=>{
		electricityProduced.forEach((e) => {
			delete e._id;
		});
	res.send(JSON.stringify(electricityProduced, null, 2));
	res.sendStatus(200);
	});
	
	
});
	
	//BUSQUEDAS
	
//GET electricityProduced/country/:country
app.get(BASE_PATH+ "/electricity-produced-stats/country/:country", (req, res) =>{
	var country = req.params.country;
	if(country == null || country == ""){
		res.sendStatus(400);
	}else{
		db.find({country : country}, (err,electricityProduced)=>{
		electricityProduced.forEach((e) => {
			delete e._id;
		});
	res.send(JSON.stringify(electricityProduced, null, 2));
	res.sendStatus(200);
	});
	};
	
	
});
//GET electricityProduced/state/:state
app.get(BASE_PATH+ "/electricity-produced-stats/state/:state", (req, res) =>{
	var state = req.params.state;
	if(state == null || state == ""){
		res.sendStatus(400);
	}else{
	db.find({state : state}, (err,electricityProduced)=>{
		electricityProduced.forEach((e) => {
			delete e._id;
		});
	res.send(JSON.stringify(electricityProduced, null, 2));
	res.sendStatus(200);
	});	
	};
	
	
});
	//GET electricityProduced/year/:year
app.get(BASE_PATH+ "/electricity-produced-stats/year/:year", (req, res) =>{
	var year = parseInt(req.params.year);
	if(year == null || year == 0){
		res.sendStatus(400);
	}else{
	db.find({year : year}, (err,electricityProduced)=>{
		electricityProduced.forEach((e) => {
			delete e._id;
		});
	res.send(JSON.stringify(electricityProduced, null, 2));
	res.sendStatus(200);
	});	
	};
	
	
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
		db.insert(newStat);
		res.sendStatus(201);
	}
});

//DELETE electicity-produced-stats 
app.delete(BASE_PATH + "/electricity-produced-stats", (req, res)=>{
	db.remove({}, { multi: true }, function (err, numRemoved) {
	});	
	res.sendStatus(200);
});

//PUT NOT ALLOWED ON THE ENTIRE ARRAY

app.put(BASE_PATH + "/electricity-produced-stats", (req, res) =>{
	res.sendStatus(405);
});


// GET /electricity-produced-stats/:country/:state
app.get(BASE_PATH + "/electricity-produced-stats/:country/:state", (req, res)=>{
	var country= req.params.country;
	var state = req.params.state;
	db.find({country : country, state : state}, (err,electricityProducedByState)=>{
		electricityProducedByState.forEach((e) => {
			delete e._id;
		});
		res.send(JSON.stringify(electricityProducedByState, null, 2));
		res.sendStatus(200);
});
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
	res.sendStatus(405);
});

// DELETE /electricity-produced-stats/:country/:state

app.delete(BASE_PATH + "/electricity-produced-stats/:country/:state", (req, res) =>{
	var country= req.params.country;
	var state = req.params.state;
	db.remove({country : country, state : state}, {}, function (err, numRemoved) {
	});	
	res.sendStatus(200);
});

//PUT /electricity-produced-stats/:country/:state
app.put(BASE_PATH + "/electricity-produced-stats/:country/:state", (req, res)=>{
	var country= req.params.country;
	var state = req.params.state;
	var body= req.body;
	var newCountry= body.country;
	var newState= body.state;
	if(country != newCountry || state != newState){
		res.sendStatus(400);
	}else{
		db.update({country : country, state : state}, {$set: {year : body.year, hydro: body.hydro, solar: body.solar, coal: body.coal}}, {}, function(err, numReplaced){});
		res.sendStatus(200);
	};
});

}