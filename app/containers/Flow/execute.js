const END = { title: 'End', id: 'end' };

const executeRule = ({ id, title, body, rulePass, ruleFail }, content, rules, results = []) => {
  if (!id || !title || !body || results.some(result => (result.id === rulePass || result.id === ruleFail))) {
    results.push(END);

    return results;
  }

  try {
    const func = body.substring(body.lastIndexOf('{') + 1, body.lastIndexOf('}'));
    const result = !!(new Function('obj', func)(content)); // eslint-disable-line

    if (result) {
      results.push({ title, id, result });
      const nextRule = rules.find(rule => rulePass === rule.id);

      if (!nextRule) {
        results.push(END);

        return results;
      }

      return executeRule(nextRule, content, rules, results);
    }

    throw new Error('Rule Failed');
  } catch (e) {
    results.push({ title, id, result: false });

    const nextRule = rules.find(rule => ruleFail === rule.id);

    if (!nextRule) {
      results.push(END);

      return results;
    }

    return executeRule(nextRule, content, rules, results);
  }
};

export default ({ content, rules }) => {
  return new Promise(resolve => {
    const [firstRule] = rules;

    try {
      const results = executeRule(firstRule, typeof content === 'string' ? JSON.parse(content) : content, rules);

      resolve(results);
    } catch (e) {
      resolve([END]);
    }
  });
};
