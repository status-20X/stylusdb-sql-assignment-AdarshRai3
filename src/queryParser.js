function parseQuery(query) {
    const selectRegex = /SELECT (.+?) FROM (.+?)(?:\s+WHERE\s+(.+))?$/i;
    const match = query.match(selectRegex);
    if (match) {
      const [, fields, table, whereClause] = match;
      const result = {
        fields: fields.split(',').map(field => field.trim()),
        table: table.trim(),
      };
      if (whereClause) {
        result.whereClause = whereClause.trim();
      }
      return result;
    } else {
      throw new Error('Invalid query format');
    }
  }
  

function parseWhereClause(whereString) {
    const conditionRegex = /(.*?)(=|!=|>|<|>=|<=)(.*)/;
    return whereString.split(/ AND | OR /i).map(conditionString => {
        const match = conditionString.match(conditionRegex);
        if (match) {
            const [, field, operator, value] = match;
            return { field: field.trim(), operator, value: value.trim() };
        }
        throw new Error('Invalid WHERE clause format');
    });
}

module.exports = parseQuery;