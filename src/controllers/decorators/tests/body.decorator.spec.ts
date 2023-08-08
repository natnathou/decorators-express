import { Body } from '../body.decorator';
import 'reflect-metadata';
import { MetadataKey } from '../../constants';

describe('Body decorator', () => {
    afterEach(()=>{
        jest.restoreAllMocks()
    })
    it('Body should be defined', () => {
        const spyOnBody = jest.spyOn(
            require('../body.decorator'), // Import the original decorator
            'Body' // Method name to spy on
        );

        // Check if the Body decorator is applied to the method
        expect(spyOnBody).toBeDefined();
    })

    it('bodyDecorate should be defined', () => {
        const spyOnBodyDecorate = jest.spyOn(
            require('../body.decorator'), // Import the original decorator
            'bodyDecorate' // Method name to spy on
        );

        // Check if the Body decorator is applied to the method
        expect(spyOnBodyDecorate).toBeDefined();
    })

    it('Body should be call', () => {
        const spyOnBody = jest.spyOn(
            require('../body.decorator'), // Import the original decorator
            'Body' // Method name to spy on
        );

        class Person {
            getName(@Body() body: { [key: string]: any }) {
            }
        }

        // Check if the Body decorator is applied to the method
        expect(spyOnBody).toBeCalledTimes(1);
    })

    it('bodyDecorate should be call with undefined', () => {
        const spyOnBodyDecorate = jest.spyOn(
            require('../body.decorator'), // Import the original decorator
            'bodyDecorate' // Method name to spy on
        );

        class Person {
            getName(@Body() body: { [key: string]: any }) {
            }
        }

        // Check if the Body decorator is applied to the method
        expect(spyOnBodyDecorate).toBeCalledWith(undefined);
    })

    it('bodyDecorate should be call with the right argument', () => {
        const spyOnBodyDecorate = jest.spyOn(
            require('../body.decorator'), // Import the original decorator
            'bodyDecorate' // Method name to spy on
        );

        const arr = ['name'];
        class Person {
            getName(@Body(arr) body: { [key: string]: any }) {
            }
        }

        // Check if the Body decorator is applied to the method
        expect(spyOnBodyDecorate).toBeCalledWith(arr);
    })

    it('metadata should exist', () => {

        class Person {
            getName(@Body() body: { [key: string]: any }) {
            }
        }

        const metadata = Reflect.getMetadata(MetadataKey.body, Person.prototype, 'getName')
        expect(metadata).toBeDefined();
    })

    it('metadata should be { index: 0, names: undefined }', () => {

        class Person {
            getName(@Body() body: { [key: string]: any }) {
            }
        }

        const metadata = Reflect.getMetadata(MetadataKey.body, Person.prototype, 'getName')
        expect(metadata).toMatchObject({ index: 0, names: undefined });
    })
    it('metadata should be { index: 0, names: ["name"] }', () => {

        class Person {
            getName(@Body(['name']) body: { [key: string]: any }) {
            }
        }

        const metadata = Reflect.getMetadata(MetadataKey.body, Person.prototype, 'getName')
        expect(metadata).toMatchObject({ index: 0, names: ["name"] });
    })
})

