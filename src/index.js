const parseQuery = require('./queryParser');
const readCSV = require('./csvReader');

async function executeSELECTQuery(query) {
  const { fields, table, whereClauses } = parseQuery(query);
  const data = await readCSV(`${table}.csv`);

  // Filtering based on WHERE clause
  const filteredData = data.filter((row) => {
    return whereClauses.every((condition) => {
      const { field, operator, value } = condition;
      const rowValue = row[field];

      switch (operator) {
        case '=':
          return rowValue === value;
        case '!=':
          return rowValue !== value;
        case '>':
          return rowValue > value;
        case '<':
          return rowValue < value;
        case '>=':
          return rowValue >= value;
        case '<=':
          return rowValue <= value;
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
    });
  });

  // Selecting the specified fields
  return filteredData.map((row) => {
    const selectedRow = {};
    fields.forEach((field) => {
      selectedRow[field] = row[field];
    });
    return selectedRow;
  });
}

module.exports = executeSELECTQuery;