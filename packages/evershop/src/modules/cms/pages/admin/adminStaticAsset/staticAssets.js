const staticMiddleware = require('@AnnaPoorani/AnnaPoorani/src/lib/middlewares/static');

module.exports = (request, response, stack, next) => {
  staticMiddleware(request, response, next);
};
