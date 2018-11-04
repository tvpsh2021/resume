const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('pages/resume.pug');
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
