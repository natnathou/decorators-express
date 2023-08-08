import 'reflect-metadata';

import { MetadataKey } from '../../constants';
import { Param } from '../param.decorator';

describe('Param decorator', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('Param should be defined', () => {
    const spyOnParam = jest.spyOn(
      require('../param.decorator'), // Import the original decorator
      'Param', // Method name to spy on
    );

    // Check if the Param decorator is applied to the method
    expect(spyOnParam).toBeDefined();
  });

  it('paramDecorate should be defined', () => {
    const spyOnParamDecorate = jest.spyOn(
      require('../param.decorator'), // Import the original decorator
      'paramDecorate', // Method name to spy on
    );

    // Check if the Param decorator is applied to the method
    expect(spyOnParamDecorate).toBeDefined();
  });

  it('Param should be call', () => {
    const spyOnParam = jest.spyOn(
      require('../param.decorator'), // Import the original decorator
      'Param', // Method name to spy on
    );

    class Person {
      getName(@Param('test') param: string) {
      }
    }

    expect(spyOnParam).toBeCalledTimes(1);
  });

  it('paramDecorate should be call', () => {
    const spyOnParamDecorate = jest.spyOn(
      require('../param.decorator'), // Import the original decorator
      'paramDecorate', // Method name to spy on
    );

    const mockReturnedFunction = jest.fn();
    spyOnParamDecorate.mockReturnValue(mockReturnedFunction);

    class Person {
      getName(@Param('test') param: string) {
      }
    }

    // Check if the Param decorator is applied to the method
    expect(mockReturnedFunction).toBeCalledWith({}, 'getName', 0);
  });

  it('metadata should exist', () => {
    class Person {
      getName(@Param('test') param: string) {
      }
    }

    const metadata = Reflect.getMetadata(MetadataKey.param, Person.prototype, 'getName');
    expect(metadata).toBeDefined();
  });

  it('metadata should be 0', () => {
    class Person {
      getName(@Param('test') param: string) {
      }
    }

    const metadata = Reflect.getMetadata(MetadataKey.param, Person.prototype, 'getName');
    expect(metadata).toMatchObject([{ 'index': 0, 'name': 'test' }]);
  });
});

