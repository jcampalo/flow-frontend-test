import execute from '../execute';

describe('execute', () => {
  it('should return an array list of results', async () => {
    const rules = [{
      key: 0,
      title: 'Is defined',
      id: 1,
      body: 'function(obj) { return !!obj }',
      ruleFail: 2,
      rulePass: 3
    }, {
      key: 1,
      title: 'Is with name',
      id: 2,
      body: 'function(obj) { return !!obj.name }',
      ruleFail: 4,
      rulePass: 4
    }, {
      key: 2,
      title: 'Is with description',
      id: 3,
      body: 'function(obj) { return !!obj.description }',
      ruleFail: 4,
      rulePass: 4
    }, {
      key: 3,
      title: 'It has keys',
      id: 4,
      body: 'function(obj) { return Object.keys(keys).length }'
    }];
    const content = JSON.stringify({
      name: 'name'
    });
    const result = await execute({ rules, content });
    const expectedResult = [{
      id: 1,
      result: true,
      title: 'Is defined'
    }, {
      id: 3,
      result: false,
      title: 'Is with description'
    }, {
      id: 4,
      result: false,
      title: 'It has keys'
    }, {
      id: 'end',
      title: 'End'
    }];

    expect(result).toEqual(expectedResult);
  });

  it('should return an array list of results when content is not a string', async () => {
    const rules = [{
      key: 0,
      title: 'Is defined',
      id: 1,
      body: 'function(obj) { return !!obj }',
      ruleFail: 2,
      rulePass: 3
    }];
    const content = {
      name: 'name'
    };
    const result = await execute({ rules, content });
    const expectedResult = [{
      id: 1,
      result: true,
      title: 'Is defined'
    }, {
      id: 'end',
      title: 'End'
    }];

    expect(result).toEqual(expectedResult);
  });

  it('should return an array list of results when content is not a valid object', async () => {
    const rules = [{
      key: 0,
      title: 'Is defined',
      id: 1,
      body: 'function(obj) { return !!obj }',
      ruleFail: 2,
      rulePass: 3
    }];
    const content = '{';
    const result = await execute({ rules, content });
    const expectedResult = [{
      id: 'end',
      title: 'End'
    }];

    expect(result).toEqual(expectedResult);
  });

  it('should return an array list of results preventing circular execution', async () => {
    const rules = [{
      key: 0,
      title: 'Is defined',
      id: 1,
      body: 'function(obj) { return !!obj }',
      ruleFail: 2,
      rulePass: 2
    }, {
      key: 1,
      title: 'Is with name',
      id: 2,
      body: 'function(obj) { return !!obj.name }',
      ruleFail: 1,
      rulePass: 1
    }];
    const content = {
      name: 'name'
    };
    const result = await execute({ rules, content });
    const expectedResult = [{
      id: 1,
      result: true,
      title: 'Is defined'
    }, {
      id: 'end',
      title: 'End'
    }];

    expect(result).toEqual(expectedResult);
  });

  it('should return an array list of results and stop when rules is not well defined', async () => {
    const rules = [{
      key: 0,
      title: 'Is defined',
      id: 1,
      body: 'function(obj) { return !!obj }',
      ruleFail: 2,
      rulePass: 2
    }, {
      key: 1,
      title: 'Is with name',
      id: 2
    }];
    const content = {
      name: 'name'
    };
    const result = await execute({ rules, content });
    const expectedResult = [{
      id: 1,
      result: true,
      title: 'Is defined'
    }, {
      id: 'end',
      title: 'End'
    }];

    expect(result).toEqual(expectedResult);
  });
});
