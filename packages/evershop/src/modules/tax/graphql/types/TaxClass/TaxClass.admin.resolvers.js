const { select } = require('@ANNAPOORANI/postgres-query-builder');
const { pool } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/postgres/connection');
const { camelCase } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/camelCase');
const { buildUrl } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/router/buildUrl');
const { TaxClassCollection } = require('../../../services/TaxClassCollection');

module.exports = {
  Query: {
    taxClasses: async (_, { filters }) => {
      const query = select().from('tax_class');
      const root = new TaxClassCollection(query);
      await root.init({}, { filters });
      return root;
    },
    taxClass: async (_, { id }) => {
      const taxClass = await select()
        .from('tax_class')
        .where('uuid', '=', id)
        .load(pool);
      return camelCase(taxClass);
    }
  },
  TaxClass: {
    rates: async (parent) => {
      const query = select().from('tax_rate');
      query.where('tax_class_id', '=', parent.taxClassId);
      const rates = await query.execute(pool);
      return rates.map((row) => camelCase(row));
    },
    addRateApi: async ({ uuid }) =>
      buildUrl('createTaxRate', { class_id: uuid })
  },
  TaxRate: {
    updateApi: async ({ uuid }) => buildUrl('updateTaxRate', { id: uuid }),
    deleteApi: async ({ uuid }) => buildUrl('deleteTaxRate', { id: uuid })
  }
};
