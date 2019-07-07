const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const app = express();
const SidebarData = require('./data/sidebar');
const ResumeData = require('./data/resume');
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
app.use(compression());
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.get('/', (req, res) => {
  res.render('pages/resume.pug', { SidebarData, ResumeData });
});
app.get('/portfolio', (req, res) => {
  res.render('pages/portfolio.pug', { SidebarData });
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
  console.log('Node app is running on port ', app.get('port'));
});
