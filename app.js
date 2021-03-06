const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const SidebarData = require('./data/sidebar');
const ResumeData = require('./data/resume');

const app = express();
const isDevEnvironment = process.env.NODE_ENV === 'development' ? true : false;

app.use((req, res, next) => {
  if (!isDevEnvironment) {
    const regex = /www./gi;
    const processedURL = req.headers.host.replace(regex, '');
    if (!req.secure || req.headers.host.includes('www.')) {
      res.redirect(301, 'https://' + processedURL + req.originalUrl);
      return;
    }
  }
  next();
});

app.enable('trust proxy');

app.use(helmet());
app.use(compression());

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('pages/resume.pug', { SidebarData, ResumeData });
});

app.get('/portfolio', (req, res) => {
  res.render('pages/portfolio.pug', { SidebarData });
});

app.use((req, res) => {
  console.warn('request from invalid path:', req.url);
  res.status(404).json({
    message: 'Not found.'
  });
});

app.listen(app.get('port'), () => {
  console.log('server start at port', app.get('port'));
});
