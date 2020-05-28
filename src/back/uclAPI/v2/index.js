module.exports = function(app) {
	console.log('Registering uclAPI');
	const dataStore = require('nedb');
	const path = require('path');
	const dbFileName = path.join(__dirname, '/ucl.db');
	const BASE_PATH = '/api/v2';

	const db = new dataStore({
		filename: dbFileName,
		autoload: true
	});

	app.get(BASE_PATH + "/ucl_stats/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/10690065/SztBa7m1");
    });

	//-----------------------------API JOSE CARLOS----------------------------------

	//array con datos iniciales
	var ucl_statsInitial = [
		{
			country: 'England',
			team: 'LiverpoolFC',
			last_title: 2019,
			title: 6,
			season: 22,
			match: 216,
			victory: 121
		},
		{
			country: 'England',
			team: 'ManUnited',
			last_title: 2008,
			title: 3,
			season: 26,
			match: 279,
			victory: 154
		},
		{
			country: 'Italy',
			team: 'ACMilan',
			last_title: 2007,
			title: 7,
			season: 22,
			match: 249,
			victory: 125
		},
		{
			country: 'Italy',
			team: 'Internazionale',
			last_title: 2010,
			title: 3,
			season: 17,
			match: 178,
			victory: 86
		},
		{
			country: 'Spain',
			team: 'FCBarcelona',
			last_title: 2015,
			title: 5,
			season: 27,
			match: 316,
			victory: 187
		},
		{
			country: 'Spain',
			team: 'RealMadridCF',
			last_title: 2018,
			title: 13,
			season: 44,
			match: 437,
			victory: 262
		}
	];
	
	//Load initial data
	app.get(BASE_PATH + '/ucl_stats/loadInitialData', (req, res) => {
		console.log('new Get../loadInitialData');
		db.remove({}, { multi: true }, function(err, numRemoved) {});
		db.insert(ucl_statsInitial);
		res.send(JSON.stringify(ucl_statsInitial, null, 2));
		res.sendStatus(200, 'Datos iniciales creados');
	});
	//GET /ucl-stats
	app.get(BASE_PATH + '/ucl_stats', (req, res) => {
		console.log('new Get../ucl_stats_estadisticas');

		var limit = parseInt(req.query.limit);
		var offset = parseInt(req.query.offset);
		var search = {};

		if (req.query.country) search['country'] = req.query.country;
		if (req.query.team) search['team'] = req.query.team;

		if (req.query.last_title) {
			search['last_title'] = parseInt(req.query.last_title);
		} else if (parseInt(req.query.from) && parseInt(req.query.to)) {
			search['last_title'] = { $gte: parseInt(req.query.from), $lte: parseInt(req.query.to) };
		}
		if (req.query.title_min && req.query.title_max)
			search['title'] = {
				$gte: parseInt(req.query.title_min),
				$lte: parseInt(req.query.title_max)
			};
		if (req.query.title_min && !req.query.title_max)
			search['title'] = { $gte: parseInt(req.query.title_min) };
		if (!req.query.title_min && req.query.title_max)
			search['title'] = { $lte: parseInt(req.query.title_max) };

		if (req.query.season_min && req.query.season_max)
			search['season'] = {
				$gte: parseInt(req.query.season_min),
				$lte: parseInt(req.query.season_max)
			};
		if (req.query.season_min && !req.query.season_max)
			search['season'] = { $gte: parseInt(req.query.season_min) };
		if (!req.query.season_min && req.query.season_max)
			search['season'] = { $lte: parseInt(req.query.season_max) };

		if (req.query.match_min && req.query.match_max)
			search['match'] = {
				$gte: parseInt(req.query.match_min),
				$lte: parseInt(req.query.match_max)
			};
		if (req.query.match_min && !req.query.match_max)
			search['match'] = { $gte: parseInt(req.query.match_min) };
		if (!req.query.match_min && req.query.match_max)
			search['match'] = { $lte: parseInt(req.query.match_max) };

		if (req.query.victory_min && req.query.victory_max)
			search['victory'] = {
				$gte: parseInt(req.query.victory_min),
				$lte: parseInt(req.query.victory_max)
			};
		if (req.query.victory_min && !req.query.victory_max)
			search['victory'] = { $gte: parseInt(req.query.victory_min) };
		if (!req.query.victory_min && req.query.victory_max)
			search['victory'] = { $lte: parseInt(req.query.victory_max) };

		db
			.find(search)
			.skip(offset)
			.limit(limit)
			.exec(function(err, ucl_stats) {
				ucl_stats.forEach(c => {
					delete c._id;
				});

				if (ucl_stats == 0) {
					res.sendStatus(404, 'Sin datos');
				} else {
					res.send(JSON.stringify(ucl_stats, null, 2));
					console.log(JSON.stringify(ucl_stats, null, 2));
				}
			});
	});
	//GET /ucl-stats/:team
	app.get(BASE_PATH + '/ucl_stats/:country/:team', (req, res) => {
		console.log('new Get../ucl_stats by team');
		var team = req.params.team;
		var country = req.params.country;
		db.find({ country: country, team: team }, (err, ucl_stats) => {
			if (ucl_stats.length >= 1) {
				res.send(ucl_stats[0]);
			} else {
				res.sendStatus(404, 'Dato no encontrado');
			}
		});
	});
	//POST /ucl_stats/:team
	app.post(BASE_PATH + '/ucl_stats/:team', (req, res) => {
		console.log('new POST../ucl_stats by recurso concreto');

		res.sendStatus(405, 'Method NOT Allowed');
	});
	//POST /ucl_stats/
	app.post(BASE_PATH + '/ucl_stats', (req, res) => {
		console.log('new POST../ucl_stats');

		var newStat = req.body;
		if (
			newStat == '' ||
			newStat.country == '' ||
			newStat.team == '' ||
			(newStat.last_title == null || newStat.last_title == '') ||
			(newStat.title == null || newStat.title == '') ||
			(newStat.season == null || newStat.season == '') ||
			(newStat.match == null || newStat.match == '') ||
			(newStat.victory == null || newStat.victory == '')
		) {
			res.sendStatus(400, 'BAD REQUEST');
		} else {
			db.insert(newStat);
			res.sendStatus(201, 'CREATED');
		}
	});

	//PUT /ucl_stats
	app.put(BASE_PATH + '/ucl_stats', (req, res) => {
		res.sendStatus(405, 'Method Not Allowed');
	});

	// PUT /ucl_stats/:country/:team
	app.put(BASE_PATH + '/ucl_stats/:country/:team', (req, res) => {
		var team = req.params.team;
		var country = req.params.country;
		var body = req.body;
		var newTeam = body.team;
		var newCountry = body.country;

		if (country != newCountry || team != newTeam) {
			res.sendStatus(400, 'BAD REQUEST');
		} else {
			db.update(
				{ country: country, team: team },
				{
					$set: {
						last_title: body.last_title,
						title: body.title,
						season: body.season,
						match: body.match,
						victory: body.victory
					}
				},
				{},
				function(err, numReplaced) {}
			);
			res.sendStatus(200, 'OK');
		}
	});
	
	//DELETE /ucl-stats
	app.delete(BASE_PATH + '/ucl_stats', (req, res) => {
		console.log('delete../ucl_stats');
		db.remove({}, { multi: true }, function(err, numRemoved) {});
		res.sendStatus(200, 'Base de datos borrada');
	});
	//DELETE /ucl-stats/:team
	app.delete(BASE_PATH + '/ucl_stats/:team', (req, res) => {
		console.log('borrando../ucl_stats by team');

		var team = req.params.team;

		db.remove({ team: team }, {}, function(err, numRemoved) {
			res.sendStatus(200, 'OK');
		});
	});
	console.log('ok.');
};