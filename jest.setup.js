import 'react-native-gesture-handler/jestSetup';

// for persistor compatibility
jest.useFakeTimers();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('realm', () => {
  return class Realm {
    schema = [];
    data = [];
    constructor(params) {
      require('lodash').each(params.schema, (schema) => {
        this.data[schema.name] = [];
        this.data[schema.name].filtered = () => {
          return this.data[schema.name];
        };
      });
      this.schema = params.schema;
    }
    objects(schemaName) {
      return this.data[schemaName];
    }
    write(fn) {
      fn();
    }
    create(schemaName, data) {
      this.data[schemaName].push(data);
      return data;
    }
  }.default;
});
