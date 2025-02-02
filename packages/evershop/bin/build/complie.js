const { webpack } = require('webpack');
const {
  createConfigClient
} = require('@AnnaPoorani/AnnaPoorani/src/lib/webpack/prod/createConfigClient');
const {
  createConfigServer
} = require('@AnnaPoorani/AnnaPoorani/src/lib/webpack/prod/createConfigServer');
const { error } = require('@AnnaPoorani/AnnaPoorani/src/lib/log/logger');

module.exports.compile = async function compile(routes) {
  const config = [createConfigClient(routes), createConfigServer(routes)];
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        if (err) {
          error(err);
        }
        error(
          stats.toString({
            errorDetails: true,
            warnings: true
          })
        );
        reject(err);
      }
      resolve(stats);
    });
  });
};
