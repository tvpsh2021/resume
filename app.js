const express = require('express');
const helmet = require('helmet');
const app = express();
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
		if (!isDevelopmentEnvironment && !req.secure) {
			// console.log('req.headers.host -> ', req.headers.host);
			// console.log('req.headers.host -> ', req.originalUrl.originalUrl);
			res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
		}
		next();
	});
}

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	// console.log('req.headers.host -> ', req.headers.host);
	// console.log('req.headers.host -> ', req.originalUrl);
	res.render('pages/resume.pug');
});

app.get('/portfolio', (req, res) => {
	// console.log('req.headers.host -> ', req.headers.host);
	// console.log('req.headers.host -> ', req.originalUrl);
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
