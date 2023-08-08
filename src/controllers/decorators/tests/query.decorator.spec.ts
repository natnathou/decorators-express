import 'reflect-metadata';

import { MetadataKey } from '../../constants';
import { Query } from '../query.decorator';

describe('Query decorator', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('Query should be defined', () => {
    const spyOnParam = jest.spyOn(
      require('../query.decorator'), // Import the original decorator
      'Query', // Method name to spy on
    );

    // Check if the Query decorator is applied to the method
    expect(spyOnParam).toBeDefined();
  });

  it('queryDecorate should be defined', () => {
    const spyOnParamDecorate = jest.spyOn(
      require('../query.decorator'), // Import the original decorator
      'queryDecorate', // Method name to spy on
    );

    // Check if the Query decorator is applied to the method
    expect(spyOnParamDecorate).toBeDefined();
  });

  it('Query should be call', () => {
    const spyOnParam = jest.spyOn(
      require('../query.decorator'), // Import the original decorator
      'Query', // Method name to spy on
    );

    class Person {
      getName(@Query('test') query: string) {
      }
    }

    expect(spyOnParam).toBeCalledTimes(1);
  });

  it('queryDecorate should be call', () => {
    const spyOnParamDecorate = jest.spyOn(
      require('../query.decorator'), // Import the original decorator
      'queryDecorate', // Method name to spy on
    );

    const mockReturnedFunction = jest.fn();
    spyOnParamDecorate.mockReturnValue(mockReturnedFunction);

    class Person {
      getName(@Query('test') query: string) {
      }
    }

    // Check if the Query decorator is applied to the method
    expect(mockReturnedFunction).toBeCalledWith({}, 'getName', 0);
  });

  it('metadata should exist', () => {
    class Person {
      getName(@Query('test') query: string) {
      }
    }

    const metadata = Reflect.getMetadata(MetadataKey.query, Person.prototype, 'getName');
    expect(metadata).toBeDefined();
  });

  it('metadata should be 0', () => {
    class Person {
      getName(@Query('test') query: string) {
      }
    }

    const metadata = Reflect.getMetadata(MetadataKey.query, Person.prototype, 'getName');
    expect(metadata).toMatchObject([{ 'index': 0, 'name': 'test' }]);
  });
});

