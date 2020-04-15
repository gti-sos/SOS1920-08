module.exports = function(app) {
	const dataStore = require('nedb');
	const BASE_PATH = "/api/v1"; 
	const path = require('path');
	const dbFileName = path.join(__dirname, 'electricity.db');
	const db = new dataStore({
		filename: dbFileName,
		autoload: true
	});

	app.get(BASE_PATH + '/electricity-produced-stats/loadInitialData', (req, res) => {
		var electricityProducedInitial = [
			{
				country: 'EEUU',
				state: 'Alabama',
				year: 2018,
				hydro: 11142139,
				solar: 357252,
				coal: 3177520
			},
			{
				country: 'EEUU',
				state: 'Arkansas',
				year: 2018,
				hydro: 3008775,
				solar: 203413,
				coal: 29996101
			}
		];
		db.remove({}, { multi: true }, function(err, numRemoved) {});
		db.insert(electricityProducedInitial);

		res.send(JSON.stringify(electricityProducedInitial, null, 2));
	});
	app.get(BASE_PATH + '/electricity-produced-stats', (req, res) => {
		var limit = parseInt(req.query.limit);
		var offset = parseInt(req.query.offset);
		var search = {};

		if (req.query.country) search['country'] = req.query.country;
		if (req.query.state) search['state'] = req.query.state;

		if (req.query.year) {
			search['year'] = parseInt(req.query.year);
		} else if (parseInt(req.query.from) && parseInt(req.query.to)) {
			search['year'] = { $gte: parseInt(req.query.from), $lte: parseInt(req.query.to) };
		}

		if (req.query.hydroMin && req.query.hydroMax)
			search['hydro'] = {
				$gte: parseInt(req.query.hydroMin),
				$lte: parseInt(req.query.hydroMax)
			};
		if (req.query.hydroMin && !req.query.hydroMax)
			search['hydro'] = { $gte: parseInt(req.query.hydroMin) };
		if (!req.query.hydroMin && req.query.hydroMax)
			search['hydro'] = { $lte: parseInt(req.query.hydroMax) };

		if (req.query.solarMin && req.query.solarMax)
			search['solar'] = {
				$gte: parseInt(req.query.solarMin),
				$lte: parseInt(req.query.solarMax)
			};
		if (req.query.solarMin && !req.query.solarMax)
			search['solar'] = { $gte: parseInt(req.query.solarMin) };
		if (!req.query.solarMin && req.query.solarMax)
			search['solar'] = { $lte: parseInt(req.query.solarMax) };

		if (req.query.coalMin && req.query.coalMax)
			search['coal'] = {
				$gte: parseInt(req.query.coalMin),
				$lte: parseInt(req.query.coalMax)
			};
		if (req.query.coalMin && !req.query.coalMax)
			search['coal'] = { $gte: parseInt(req.query.coalMin) };
		if (!req.query.coalMin && req.query.coalMax)
			search['coal'] = { $lte: parseInt(req.query.coalMax) };

		db
			.find(search)
			.skip(offset)
			.limit(limit)
			.exec(function(err, electricityProduced) {
				electricityProduced.forEach(e => {
					delete e._id;
				});

				if (electricityProduced == 0) {
					res
						.status(404)
						.send(
							'There is no data that match the parameters you are sending to the server'
						);
				} else {
					res.send(JSON.stringify(electricityProduced, null, 2));
					console.log(JSON.stringify(electricityProduced, null, 2));
				}
			});
	});

	// POST electricity-produced-stats
	app.post(BASE_PATH + '/electricity-produced-stats', (req, res) => {
		var newStat = req.body;
		if (
			newStat == {} ||
			(newStat.country == null || newStat.country == '') ||
			(newStat.state == null || newStat.state == '') ||
			(newStat.year == null || newStat.year == '') ||
			(newStat.hydro == null || newStat.hydro == '') ||
			(newStat.solar == null || newStat.solar == '') ||
			(newStat.coal == null || newStat.coal == '')
		) {
			res
				.sendStatus(400)
				.send('No piece of information provided should be null or left empty');
		} else {
			db.insert(newStat);
			res.sendStatus(201);
		}
	});

	//DELETE electicity-produced-stats
	app.delete(BASE_PATH + '/electricity-produced-stats', (req, res) => {
		db.remove({}, { multi: true }, function(err, numRemoved) {});
		res.sendStatus(200).send('Your DataBase has been wiped clean succesfully');
	});

	//PUT NOT ALLOWED ON THE ENTIRE ARRAY

	app.put(BASE_PATH + '/electricity-produced-stats', (req, res) => {
		res.sendStatus(405).send('You can not use this method on an entire collection');
	});

	// GET /electricity-produced-stats/:country/:state
	app.get(BASE_PATH + '/electricity-produced-stats/:country/:state', (req, res) => {
		var country = req.params.country;
		var state = req.params.state;
		db.find({ country: country, state: state }, (err, electricityProducedByState) => {
			electricityProducedByState.forEach(e => {
				delete e._id;
			});
			res.send(JSON.stringify(electricityProducedByState[0], null, 2));
		});
	});

	// POST not allowed on a concrete resource
	app.post(BASE_PATH + '/electricity-produced-stats/:country/:state', (req, res) => {
		res.sendStatus(405).send('You can not use this method on a concrete resource');
	});

	// DELETE /electricity-produced-stats/:country/:state

	app.delete(BASE_PATH + '/electricity-produced-stats/:country/:state', (req, res) => {
		var country = req.params.country;
		var state = req.params.state;
		db.remove({ country: country, state: state }, {}, function(err, numRemoved) {});
		res.sendStatus(200).send('Data removed');
	});

	//PUT /electricity-produced-stats/:country/:state
	app.put(BASE_PATH + '/electricity-produced-stats/:country/:state', (req, res) => {
		var country = req.params.country;
		var state = req.params.state;
		var body = req.body;
		var newCountry = body.country;
		var newState = body.state;
		if (country != newCountry || state != newState) {
			res.sendStatus(400).send('You can not modify the country or the state of the resource');
		} else {
			db.update(
				{ country: country, state: state },
				{
					$set: { year: body.year, hydro: body.hydro, solar: body.solar, coal: body.coal }
				},
				{},
				function(err, numReplaced) {}
			);
			res.sendStatus(200).send('Data modified succesfully');
		}
	});
};