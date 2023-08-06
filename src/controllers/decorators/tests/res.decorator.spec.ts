import { Res } from '../res.decorator';
import 'reflect-metadata';
import {MetadataKey} from '../../constants';

describe('Res decorator', () => {
    afterEach(()=>{
        jest.restoreAllMocks()
    })
    it('Res should be defined', () => {
        const spyOnBody = jest.spyOn(
            require('../res.decorator'), // Import the original decorator
            'Res' // Method name to spy on
        );

        // Check if the Res decorator is applied to the method
        expect(spyOnBody).toBeDefined();
    })

    it('resDecorate should be defined', () => {
        const spyOnBodyDecorate = jest.spyOn(
            require('../res.decorator'), // Import the original decorator
            'resDecorate' // Method name to spy on
        );

        // Check if the Res decorator is applied to the method
        expect(spyOnBodyDecorate).toBeDefined();
    })

    it('Res should be call', () => {
        const spyOnBody = jest.spyOn(
            require('../res.decorator'), // Import the original decorator
            'Res' // Method name to spy on
        );

        class Person {
            getName(@Res() Res: { [key: string]: any }) {
            }
        }

        // Check if the Res decorator is applied to the method
        expect(spyOnBody).toBeCalledTimes(1);
    })

    it('resDecorate should be call', () => {
        const spyOnBodyDecorate = jest.spyOn(
            require('../res.decorator'), // Import the original decorator
            'resDecorate' // Method name to spy on
        );

        class Person {
            getName(@Res() Res: { [key: string]: any }) {
            }
        }

        // Check if the Res decorator is applied to the method
        expect(spyOnBodyDecorate).toBeCalledWith({}, 'getName', 0);
    })

    it('metadata should exist', () => {

        class Person {
            getName(@Res() Res: { [key: string]: any }) {
            }
        }

        const metadata = Reflect.getMetadata(MetadataKey.res, Person.prototype, 'getName')
        expect(metadata).toBeDefined();
    })

    it('metadata should be 0', () => {

        class Person {
            getName(@Res() Res: { [key: string]: any }) {
            }
        }

        const metadata = Reflect.getMetadata(MetadataKey.res, Person.prototype, 'getName')
        expect(metadata).toBe(0);
    })
})

