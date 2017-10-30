const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const morganLogger = require('morgan');
const logger = require('../lib/logger');
const serveStatic = require('serve-static');

const project = require('../config/project.config');
// Routes
const contacts = require('./routes/contacts.routes');

// Import routes and config
const config = require('../config/server.config');

// Initialize the Express App
const app = express();

// Apply body Parser
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

// logging
app.use(morganLogger('dev'));

const isDev = project.env === 'development';

// Run Webpack dev server in development mode
if (isDev) {
  // Webpack Requirements
  const webpack = require('webpack');
  const webpackConfig = require('../config/webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackConfig);
  logger.info('Enabling webpack development and HMR middleware');

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(project.basePath, project.srcDir),
      hot: true,
      quiet: false,
      lazy: false,
      stats: 'normal',
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      path: '/__webpack_hmr',
    })
  );

  app.use(express.static(path.resolve(project.basePath, 'public')));

  app.get(
    [
      '/',
    ],
    (req, res, next) => {
      const filename = path.join(compiler.outputPath, 'index.html');
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
          return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
      });
    }
  );
} else {
  logger.info(`Serving public files from : ${path.join(__dirname, '../dist')}`);
  app.use('/', serveStatic(path.join(__dirname, '../dist')));
  app.get(/^(?!\/api).*$/gi, (req, res, next) => {
    res.set('content-type', 'text/html');
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.use('/api', contacts);

module.exports = app;
