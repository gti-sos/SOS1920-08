const BASE_PATH = '/api/v1';

module.exports = function (app){

	app.get(BASE_PATH + '/electricity-produced-stats/docs/', (req, res) => {
		res.redirect('https://documenter.getpostman.com/view/10851956/SzYUXfsE');
		});
	
	app.get(BASE_PATH + '/motogp-statistics/docs/', (req, res) => {
		res.redirect('https://documenter.getpostman.com/view/10864755/SzYUa1rg');
		});
	
	app.get(BASE_PATH + '/ucl_stats/docs/', (req, res) => {
		res.redirect('https://documenter.getpostman.com/view/10690065/Szf26BGE');
		});
	
}
