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

app.set('trust proxy', true);

app.use(helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      '*.fontawesome.com',
      '*.googletagmanager.com',
      '*.google-analytics.com',
      "'unsafe-inline'",
      '*.facebook.net'
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      '*.googleapis.com'
    ],
    fontSrc: [
      "'self'",
      '*.fontawesome.com',
      '*.gstatic.com',
      'data:'
    ],
    connectSrc: [
      "'self'",
      '*.fontawesome.com',
      '*.google-analytics.com',
      '*.doubleclick.net'
    ],
    imgSrc: [
      "'self'",
      '*.google-analytics.com'
    ],
    upgradeInsecureRequests: []
  }
}));
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
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

// app.use('/robots.txt', function (req, res, next) {
//   res.type('text/plain');
//   res.send('User-agent: *\nDisallow: /');
// });

app.use((req, res) => {
  console.warn('request from invalid path:', req.url);
  res.redirect(301, '/');
});

app.listen(app.get('port'), () => {
  console.log('server start at port', app.get('port'));
});
