function parseQuery(query) {
    const regex = /^SELECT (.*?) FROM (.*?)(?: WHERE (.*?))?$/i;
    const match = query.match(regex);
  
    if (!match) {
      throw new Error('Invalid query');
    }
  
    const fields = match[1].split(',').map((field) => field.trim());
    const table = match[2].trim();
    const whereString = match[3] ? match[3].trim() : null;
  
    const whereClauses = whereString ? parseWhereClause(whereString) : [];
  
    return {
      fields,
      table,
      whereClauses,
    };
  }
  
  function parseWhereClause(whereString) {
    const conditionRegex = /(.*?)(=|!=|>|<|>=|<=)(.*)/;
    return whereString.split(/ AND | OR /i).map((conditionString) => {
      const match = conditionString.match(conditionRegex);
      if (match) {
        const [, field, operator, value] = match;
        return { field: field.trim(), operator, value: value.trim() };
      }
      throw new Error('Invalid WHERE clause format');
    });
  }
  
  module.exports = parseQuery;