const { getConfig } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/getConfig');

module.exports = {
  Query: {
    carriers: () => {
      const carriers = getConfig('oms.carriers', {});
      return Object.keys(carriers).map((key) => ({
          ...carriers[key],
          code: key
        }));
    }
  }
};
