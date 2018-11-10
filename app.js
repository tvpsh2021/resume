const express = require('express');
const helmet = require('helmet');
const app = express();
const Sidebar = require('./data/sidebar');

const isDevelopmentEnvironment = process.env.NODE_ENV === 'development' ? true : false;

if (!isDevelopmentEnvironment) {
	app.disable('x-powered-by');
	app.enable('trust proxy');
	app.use(helmet.hsts({
		maxAge: 31536000,
		includeSubDomains: false,
		preload: false,
		setIf: (req, res) => {
			return req.secure || (req.headers['x-forwarded-proto'] === 'https');
		}
	}));
	app.use((req, res, next) => {
		const regex = /www./gi;
		const processedURL = req.headers.host.replace(regex, '');

		if (!req.secure) {
			res.redirect(301, 'https://' + processedURL + req.originalUrl);
		}

		if (req.headers.host.includes('www.')) {
			res.redirect(301, 'https://' + processedURL + req.originalUrl);
		}

		next();
	});
}

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.get('/', (req, res) => {
	res.render('pages/resume.pug', { Sidebar });
});
app.get('/portfolio', (req, res) => {
	res.render('pages/portfolio.pug');
});
app.use((req, res) => {
	res.status(404);
	res.json({
		code: 404,
		status: 'OK',
		message: '404 Not Found.'
	});
});
app.listen(app.get('port'), () => {
	console.log('Node app is runnung on port ', app.get('port'));
});
